import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';

interface DialogData {
  form: FormGroup;
}

@Component({
  selector: 'app-create-book-dialog',
  templateUrl: './add-item-plot-dialog.component.html',
  styleUrls: ['./add-item-plot-dialog.component.sass']
})
export class AddItemPlotDialogComponent implements OnInit {

  // ngx-color-picker
  // https://www.npmjs.com/package/ngx-color-picker
  // https://zefoy.github.io/ngx-color-picker/

  form: FormGroup = this.data.form;

  cpColorMode = 'color'; // 'color', 'grayscale', 'presets'
  cpOutputFormat = 'auto'; // 'auto', 'hex', 'rgba', 'hsla'
  cpAlphaChannel = 'enabled'; // 'enabled', 'disabled', 'always', 'forced'
  cpPosition = 'auto'; // 'auto', 'top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left', 'bottom-right'
  cpDialogDisplay = 'popup'; // 'popup', 'inline'

  // openDialog() // Opens the color picker dialog if not already open.
  // closeDialog() // Closes the color picker dialog if not already closed.

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  ngOnInit(): void {}

  getResult(): object {
    return {};
  }

  colorPickerOpen(event) { // Current color value, send when dialog is opened (value: string).
    // console.log(event);
  }

  colorPickerClose(event) {  // Current color value, send when dialog is closed (value: string).
    // console.log(event);
  }

  colorPickerChange(event) { // Changed color value, send when color is changed (value: string).
    this.form.controls.color.setValue(event);
  }

  colorPickerCancel() { // Color select canceled, send when Cancel button is pressed (void).
    // console.log(event);
  }

  colorPickerSelect(event) { // Selected color value, send when OK button is pressed (value: string).
    // console.log(event);
  }

  cpToggleChange(event) { // Status of the dialog, send when dialog is opened / closed (open: boolean).
    // console.log(event);
  }

  cpInputChange(event) { // Input name and its value, send when user changes color through inputs ({input: string, value: number | string, color: string})
    // console.log(event);
  }

  cpSliderChange(event) { // Slider name and its value, send when user changes color through slider ({slider: string, value: number | string, color: string})
    // console.log(event);
  }

  cpSliderDragStart(event) { // Slider name and current color, send when slider dragging starts (mousedown,touchstart) ({slider: string, color: string})
    // console.log(event);
  }

  cpSliderDragEnd(event) { // Slider name and current color, send when slider dragging ends (mouseup,touchend) ({slider: string, color: string})
    // console.log(event);
  }

  cpCmykColorChange(event) { // Outputs the color as CMYK string if CMYK is enabled (value: string).
    // console.log(event);
  }

  cpPresetColorsChange(event) { // Preset colors, send when 'Add Color' button is pressed (value: array).
    // console.log(event);
  }
}
