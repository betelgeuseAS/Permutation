import { Component } from '@angular/core';

import { ElectronService } from './core/services';

import { environment } from '../environments/environment';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  constructor(
    public electronService: ElectronService,
    private translate: TranslateService,
  ) {
    translate.setDefaultLang('en');

    console.log('AppConfig', environment);
    if (electronService.isElectron) {
      console.log(process.env);
      console.log('Mode electron');
      console.log('Electron ipcRenderer', electronService.ipcRenderer);
      console.log('NodeJS childProcess', electronService.childProcess);
    } else {
      console.log('Mode web');
    }
  }
}
