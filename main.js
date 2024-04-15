const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 720,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, "scripts/preload.js"),
        },
    });

    Menu.setApplicationMenu(null); // Hide default menu bar
    mainWindow.loadFile("index.html");
}

app.on("ready", createWindow);
