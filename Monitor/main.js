const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url')

let win ;
let width = 1400;
let height = 900;

function createWindow() {
    // Create the main window
    win = new BrowserWindow({
        width: width,
        height: height,
        webPreferences: {
            nodeIntegration: true, // 是否集成 Nodejs,把之前预加载的js去了，发现也可以运行
          }
    });

    win.setMenu(null)

    win.loadURL(url.format({
        pathname: path.join(__dirname, '/app/page/monitor.html'),
        protocol: 'file:',
        slashes: true
    }));

    win.webContents.openDevTools();
    win.on('closed', () => {
        win = null;
    })
}

app.on('ready', () => {
    createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});