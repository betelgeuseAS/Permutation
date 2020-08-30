import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Book } from '../../data-access/entities/book.entity';
import { DatabaseService } from '../../data-access/database.service';
import { MatDialog } from '@angular/material/dialog';

import { uuid, isUuid } from 'uuidv4';
import * as _ from 'lodash';

import { Edge, Node, Layout, MiniMapPosition, GraphComponent, ClusterNode } from '@swimlane/ngx-graph';
import { DagreNodesOnlyLayout } from '../../shared/services/ngx-graph/customDagreNodesOnly';
import * as shape from 'd3-shape';
import { NgGraphService } from '../../shared/services/ngx-graph/ng-graph.service';
import { AddItemPlotDialogComponent } from '../../dialogs/add-item-plot-dialog/add-item-plot-dialog.component';
import { PlotItemSheetComponent } from '../../dialogs/plot-item-sheet/plot-item-shet.component';
import { ListenerService } from '../../shared/services/listener.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

interface NodeContext {
  node: Node;
}

interface ConnectContext {
  fromNode: string;
  toNode: string;
}

@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.sass'],
  providers: []
})
export class PlotComponent implements OnInit {

  @Input() book: Book;

  @ViewChild(GraphComponent, { static: true }) ngxGraph: GraphComponent;

  form: FormGroup;

  nodes: Node[] = [];
  links: Edge[] = [];
  clusters: ClusterNode[] = [
    // {
    //   id: '',
    //   label: '',
    //   childNodeIds: [/*List Node ids*/]
    // }
  ];
  layoutSettings = this.ngGraphService.getLayoutSettings();
  curve: any = shape.curveBasis; // or shape.curveLinear, ...
  layout: Layout = new DagreNodesOnlyLayout(); // or 'dagre', 'dagreCluster', 'dagreNodesOnly', 'd3ForceDirected', 'colaForceDirected'
  update$: Subject<boolean> = new Subject();
  center$: Subject<boolean> = new Subject();
  zoomToFit$: Subject<boolean> = new Subject();
  panToNode$: Subject<boolean> = new Subject();
  miniMapPosition = MiniMapPosition;
  nodeContext: NodeContext = {node: null};
  connectContext: ConnectContext = {fromNode: '', toNode: ''};

  constructor(
    private databaseService: DatabaseService,
    public dialog: MatDialog,
    private ngGraphService: NgGraphService,
    private bottomSheet: MatBottomSheet,
    private listenerService: ListenerService
  ) {
    this.listenerService.listen().subscribe((m: any) => {
      switch (m) {
        case 'PLOT_ADD':
          this.openAddItemPlotDialog('add_child');
          break;
        case 'PLOT_EDIT':
          this.openEditItemPlotDialog();
          break;
        case 'PLOT_REMOVE':
          this.removeItemPlot();
          break;
        default:
          break;
      }
    });
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', /*Validators.required*/),
      description: new FormControl('', Validators.required),
      // value: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      color: new FormControl()
    });

    const {plotNodes, plotLinks} = this.book;

    this.nodes = plotNodes ? JSON.parse(plotNodes) : [];
    this.links = plotLinks ? JSON.parse(plotLinks) : [];
    // this.clusters = JSON.parse(this.book.plotClusters);
  }

  updateGraph() { // update the graph
    this.update$.next(true);
  }

  centerGraph() { // center the graph
    this.center$.next(true);
  }

  fitGraph() { // zoom the graph to fit in the viewport
    this.zoomToFit$.next(true);
  }

  panToNodeGraph() { // pans the graph to center on the node ID passed emited from the observable
    this.panToNode$.next(true);
  }

  openEditPlotItemSheet(node: Node) {
    this.nodeContext.node = node;

    const bottomSheetRef = this.bottomSheet.open(PlotItemSheetComponent, {
      data: {
        node
      }
    });

    bottomSheetRef.afterDismissed().subscribe(() => {});
  }

  openAddItemPlotDialog(modifier: string = 'add') {
    const dialogRef = this.dialog.open(AddItemPlotDialogComponent, {
      data: {
        form: this.form
      },
      disableClose: true,
      width: '60vw'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addEditItemPlot(modifier);
      }

      this.form.reset();
    });
  }

  openEditItemPlotDialog() {
    const {label, data} = this.nodeContext.node;

    this.form.controls.name.setValue(label);
    this.form.controls.description.setValue(data.lines.join('\n'));
    this.form.controls.color.setValue(data.backgroundColor);

    this.openAddItemPlotDialog('edit');
  }

  addEditItemPlot(modifier: string = 'add') {
    const {name, description, color} = this.form.value;
    const lines = description.split('\n');

    const add = (id: string = '') => {
      // Separate by 3 charts
      // const parts = description.match(/[\s\S]{1,3}/g) || [];

      this.nodes.push({
        id: isUuid(id) ? id : uuid(),
        label: name,
        data: {
          lines,
          backgroundColor: color
        }
      });
    };

    const edit = () => {
      const index = _.findIndex(this.nodes, {id: this.nodeContext.node.id});

      this.nodes[index].label = name;
      this.nodes[index].data = {
        lines,
        backgroundColor: color
      };
    };

    const addChild = () => {
      const id = uuid();

      add(id);

      this.links.push({
        // id: uuid(),
        source: this.nodeContext.node.id,
        target: id
      });
    };

    switch (modifier) {
      case 'edit':
        edit();
        break;
      case 'add_child':
        addChild();
        break;
      default: // 'add'
        add();
        break;
    }

    this.updateGraph();
    this.dialog.closeAll();
    this.bottomSheet.dismiss();
  }

  removeItemPlot() {
    _.remove(this.nodes, {id: this.nodeContext.node.id});

    this.updateGraph();
    this.bottomSheet.dismiss();
  }

  connectNodesHandler(node: Node) {
    if (!this.connectContext.fromNode) {
      this.connectContext.fromNode = node.id;
    } else if (this.connectContext.fromNode && !this.connectContext.toNode) {
      this.connectContext.toNode = node.id;
    }
  }

  createConnectionNodes() {
    const {fromNode, toNode} = this.connectContext;

    if (fromNode && toNode) {
      this.links.push({
        source: fromNode,
        target: toNode
      });

      this.updateGraph();
      this.clearConnectionNodes();
    }
  }

  removeConnectionNodes() {
    const {fromNode, toNode} = this.connectContext;

    if (fromNode && toNode) {
      _.remove(this.links, {source: fromNode, target: toNode});

      this.updateGraph();
      this.clearConnectionNodes();
    }
  }

  clearConnectionNodes() {
    this.connectContext.fromNode = null;
    this.connectContext.toNode = null;
  }

  getFillColorNode(node: Node) {
    const color = node.data.backgroundColor;

    if (!color) {
      return node.data.color;
    }

    return color;
  }
}
