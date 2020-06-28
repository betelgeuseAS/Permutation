import { Component, OnInit } from '@angular/core';
import { NgAudioRecorderService, OutputFormat } from 'ng-audio-recorder';

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

@Component({
  selector: 'app-audio-recorder',
  templateUrl: './audio-recorder.component.html',
  styleUrls: ['./audio-recorder.component.sass']
})
export class AudioRecorderComponent implements OnInit {

  constructor(
    private audioRecorderService: NgAudioRecorderService
  ) {
    this.audioRecorderService.recorderError.subscribe(recorderErrorCase => {
      // Handle Error
    });
  }

  ngOnInit(): void {}

  startRecording() {
    this.audioRecorderService.startRecording();
  }

  stopRecording() {
    this.audioRecorderService.stopRecording(OutputFormat.WEBM_BLOB).then((output) => {
      // do post output steps
      console.log(output);
    }).catch(errrorCase => {
      // Handle Error
    });
  }
}
