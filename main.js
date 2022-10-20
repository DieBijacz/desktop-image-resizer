const { app, BrowserWindow, Menu, ipcMain, shell } = require('electron')
const path = require('path')
const menu = require('./menu.js')
const os = require('os')
const fs = require('fs')
const resizeImg = require('resize-img')

const isMac = process.platform === 'darwin'
const isDevelopment = true

let mainWindow

function createMainWindow() {
  mainWindow = new BrowserWindow({
    title: 'Image Resizer',
    width: isDevelopment ? 1000 : 500,
    height: 1000,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // Open dev tools
  if (isDevelopment) {
    mainWindow.webContents.openDevTools()
  }

  mainWindow.loadFile(path.join(__dirname, './renderer/index.html'))
}

// When ready
app.whenReady().then(() => {
  createMainWindow()

  const mainMenu = Menu.buildFromTemplate(menu)
  Menu.setApplicationMenu(mainMenu)

  // remove mainWindow from memory on close
  mainWindow.on('closed', () => (mainWindow = null))

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow()
  })
})

// respond to ipcRenderer resize
ipcMain.on('image:resize', (e, options) => {
  options.destination = path.join(os.homedir(), 'imageresizer')
  resizeImage(options)
})

async function resizeImage({ imgPath, width, height, destination }) {
  try {
    // create new path, filename and folder
    const newPath = await resizeImg(fs.readFileSync(imgPath), { width: +width, height: +height })
    const filename = path.basename(imgPath)
    if (!fs.existsSync(destination)) {
      fs.mkdirSync(destination)
    }

    // save file
    fs.writeFileSync(path.join(destination, filename), newPath)

    // send response
    mainWindow.webContents.send('image:done')

    // open folder with new file
    shell.openPath(destination)

  } catch (error) {
    console.log(error)
  }
}

app.on('window-all-closed', () => {
  if (isMac) app.quit()
})