const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: '#333333',
    webPreferences: {
      nodeIntegration: true
    }
  });

  // Instead of loading a file, inject HTML directly
  win.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent(`
    <html>
      <body style="background: #333333; color: white; font-family: Arial;">
        <h1>Testing</h1>
      </body>
    </html>
  `));

  // Open DevTools to see any errors
  win.webContents.openDevTools();
}

app.whenReady().then(() => {
  // Disable security warnings for development
  process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = true;
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
}); 