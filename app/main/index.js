const { app, BrowserWindow } = require("electron");

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow();
  mainWindow.webContents.loadURL(`file://${__dirname}/../renderers/views/index.html`);
  mainWindow.setTitle(require('../../package.json').description);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});
