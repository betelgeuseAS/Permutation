import { Injectable } from '@angular/core';
import { AudioHero } from '../../data-access/entities/audio-hero.entity';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

export interface PlayerOwnAudio {
  title: string;
  link: SafeUrl;
}

interface OptionsAdvanced {
  displayTitle: boolean;
  displayPlayList: boolean;
  pageSizeOptions: Array<number>;
  displayVolumeControls: boolean;
}

interface OptionsBasic {
  displayTitle: boolean;
  displayVolumeControls: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AudioPlayerService {

  // Audio Player: https://github.com/vmudigal/ngx-audio-player#readme
  // Home: https://vmudigal.github.io/ngx-audio-player/

  // HTML:
  // <mat-basic-audio-player
  //   [audioUrl]="msbapAudioUrl"
  //   [title]="msbapTitle"
  //   [autoPlay]="false"
  //   muted="muted"
  //   (ended)="onEnded($event)"
  //   [displayTitle]="msbapDisplayTitle"
  //   [displayVolumeControls]="msaapDisplayVolumeControls"
  // ></mat-basic-audio-player>
  // @Input() title: string;	title to be displayed; Default:	none
  // @Input() audioUrl: string;	url of the audio; Default:	none
  // @Input() autoPlay: false;	true - if the audio needs to be played automaticlly; Default:	false
  // @Input() displayTitle = false;	true - if the audio title needs to be displayed; Default:	false
  // @Output() ended: Subject;	Callback method thats triggers once the track ends; Default:	- N.A -
  // @Input() displayVolumeControls = true;	false - if the volume controls needs to be hidden; Default:	true
  // @Input() startOffset = 0;	offset from start of audio file in seconds	optional Default: 0
  // @Input() endOffset = 0;	offset from end of audio file in seconds	optional Default: 0

  // <mat-advanced-audio-player
  //   [playlist]="msaapPlaylist"
  //   [displayTitle]="msaapDisplayTitle"
  //   [autoPlay]="false"
  //   muted="muted"
  //   [displayPlaylist]="msaapDisplayPlayList"
  //   [pageSizeOptions]="pageSizeOptions"
  //   (ended)="onEnded($event)"
  //   (trackEnded)="onEnded($event)
  //   [displayVolumeControls]="msaapDisplayVolumeControls"
  //   [expanded]="true"
  // ></mat-advanced-audio-player>
  // @Input() playlist: Track[];	playlist containing array of title and link; Defaulst:	None
  // @Input() autoPlay: false;	true - if the audio needs to be played automaticlly; Defaulst:	false
  // @Input() displayTitle: true;	false - if the audio title needs to be hidden; Defaulst:	true
  // @Input() displayPlaylist: true;	false - if the playlist needs to be hidden; Defaulst:	true
  // @Input() pageSizeOptions = [10, 20, 30];	number of items to be displayed in the playlist; Defaulst:	[10,20,30]
  // @Input() expanded = true;	false - if the playlist needs to be minimized; Defaulst:	true
  // @Input() displayVolumeControls = true;	false - if the volume controls needs to be hidden; Defaulst:	true
  // @Input() startOffset = 0;	offset from start of audio file in seconds	optional Default: 0
  // @Input() endOffset = 0;	offset from end of audio file in seconds	optional Default: 0
  // @Output() trackEnded: Subject;	Callback method thats triggers once the track ends; Defaulst:	- N.A -

  constructor(
    private domSanitizer: DomSanitizer
  ) {}

  getOptionsAdvanced(): OptionsAdvanced {
    return {
      displayTitle: false,
      displayPlayList: true,
      pageSizeOptions: [2, 4, 6, 8],
      displayVolumeControls: true
    };
  }

  getOptionsBasic(): OptionsBasic {
    return {
      displayTitle: false,
      displayVolumeControls: true
    };
  }

  getAudios(entities?: Array<AudioHero>): Array<PlayerOwnAudio> {
    return entities.map((item) => {
      if (item && item.data) {
        return {
          title: item.name,
          link: this.sanitize(item.data) // URL.createObjectURL(blob)
        };
      }
    });
  }

  sanitize(url: string) {
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }
}
