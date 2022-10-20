const path = require('path')
const { app, BrowserWindow, Menu } = require('electron')
const menu = require('./menu.js')

const isMac = process.platform === 'darwin'
const isDevelopment = true

function createMainWindow() {
  const mainWindow = new BrowserWindow({
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
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow()
  })
})

app.on('window-all-closed', () => {
  if (isMac) app.quit()
})