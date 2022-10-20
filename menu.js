const path = require('path')
const { app, BrowserWindow } = require("electron")
const isMac = process.platform === 'darwin'

function createAboutWindow() {
  console.log('create about window')
  const aboutWindow = new BrowserWindow({
    title: 'About',
    width: 500,
    height: 500
  })

  aboutWindow.loadFile(path.join(__dirname, './about.html'))
}

module.exports = menu = [
  ...(isMac ? [{
    label: app.name,
    submenu: [{
      label: 'About'
    }]
  },
  ] : []),
  ...(!isMac ? [
    {
      label: 'File',
      submenu: [
        {
          label: 'Quit',
          click: () => app.quit(),
          accelerator: 'Ctrl + W'
        }
      ]
    },
    {
      label: 'Help',
      submenu: [{
        label: 'About',
        click: createAboutWindow
      }]
    }] : [])
]