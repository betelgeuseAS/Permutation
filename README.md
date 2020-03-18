# Permutation

[![Angular Logo](https://www.vectorlogo.zone/logos/angular/angular-ar21.svg)](https://angular.io/)
[![Electron Logo](https://www.vectorlogo.zone/logos/electronjs/electronjs-ar21.svg)](https://electronjs.org/)
[![TypeORM Logo](https://github.com/typeorm/typeorm/raw/master/resources/logo_big.png)](https://typeorm.io/#/)

![Maintained][maintained-badge]
[![Travis Build Status][build-badge]][build]
[![Make a pull request][prs-badge]][prs]
[![License](http://img.shields.io/badge/Licence-MIT-brightgreen.svg)](LICENSE.md)

[![Build Status](https://travis-ci.org/CubikNeRubik/angular-electron-typeorm-starter.svg?branch=master)](https://travis-ci.org/CubikNeRubik/angular-electron-typeorm-starter)
[![License](http://img.shields.io/badge/Licence-MIT-brightgreen.svg)](LICENSE.md)
[![Watch on GitHub][github-watch-badge]][github-watch]
[![Star on GitHub][github-star-badge]][github-star]

## Introduction

Bootstrap and package your project with Angular 9 and Electron 8 (Typescript + SASS + Hot Reload) for creating Desktop applications.

Currently runs with:

- Angular v9.0.2
- Electron v8.0.1
- Electron Builder v22.3.2

With this sample, you can :

- Run your app in a local development environment with Electron & Hot reload
- Run your app in a production environment
- Package your app into an executable file for Linux, Windows & Mac

/!\ Hot reload only pertains to the renderer process. The main electron process is not able to be hot reloaded, only restarted.

/!\ Angular 9.x CLI needs Node 10.13 or later to works correctly.

---

## Technologies
* `HTML`
* `CSS` / `Sass`
* `Angular`
* `Electron`

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.5.

## Getting Started
``` bash
git clone https://github.com/betelgeuseAS/Permutation.git
npm install
npm start
```

There is an issue with `yarn` and `node_modules` when the application is built by the packager. Please use `npm` as dependencies manager.

If you want to generate Angular components with Angular-cli , you **MUST** install `@angular/cli` in npm global context.
Please follow [Angular-cli documentation](https://github.com/angular/angular-cli) if you had installed a previous version of `angular-cli`.
``` bash
npm install -g @angular/cli
```

## To build for development

- **in a terminal window** -> npm start

Voila! You can use your Angular + Electron app in a local development environment with hot reload !

The application code is managed by `main.ts`. In this sample, the app runs with a simple Angular App (http://localhost:4200) and an Electron window.
The Angular component contains an example of Electron and NodeJS native lib import.
You can disable "Developer Tools" by commenting `win.webContents.openDevTools();` in `main.ts`.

## Included Commands

|Command|Description|
|--|--|
|`npm run ng:serve:web`| Execute the app in the browser |
|`npm run build`| Build the app. Your built files are in the /dist folder. |
|`npm run build:prod`| Build the app with Angular aot. Your built files are in the /dist folder. |
|`npm run electron:local`| Builds your application and start electron
|`npm run electron:linux`| Builds your application and creates an app consumable on linux system |
|`npm run electron:windows`| On a Windows OS, builds your application and creates an app consumable in windows 32/64 bit systems |
|`npm run electron:mac`|  On a MAC OS, builds your application and generates a `.app` file of your application that can be run on Mac |

**Your application is optimised. Only /dist folder and node dependencies are included in the executable.**

## You want to use a specific lib (like rxjs) in electron main thread ?

YES! You can do it! Just by importing your library in npm dependencies section (not **devDependencies**) with `npm install --save`. It will be loaded by electron during build phase and added to your final package. Then use your library by importing it in `main.ts` file. Quite simple, isn't it ?

## Browser mode

Maybe you want to execute the application in the browser with hot reload ? Just run `npm run ng:serve:web`.
**Note that you can't use Electron or NodeJS native libraries in this case.** Please check `providers/electron.service.ts` to watch how conditional import of electron/Native libraries is done.

## Known issues

1. **Browser mode.** You can't use TypeORM in browser so it is not possible.If you need to run app in browser and don't need TypeORM you can use [angular-electron](https://github.com/maximegris/angular-electron) for that.
1. **Windows Build.** You cannot make build for `windows` if path to project folder contains spaces or not latin letters.
