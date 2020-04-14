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
registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginFileRename,
  FilePondPluginImageCrop,
  FilePondPluginImageExifOrientation,
  FilePondPluginFileValidateType,
  FilePondPluginImageValidateSize
);

import { PageNotFoundComponent } from './components/';
import { WebviewDirective } from './directives/';

import { TranslateModule } from '@ngx-translate/core';

import { MomentPipe } from './pipes/moment.pipe';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    WebviewDirective,
    MomentPipe
  ],
  imports: [
    TranslateModule,
    FormsModule,
    FilePondModule
  ],
  exports: [
    TranslateModule,
    WebviewDirective,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    MomentPipe,
    FilePondModule
  ]
})
export class SharedModule {}
