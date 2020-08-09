import { Component, Input, OnInit, NgZone, AfterViewInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Book } from '../../data-access/entities/book.entity';
import { DatabaseService } from '../../data-access/database.service';
import { MatDialog } from '@angular/material/dialog';
import { AddItemPlotComponent } from '../../dialogs/add-item-plot/add-item-plot.component';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4plugins_forceDirected from "@amcharts/amcharts4/plugins/forceDirected";

import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);

// import am4themes_material from "@amcharts/amcharts4/themes/material";
// am4core.useTheme(am4themes_material);

@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.sass'],
  providers: []
})
export class PlotComponent implements OnInit, AfterViewInit, OnDestroy {

  // https://www.amcharts.com/docs/v4/getting-started/integrations/using-angular2/
  // https://www.amcharts.com/demos/force-directed-tree/
  // https://www.amcharts.com/docs/v4/chart-types/force-directed/#Creating_a_series

  @Input() book: Book;
  form: FormGroup;

  private chart: am4plugins_forceDirected.ForceDirectedTree;

  constructor(
    private databaseService: DatabaseService,
    private zone: NgZone,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      value: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
    });
  }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      const chart = am4core.create("chart", am4plugins_forceDirected.ForceDirectedTree);
      const networkSeries = chart.series.push(new am4plugins_forceDirected.ForceDirectedSeries());

      chart.data = [
        {
          name: "Core",
          children: [
            {
              name: "First",
              children: [
                { name: "A1", value: 100 },
                { name: "A2", value: 60 }
              ]
            },
            {
              name: "Second",
              children: [
                { name: "B1", value: 135 },
                { name: "B2", value: 98 }
              ]
            },
            {
              name: "Third",
              children: [
                {
                  name: "C1",
                  children: [
                    { name: "EE1", value: 130 },
                    { name: "EE2", value: 87 },
                    { name: "EE3", value: 55 }
                  ]
                },
                { name: "C2", value: 148 },
                {
                  name: "C3", children: [
                    { name: "CC1", value: 53 },
                    { name: "CC2", value: 30 }
                  ]
                },
                { name: "C4", value: 26 }
              ]
            },
            {
              name: "Fourth",
              children: [
                { name: "D1", value: 415 },
                { name: "D2", value: 148 },
                { name: "D3", value: 89 }
              ]
            },
            {
              name: "Fifth",
              children: [
                {
                  name: "E1",
                  children: [
                    { name: "EE1", value: 33 },
                    { name: "EE2", value: 40 },
                    { name: "EE3", value: 89 }
                  ]
                },
                {
                  name: "E2",
                  value: 148
                }
              ]
            }

          ]
        }
      ];

      networkSeries.dataFields.value = "value";
      networkSeries.dataFields.name = "name";
      networkSeries.dataFields.children = "children";
      networkSeries.nodes.template.tooltipText = "{name}:{value}";
      networkSeries.nodes.template.fillOpacity = 1;

      networkSeries.nodes.template.label.text = "{name}";
      networkSeries.fontSize = 10;

      networkSeries.links.template.strokeWidth = 1;

      const hoverState = networkSeries.links.template.states.create("hover");
      hoverState.properties.strokeWidth = 3;
      hoverState.properties.strokeOpacity = 1;

      networkSeries.nodes.template.events.on("over", (event) => { // mouse over
        event.target.dataItem.childLinks.each((link) => {
          link.isHover = true;
        });

        if (event.target.dataItem.parentLink) {
          event.target.dataItem.parentLink.isHover = true;
        }
      });

      networkSeries.nodes.template.events.on("out", (event) => { // mouse out
        event.target.dataItem.childLinks.each((link) => {
          link.isHover = false;
        });

        if (event.target.dataItem.parentLink) {
          event.target.dataItem.parentLink.isHover = false;
        }
      });

      // networkSeries.nodes.template.events.on("hit", (event) => { // click
      //   console.log(event.target);
      // });

      networkSeries.nodes.template.events.on("doublehit", (event) => { // double click
        // console.log(event.target.label.dataItem.dataContext);
        console.log(event.target.dataItem.dataContext);
      });

      this.chart = chart;
    });
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

  openAddItemPlotDialog() {
    const dialogRef = this.dialog.open(AddItemPlotComponent, {
      data: {
        form: this.form
      },
      disableClose: true,
      width: '60vw'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addItemPlot();
      }

      this.form.reset();
    });
  }

  addItemPlot() {
    const {name, value, description} = this.form.value;

    this.chart.addData({
      name,
      value,
      description,
      id: 0
    }, 0);

    this.form.reset();
    this.dialog.closeAll();
  }
}
