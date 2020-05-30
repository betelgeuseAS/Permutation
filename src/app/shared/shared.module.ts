import { NgModule } from '@angular/core';
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
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
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

@NgModule({
  declarations: [
    PageNotFoundComponent,
    WebviewDirective,
    MomentPipe
  ],
  imports: [
    TranslateModule,
    FormsModule,
    FilePondModule,
    GalleryModule.forRoot(),
    EditorModule,
    FlexLayoutModule,
    NgxAudioPlayerModule
  ],
  exports: [
    TranslateModule,
    WebviewDirective,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    MomentPipe,
    FilePondModule,
    GalleryModule,
    EditorModule,
    MaterialModule,
    FlexLayoutModule,
    NgxAudioPlayerModule
  ],
  providers: [
    {
      provide: TINYMCE_SCRIPT_SRC,
      useValue: 'tinymce/tinymce.min.js'
    }
  ]
})
export class SharedModule {}
