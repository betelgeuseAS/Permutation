import { Injectable } from '@angular/core';

// import * as FilePond from 'filepond';

interface Options {
  name?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  allowMultiple?: boolean;
  maxFiles?: number;
  ignoredFiles?: Array<string>;
  files?: Array<string>;
  allowImagePreview?: boolean;
  imagePreviewMinHeight?: number;
  imagePreviewMaxHeight?: number;
  imageCropAspectRatio?: string;
  acceptedFileTypes?: Array<string>;
}

@Injectable({
  providedIn: 'root'
})
export class FilepondService {

  // HTML:
  // <file-pond
  //   [options]="options" - type: object
  //   [files]="files" - type: Array<string>
  //   (oninit)="pondHandleInit()"
  //   (onaddfile)="pondHandleAddFile($event)">
  // </file-pond>

  // Events: https://pqina.nl/filepond/docs/patterns/api/filepond-instance/
  // document.addEventListener('FilePond:loaded', e => {});

  // Methods: https://pqina.nl/filepond/docs/patterns/api/filepond-instance/
  // import * as FilePond from 'filepond';
  // createFilePond(element, options) {
  //   const pond = FilePond.create(element, options);
  //   pond.appendTo(document.body);
  // }

  getOptions({
     name = 'filepond',
     className = null,
     required = false,
     disabled = false,
     allowMultiple = false,
     maxFiles = 1,
     ignoredFiles = [],
     files = [],
     allowImagePreview = false,
     imagePreviewMinHeight = 44,
     imagePreviewMaxHeight = 256,
     imageCropAspectRatio = '1:1',
     acceptedFileTypes = []
   }: Options): object/*FilePond.FilePond*/ {
    return {
      // Core modules https://pqina.nl/filepond/docs/patterns/api/filepond-instance/
      element: null,
      status: 0,
      name,
      className,
      required,
      disabled,
      captureMethod: null,
      allowDrop: true,
      allowBrowse: true,
      allowPaste: true,
      allowMultiple,
      allowReplace: true,
      allowRevert: true,
      allowReorder: false,
      forceRevert: false,
      maxFiles,
      maxParallelUploads: null,
      checkValidity: false,
      itemInsertLocation: 'before',
      itemInsertInterval: 75,

      // Drag n’ Drop related https://pqina.nl/filepond/docs/patterns/api/filepond-instance/
      dropOnPage: false,
      dropOnElement: true,
      dropValidation: false,
      ignoredFiles: ['.ds_store', 'thumbs.db', 'desktop.ini', ...ignoredFiles],

      // Server configuration https://pqina.nl/filepond/docs/patterns/api/filepond-instance/
      files: [...files],
      instantUpload: false,
      server: null, // Server API configuration https://pqina.nl/filepond/docs/patterns/api/server/
      chunkUploads: false,
      chunkForce: false,
      chunkSize: 5000000,
      chunkRetryDelays: [500, 1000, 3000],

      // Labels https://pqina.nl/filepond/docs/patterns/api/filepond-instance/
      // labelDecimalSeparator: auto,
      // labelThousandsSeparator : auto,
      labelIdle: 'Drag & Drop your picture or <span class="filepond--label-action">Browse</span>',
      labelInvalidField: 'Field contains invalid files',
      labelFileWaitingForSize: 'Waiting for size',
      labelFileSizeNotAvailable: 'Size not available',
      labelFileLoading: 'Loading',
      labelFileLoadError: 'Error during load',
      labelFileProcessing: 'Uploading',
      labelFileProcessingComplete: 'Upload complete',
      labelFileProcessingAborted: 'Upload cancelled',
      labelFileProcessingError: 'Error during upload',
      labelFileProcessingRevertError: 'Error during revert',
      labelFileRemoveError: 'Error during remove',
      labelTapToCancel: 'tap to cancel',
      labelTapToRetry: 'tap to retry',
      labelTapToUndo: 'tap to undo',
      labelButtonRemoveItem: 'Remove',
      labelButtonAbortItemLoad: 'Abort',
      labelButtonRetryItemLoad: 'Retry',
      labelButtonAbortItemProcessing: 'Cancel',
      labelButtonUndoItemProcessing: 'Undo',
      labelButtonRetryItemProcessing: 'Retry',
      labelButtonProcessItem: 'Upload',

      // SVG Icons
      // iconRemove={'<svg></svg>'}
      // iconProcess={'<svg></svg>'}
      // iconRetry={'<svg></svg>'}
      // iconUndo={'<svg></svg>'}

      // Callbacks
      // oninit: () => { console.log('FilePond instance has initialised'); },
      // onwarning: (error) => { console.log(error); },
      // onerror: (error) => { console.log(error); },
      // onaddfilestart: (file) => { console.log(file); },
      // onaddfileprogress: (file, progress) => { console.log(file, progress); },
      // onaddfile: (error, file) => { console.log(error, file); },
      // onprocessfilestart: (file) => { console.log(file); },
      // onprocessfileprogress: (file, progress) => { console.log(file, progress); },
      // onprocessfileabort: (file) => { console.log(file); },
      // onprocessfilerevert: (file) => { console.log(file); },
      // onprocessfile: (error, file) => { console.log(error, file); },
      // onprocessfiles: () => { console.log(); },
      // onremovefile: (error, file) => { console.log(error, file); },
      // onpreparefile: (file, output) => { console.log(file, output); },
      // onupdatefiles: (files) => { console.log(files); },
      // onactivatefile: (file) => { console.log(file); },

      // Hooks
      // beforeDropFile: (file) => { console.log(file); },
      // beforeAddFile: (item) => { console.log(item); },
      // beforeRemoveFile: (item) => { console.log(item); },

      // Styles
      stylePanelLayout: null,
      stylePanelAspectRatio: null,
      styleButtonRemoveItemPosition: 'left',
      styleButtonProcessItemPosition: 'right',
      styleLoadIndicatorPosition: 'right',
      styleProgressIndicatorPosition: 'right',
      styleItemPanelAspectRatio: null,

      // Plugins: https://pqina.nl/filepond/docs/patterns/plugins/introduction/
      // FilePondPluginImagePreview (Plugin) https://pqina.nl/filepond/docs/patterns/plugins/image-preview/
      allowImagePreview,
      imagePreviewMinHeight,
      imagePreviewMaxHeight,
      imagePreviewHeight: null,
      imagePreviewMaxFileSize: null,
      imagePreviewTransparencyIndicator: null,
      imagePreviewMaxInstantPreviewFileSize: 1000000,
      imagePreviewMarkupShow: true,
      imagePreviewMarkupFilter: (markupItem) => true,
      // FilePondPluginFileRename (Plugin) https://pqina.nl/filepond/docs/patterns/plugins/file-rename/
      allowFileRename: true,
      // fileRenameFunction: () => 'file',
      // FilePondPluginImageCrop (Plugin) https://pqina.nl/filepond/docs/patterns/plugins/image-crop/
      allowImageCrop: true,
      imageCropAspectRatio/*16:10*/,
      // FilePondPluginImageExifOrientation (Plugin) https://pqina.nl/filepond/docs/patterns/plugins/image-exif-orientation/
      allowImageExifOrientation: true,
      // FilePondPluginImageValidateSize
      allowImageValidateSize: true,
      imageValidateSizeMinWidth: 1,
      imageValidateSizeMaxWidth: 65535,
      imageValidateSizeMinHeight: 1,
      imageValidateSizeMaxHeight: 65535,
      imageValidateSizeLabelFormatError: 'Image type not supported',
      imageValidateSizeLabelImageSizeTooSmall: 'Image is too small',
      imageValidateSizeLabelImageSizeTooBig: 'Image is too big',
      imageValidateSizeLabelExpectedMinSize: 'Minimum size is {minWidth} × {minHeight}',
      imageValidateSizeLabelExpectedMaxSize: 'Maximum size is {maxWidth} × {maxHeight}',
      imageValidateSizeMinResolution: null,
      imageValidateSizeMaxResolution: null,
      imageValidateSizeLabelImageResolutionTooLow: 'Resolution is too low',
      imageValidateSizeLabelImageResolutionTooHigh: 'Resolution is too high',
      imageValidateSizeLabelExpectedMinResolution: 'Minimum resolution is {minResolution}',
      imageValidateSizeLabelExpectedMaxResolution: 'Maximum resolution is {maxResolution}',
      imageValidateSizeMeasure: null, // () => {}
      // FilePondPluginFileValidateType (Plugin)
      allowFileTypeValidation: true,
      acceptedFileTypes: [...acceptedFileTypes],
      labelFileTypeNotAllowed: 'File of invalid type',
      fileValidateTypeLabelExpectedTypes: 'Expects {allButLastType} or {lastType}',
      fileValidateTypeLabelExpectedTypesMap: {},
      fileValidateTypeDetectType: null, // (file, type) => { return Promise; }
      // FileEncode (Plugin)
      allowFileEncode: true
    };
  }

  getFiles(): Array<string> {
    return [/*'index.html'*/];
  }
}
