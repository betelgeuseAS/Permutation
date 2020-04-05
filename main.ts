import {app, BrowserWindow, screen, Menu, Tray} from 'electron';
import * as path from 'path';
import * as url from 'url';

let win: BrowserWindow = null;

// detect serve mode
const args = process.argv.slice(1);
const serve: boolean = args.some(val => val === '--serve');

// WARNING:
// Electron Security Warning (Node.js Integration with Remote Content):
// The core issue is that too many developers, especially newcomers to Electron, assume that
// using http:// with nodeIntegration enabled is okay. It's not - the warning is correct, that's
// a fairly severe security risk. The fact that a major boilerplate actually has that code in
// there concerns me (a newcomer could easily assume that they could just replace the whole line
// and point Electron at http://my-other-server.com).
// process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
// or
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = '1'; // Commit it into show warnings.
// See (Do not enable Node.js Integration for Remote Content):
// https://www.electronjs.org/docs/tutorial/security#2-do-not-enable-nodejs-integration-for-remote-content

function createWindow() {
  const size = screen.getPrimaryDisplay().workAreaSize;

  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height,
    webPreferences: {
      nodeIntegration: true,
      allowRunningInsecureContent: serve,
    },
  });


  if (serve) {
    // get dynamic version from localhost:4200
    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
    win.loadURL('http://localhost:4200');

    // The following is optional and will open the DevTools:
    win.webContents.openDevTools();
  } else {
    // load the dist folder from Angular
    win.loadURL(
      url.format({
        pathname: path.join(__dirname, `/dist/index.html`),
        protocol: 'file:',
        slashes: true,
        // icon: path.join(__dirname, 'assets/icons/favicon.png')
      })
    );
  }

  win.on('closed', () => {
    win = null;
  });
}

try {

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow);

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  // initialize the app's main window
  app.on('activate', () => {
    if (win === null) {
      createWindow();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}
