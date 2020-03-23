import { Component } from '@angular/core';

import { DatabaseService } from './data-access/database.service';
import { User } from './data-access/entities/user.entity';

import { ElectronService } from './core/services';

import { environment } from '../environments/environment';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  users: User[] = [];

  firstName: string = '';
  lastName: string = '';
  age: string = '';

  constructor(
    public electronService: ElectronService,
    private translate: TranslateService,
    private databaseService: DatabaseService
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

    this.getUsers();
  }

  getUsers() {
    this.databaseService
      .connection
      .then(() => User.find())
      .then(users => {
        this.users = users;
      });
  }

  addUser() {
    const user = new User();

    user.FirstName = this.firstName;
    user.LastName = this.lastName;
    user.Age = +this.age;

    this.databaseService
      .connection
      .then(() => user.save())
      .then(() => {
        this.getUsers();
      })
      .then(() => {
        this.firstName = '';
        this.lastName = '';
        this.age = '';
      });
  }
}
