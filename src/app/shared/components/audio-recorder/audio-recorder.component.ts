import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgAudioRecorderService, OutputFormat, RecorderState } from 'ng-audio-recorder';
import { AudioPlayerService } from '../../services/audio-player.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CountupTimerService } from 'ngx-timer';
import { TimerService } from '../../services/timer.service';

// ng-audio-recorder - https://www.npmjs.com/package/ng-audio-recorder

// Output Formats:
// OutputFormat.WEBM_BLOB - Webm Blob for the recorded audio
// OutputFormat.WEBM_BLOB_URL - Webm Blob URL for the recorded audio

// Error Cases:
// ErrorCase.USER_CONSENT_FAILED - If user denies audio access or if the website is accessed on http instead of https
// ErrorCase.ALREADY_RECORDING - If you call start recording and state is RECORDING

// Audio Recorder State:
// RecorderState.INITIALIZING - State before calling mediarecorder record API and user consent
// RecorderState.INITIALIZED - On user consent successful
// RecorderState.RECORDING - When Recording is in progress
// RecorderState.PAUSED - On pausing the recording
// RecorderState.STOPPING - After calling stopped and before promise return
// RecorderState.STOPPED - On successful stop of media recorder

// Methods:
// Name	            Input Type	  Return Type	  Description
// startRecording	  -	            -	            Gets the consent and starts recording or resumes if paused
// stopRecording	  OutputFormat  Promise	      If successful, output will be desired output, if rejected, ErrorCase will be returned
// getRecorderState -	            RecorderState	Returns the current state of recorder
// pause	          -	            -	            Pauses the current recording
// resume	          -	            -	            Resumes the paused recording
// getUserConsent	  -	            Promise	      Resolves if user allows, rejects if link is not secure or user rejects

// Events:
// Event	        OutputData	Description
// recorderError	ErrorCase	  Emits Event in case of error

// Convert Base64 to file: https://base64.guru/converter/decode/file

@Component({
  selector: 'app-audio-recorder',
  templateUrl: './audio-recorder.component.html',
  styleUrls: ['./audio-recorder.component.sass']
})
export class AudioRecorderComponent implements OnInit {

  // @Output() dataAudio: EventEmitter<Blob> = new EventEmitter<Blob>();
  @Output() dataAudio: EventEmitter<SafeUrl> = new EventEmitter<SafeUrl>();

  playlistBasic: Array<object> = []; // Track[] import { Track } from 'ngx-audio-player';
  displayTitleBasic = this.audioPlayerService.getOptionsBasic().displayTitle;
  displayVolumeControlsBasic = this.audioPlayerService.getOptionsBasic().displayVolumeControls;

  titlePauseResumeBtn = 'Pause';

  timerConfig = this.timerService.getOptionsCountUp({
    timerClass: 'audio-timer-class',
    hourText: 'h',
    minuteText: 'm',
    secondsText: 's'
  });

  constructor(
    private audioRecorderService: NgAudioRecorderService,
    public audioPlayerService: AudioPlayerService,
    private domSanitizer: DomSanitizer,
    private countUpTimerService: CountupTimerService,
    private timerService: TimerService
  ) {
    this.audioRecorderService.recorderError.subscribe(recorderErrorCase => {
      // Handle Error
    });
  }

  ngOnInit(): void {}

  startRecording() {
    this.audioRecorderService.startRecording();

    this.countUpTimerService.startTimer();
  }

  stopRecording() {
    this.countUpTimerService.stopTimer();

    this.audioRecorderService.stopRecording(OutputFormat.WEBM_BLOB)
      .then((output: Blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(output);
        reader.onloadend = (e) => {
          const base64Audio = typeof(reader.result) === 'string' ? reader.result : '';
          const safeBase64Audio: SafeUrl = this.sanitize(base64Audio); // safeBase64Audio.changingThisBreaksApplicationSecurity

          this.playlistBasic.push({
            title: '',
            link: safeBase64Audio
          });

          this.dataAudio.emit({
            blob: output,
            base64: base64Audio
          });
        };
      }).catch(errrorCase => {
        // Handle Error
      });
  }

  pauseResumeRecording() {
    const recordingState = this.audioRecorderService.getRecorderState();

    switch (recordingState) {
      case RecorderState.RECORDING:
        this.audioRecorderService.pause();

        this.countUpTimerService.pauseTimer();

        this.titlePauseResumeBtn = 'Resume';
        break;
      case RecorderState.PAUSED:
        this.audioRecorderService.resume();

        const timerValue = this.countUpTimerService.getTimerValue();
        this.countUpTimerService.setTimervalue(timerValue);
        this.countUpTimerService.startTimer();

        this.titlePauseResumeBtn = 'Pause';
        break;
    }
  }

  startDisabled() {
    const recordingState = this.audioRecorderService.getRecorderState();
    const disabledState = [RecorderState.RECORDING, RecorderState.PAUSED];

    return disabledState.includes(recordingState);
  }

  pauseDisabled() {
    const recordingState = this.audioRecorderService.getRecorderState();
    const disabledState = [RecorderState.INITIALIZING, RecorderState.STOPPED];

    return disabledState.includes(recordingState);
  }

  stopDisabled() {
    const recordingState = this.audioRecorderService.getRecorderState();
    const disabledState = [RecorderState.INITIALIZING, RecorderState.STOPPED];

    return disabledState.includes(recordingState);
  }

  sanitize(url: string) {
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }
}
