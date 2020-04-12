import {FormControl} from '@angular/forms';

export class MyValidators {

  static imageType(control: FormControl): {[key: string]: boolean} {
    if (control.value) {
      const valToLower = control.value.toLowerCase();
      const regex = new RegExp('(.*?)\.(jpg|png|jpeg)$');
      const regexTest = regex.test(valToLower);
      return !regexTest ? { notSupportImageType: true } : null;
    }

    return null;
  }
}
