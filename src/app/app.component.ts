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

  breadcrumbConfig = {
    bgColor: '#fff',
    fontSize: '18px',
    fontColor: '#17A2B8',
    lastLinkColor: '#333333',
    symbol: ' / ',
  };

  // private toastService: ToastService // In constructor
  // this.toastService.info('message');
  // this.toastService.success('message');
  // this.toastService.warn('message');
  // this.toastService.error('message');
  // this.toastService.default('message');
  position = 'top-right'; // 'top-left' | 'top-right' | 'bottom-right' | 'bottom-left' (default: 'top-right')
  transition = 'bounce'; // 'bounce' | 'slide' | 'zoom' | 'flip' (default: 'bounce')
  autoClose = 5000; // time in ms (0 = disabled) (default: 5000)
  hideProgressBar = false; // true | false" (default: false)
  newestOnTop = false; // true | false (default: false)
  closeOnClick = true; // true | false (default: true)
  pauseOnHover = true; // true | false (default: true)
  pauseOnVisibilityChange = true; // true | false  (default:  true)
  iconLibrary = 'none'; // 'material' | 'font-awesome' | 'none' (default: 'none')

  constructor(
    public electronService: ElectronService,
    private translate: TranslateService,
  ) {
    translate.setDefaultLang('en');

    // console.log('AppConfig', environment);
    if (electronService.isElectron) {
      // console.log(process.env);
      console.log('Mode electron');
      // console.log('Electron ipcRenderer', electronService.ipcRenderer);
      // console.log('NodeJS childProcess', electronService.childProcess);
    } else {
      console.log('Mode web');
    }
  }
}
