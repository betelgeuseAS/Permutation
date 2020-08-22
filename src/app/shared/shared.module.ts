import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { FilePondModule, registerPlugin } from 'ngx-filepond';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginFileRename from 'filepond-plugin-file-rename';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageCrop from 'filepond-plugin-image-crop';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImageValidateSize from 'filepond-plugin-image-validate-size';
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginFileRename,
  FilePondPluginImageCrop,
  FilePondPluginImageExifOrientation,
  FilePondPluginFileValidateType,
  FilePondPluginImageValidateSize,
  FilePondPluginFileEncode
);
import { PageNotFoundComponent } from './components/';
import { WebviewDirective } from './directives/';
import { TranslateModule } from '@ngx-translate/core';
import { MomentPipe } from './pipes/moment.pipe';
import 'hammerjs';
import 'mousetrap';
import { GalleryModule } from '@ks89/angular-modal-gallery';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxAudioPlayerModule } from 'ngx-audio-player';
import { QuillModule } from 'ngx-quill';
import { NgAudioRecorderModule } from 'ng-audio-recorder'; // https://github.com/killroywashere/ng-audio-recorder#readme
import { NgxTimerModule } from 'ngx-timer'; // https://github.com/Y4SHVINE/ngx-timer-lib
import Counter from './services/quill/counter';
import { NgDynamicBreadcrumbModule } from "ng-dynamic-breadcrumb";
import { MatchHeightDirective } from './directives/match-height.directive';
import { NgxGraphModule } from '@swimlane/ngx-graph';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    WebviewDirective,
    MatchHeightDirective,
    MomentPipe
  ],
  imports: [
    TranslateModule,
    FormsModule,
    FilePondModule,
    GalleryModule.forRoot(),
    FlexLayoutModule,
    NgxAudioPlayerModule,
    QuillModule.forRoot({
      customModules: [{
        implementation: Counter,
        path: 'modules/counter'
      }],
      customOptions: [{
        import: 'formats/font',
        whitelist: ['mirza', 'roboto', 'aref', 'serif', 'sansserif', 'monospace']
      }]
    }),
    NgAudioRecorderModule,
    NgxTimerModule,
    NgDynamicBreadcrumbModule,
    NgxGraphModule
  ],
  exports: [
    TranslateModule,
    WebviewDirective,
    MatchHeightDirective,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    MomentPipe,
    FilePondModule,
    GalleryModule,
    MaterialModule,
    FlexLayoutModule,
    NgxAudioPlayerModule,
    QuillModule,
    NgxTimerModule,
    NgDynamicBreadcrumbModule,
    NgxGraphModule
  ],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA]
})
export class SharedModule {}
