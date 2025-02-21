const { app, BrowserWindow, Menu } = require('electron')
const path = require('path')

// Remove all import statements and use require instead
function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        title: 'AL Studios',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            // Allow loading of external resources
            webSecurity: false 
        }
    })

    // Create the menu template
    const template = [
        {
            label: 'File',
        },
        {
            label: 'Edit',
        },
        {
            label: 'View',
        },
        {
            label: 'Window',
        },
        {
            label: 'Help',
        }
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    win.loadFile('src/index.html')
    win.webContents.openDevTools()
}

// Hot reloading setup
try {
    if (process.env.NODE_ENV !== 'production') {
        require('electron-reloader')(module, {
            debug: true,
            watchRenderer: true
        });
    }
} catch (err) {
    console.log('Error:', err);
}

// Set the app name
app.name = 'AL Studios'

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
