import {AfterViewInit, Component, Input, NgZone, OnDestroy, OnInit} from '@angular/core';

import { Book } from '../../data-access/entities/book.entity';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4plugins_forceDirected from "@amcharts/amcharts4/plugins/forceDirected";

import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);
// import am4themes_material from "@amcharts/amcharts4/themes/material";
// am4core.useTheme(am4themes_material);

import * as _ from 'lodash';

interface ChartData {
  name: string;
  value?: number;
  children: ChartData[];
}

@Component({
  selector: 'app-book-statistic',
  templateUrl: './book-statistic.component.html',
  styleUrls: ['./book-statistic.component.sass'],
  providers: []
})
export class BookStatisticComponent implements OnInit, AfterViewInit, OnDestroy {

  // https://www.amcharts.com/docs/v4/getting-started/integrations/using-angular2/
  // https://www.amcharts.com/demos/force-directed-tree/
  // https://www.amcharts.com/demos/collapsible-force-directed-tree/
  // https://www.amcharts.com/docs/v4/chart-types/force-directed/#Creating_a_series

  @Input() books: Book[] = [];

  private chart: am4plugins_forceDirected.ForceDirectedTree;

  constructor(
    private zone: NgZone
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => { // WARNING: inside this method we can't use angular methods
      this.chart = am4core.create("chart", am4plugins_forceDirected.ForceDirectedTree);
      const networkSeries = this.chart.series.push(new am4plugins_forceDirected.ForceDirectedSeries());

      this.chart.data.push(this.prepareBooksChartData());
      // this.chart.data = [
      //   {
      //     name: "Core",
      //     children: [
      //       {
      //         name: "Third",
      //         children: [
      //           {
      //             name: "C1",
      //             children: [
      //               { name: "EE1", value: 130 },
      //               { name: "EE2", value: 87 },
      //               { name: "EE3", value: 55 }
      //             ]
      //           },
      //           { name: "C2", value: 148 },
      //           {
      //             name: "C3", children: [
      //               { name: "CC1", value: 53 },
      //               { name: "CC2", value: 30 }
      //             ]
      //           },
      //           { name: "C4", value: 26 }
      //         ]
      //       }
      //     ]
      //   }
      // ];

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

      // networkSeries.nodes.template.events.on("doublehit", (event) => { // double click
      //   this.chart.openModal("Modal.");
      //
      //   // event.target.label.dataItem.dataContext
      //   // event.target.dataItem.dataContext
      // });
    });
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

  prepareBooksChartData(): ChartData {
    const books = this.populatePartChartData('Books', 10, this.books);

    _.forEach(this.books, (book, item) => {
      const heroes = this.populatePartChartData('Heroes', 5, book.heroes);

      if (heroes) {
        books.children[item].children.push(heroes);
      }
    });

    return books;
  }

  populatePartChartData(name: string, value: number, parts) {
    const item = {
      name,
      value,
      children: []
    };

    _.forEach(parts, part => {
      item.children.push({
        name: part.name,
        value,
        children: []
      });
    });

    return item;
  }
}
