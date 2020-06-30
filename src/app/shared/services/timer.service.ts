import { Injectable } from '@angular/core';
import {
  countUpTimerConfigModel,
  countDownTimerConfigModel,
  timerTexts,
  countDownTimerTexts
} from 'ngx-timer';

interface Options {
  timerClass?: string;
  hourText?: string;
  minuteText?: string;
  secondsText?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  // ngx-timer https://github.com/Y4SHVINE/ngx-timer-lib
  // Examples https://y4shvine.github.io/ngx-timer-lib/

  // 1. Count Up Timer
  // <countup-timer [countUpTimerConfig]="testConfig"></countup-timer>
  //
  // You can import CountupTimerService from ngx-timer to do the following functionalities.
  //
  // 1) To start the timer
  // this.countupTimerService.startTimer();
  //
  // By passing a start time to above function timer will start from that. eg :-
  // let cdate = new Date();
  // cdate.setHours(cdate.getHours()-2);
  // this.countupTimerService.startTimer(cdate);
  //
  // 2) To pause the timer
  // this.countupTimerService.pauseTimer();
  //
  // 3) To stop the timer
  // this.countupTimerService.stopTimer();
  //
  // Configurations
  // Import countUpTimerConfigModel model from ngx-timer you will be able use following configurations.
  // import { countUpTimerConfigModel, timerTexts } from 'ngx-timer';
  // ngOnInit(): void {
  // //countUpTimerConfigModel
  // this.testConfig = new countUpTimerConfigModel();
  // //custom class
  // this.testConfig.timerClass  = 'test_Timer_class';
  // // timer text values
  // this.testConfig.timerTexts = new timerTexts();
  // this.testConfig.timerTexts.hourText = "Hours"; //default - hh
  // this.testConfig.timerTexts.minuteText = "Minutes"; //default - mm
  // this.testConfig.timerTexts.secondsText = "Seconds"; //default - ss
  // }

  // 2. Count Down Timer
  // <countdown-timer [countDownTimerConfig]="testConfig"></countdown-timer>
  //
  // You can import CountdownTimerService from ngx-timer to do the following functionalities.
  // 1) To start the timer
  // let cdate = new Date();
  // cdate.setHours(cdate.getHours() + 2);
  // this.CountdownTimerService.startTimer(cdate);
  //
  // 2) To pause the timer
  // this.CountdownTimerService.pauseTimer();
  //
  // 3) To stop the timer
  // this.CountdownTimerService.stopTimer();
  //
  // 3) To resume the timer
  // this.CountdownTimerService.resumeTimer();
  //
  // Configurations
  // Import countUpTimerConfigModel model from ngx-timer you will be able use following configurations.
  // import { countDownTimerConfigModel, countDownTimerTexts } from 'ngx-timer';
  // ngOnInit(): void {
  // //countUpTimerConfigModel
  // this.testConfig = new countDownTimerConfigModel();
  // //custom class
  // this.testConfig.timerClass  = 'test_Timer_class';
  // //timer text values
  // this.testConfig.timerTexts = new countDownTimerTexts();
  // this.testConfig.timerTexts.hourText = "Hours"; //default - hh
  // this.testConfig.timerTexts.minuteText = "Minutes"; //default - mm
  // this.testConfig.timerTexts.secondsText = "Seconds"; //default - ss
  // }

  getOptionsCountUp({
      timerClass = 'timer-class',
      hourText = 'Hours',
      minuteText = 'Minutes',
      secondsText = 'Seconds'
   }: Options): countUpTimerConfigModel {
    const config = new countUpTimerConfigModel();

    config.timerClass = timerClass;

    config.timerTexts = new timerTexts();
    config.timerTexts.hourText = hourText;
    config.timerTexts.minuteText = minuteText;
    config.timerTexts.secondsText = secondsText;

    return config;
  }

  getOptionsCountDown({
      timerClass = 'timer-class',
      hourText = 'Hours',
      minuteText = 'Minutes',
      secondsText = 'Seconds'
  }: Options): countDownTimerConfigModel {
    const config = new countDownTimerConfigModel();

    config.timerClass = timerClass;

    config.timerTexts = new countDownTimerTexts();
    config.timerTexts.hourText = hourText;
    config.timerTexts.minuteText = minuteText;
    config.timerTexts.secondsText = secondsText;

    return config;
  }
}
