import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { ListenerService } from '../../shared/services/listener.service';

interface SheetData {
  itemContext: object;
}

@Component({
  selector: 'app-remove-sheet',
  templateUrl: './plot-item-sheet.component.html',
  styleUrls: ['./plot-item-sheet.component.sass']
})
export class PlotItemSheetComponent implements OnInit {

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: SheetData,
    private bottomSheetRef: MatBottomSheetRef<PlotItemSheetComponent>,
    private listenerService: ListenerService
  ) {}

  ngOnInit(): void {}

  addHandler() {
    this.listenerService.filter('PLOT_ADD');
  }

  editHandler() {
    this.listenerService.filter('PLOT_EDIT');
  }

  removeHandler() {
    this.listenerService.filter('PLOT_REMOVE');
  }

  cancelHandler() {
    this.bottomSheetRef.dismiss();
  }
}
