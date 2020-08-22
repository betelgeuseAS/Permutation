import { Component, Input, OnInit} from '@angular/core';
import { Subject } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Book } from '../../data-access/entities/book.entity';
import { DatabaseService } from '../../data-access/database.service';
import { MatDialog } from '@angular/material/dialog';

import { uuid } from 'uuidv4';
import * as _ from 'lodash';

import { Edge, Node, Layout, MiniMapPosition } from '@swimlane/ngx-graph';
import { DagreNodesOnlyLayout } from '../../shared/services/ngx-graph/customDagreNodesOnly';
import * as shape from 'd3-shape';
import { NgGraphService } from '../../shared/services/ngx-graph/ng-graph.service';

@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.sass'],
  providers: []
})
export class PlotComponent implements OnInit {

  @Input() book: Book;

  form: FormGroup;

  nodes: Node[] = [
    {
      id: "000",
      label: "Start",
      data: {}
    },
    {
      id: "010",
      label: "OpenCloseNodeSpec",
      data: {
        details: [
          { heading: "Open/Closed Check", lines: ["action = OC", "closedaction = 800", "emergencyclosedaction = 015", "openaction = 015", "stattable = Account_Managers_169"] },
          { heading: "Reporting Write", lines: ["CS = Account Managers", "ST = Support", "SST = Support Enquiry"] },
          { heading: "Attached Data", lines: ["r_EnquiryType = AccountManagers", "r_CustomerPhone = ", "__replace_ANI = ", "r_EmergencyGroup = Site_Darra"] },
        ]
      }
    },
    {
      id: "015",
      label: "MessageNodeSpec",
      data: {
        details: [{ heading: "Play Message", lines: ["action = MSG", "messagegaxlist = Message_Account_Managers_Welcome", "nextaction = 020"] }]
      }
    },
    {
      id: "43afc77e_82cd_437c_ac25_aca81a544270",
      label: "CustomMessageNodeSpec",
      data: {
        details: [{ heading: null, lines: [] }]
      }
    },
    {
      id: "020",
      label: "DynamicMessageNodeSpec",
      data: {
        details: [{ heading: "Dynamic Message", lines: ["action = DMSG", "listid = DMSG_Account_Managers", "nextaction = 030"] }]
      }
    },
    {
      id: "030",
      label: "SetPriorityNodeSpec",
      data: {
        details: [{ heading: "Set Priority", lines: ["action = PRI", "increment = 10", "initial = 100", "interval = 30", "nextaction = Account_Managers_TGT"] }]
      }
    },
    {
      id: "3c5b26fa_bdd5_41b5_a4ba_335e7766dc9a",
      label: "EndCallNodeSpec",
      data: {
        details: [{ heading: null, lines: [] }]
      }
    },
    {
      id: "800",
      label: "MessageNodeSpec",
      data: {
        details: [
          { heading: "Play Message", lines: ["action = MSG", "messagegaxlist = Message_Account_Managers_OOH", "nextaction = 999"] },
          { heading: "Reporting Write", lines: ["ST = Closed", "SST = OOH"] }
        ]
      }
    },
    {
      id: "46857758_300b_40c8_af73_b4b495b4577a",
      label: "EndCallNodeSpec",
      data: {
        details: [{ heading: null, lines: [] }]
      }
    },
    {
      id: "900",
      label: "MessageNodeSpec",
      data: {
        details: [
          { heading: "Play Message", lines: ["action = MSG", "messagegaxlist = Message_Emergency", "nextaction = 999"] },
          { heading: "Reporting Write", lines: ["ST = Closed", "SST = Emergency"] }
        ]
      }
    },
    {
      id: "agent_Account_Managers_169",
      label: "AgentTargetNodeSpec",
      data: {
        details: [{ heading: null, lines: [] }]
      }
    },
    {
      id: "Account_Managers_TGT",
      label: "TargetNodeSpec",
      data: {
        details: [
          {
            heading: "Target Skill",
            lines: [
              "action = TGT",
              "msghold = 88888",
              "msgprivacy = 169900230",
              "noagentaction = ignore",
              "skill = Account_Managers_169",
              "targetfailaction = loop",
              "usecalculatedskill = true",
              "usecallback = false",
              "useewt = false",
              "useinqueuemessage = list",
              "msgstring = Music=General msgstring = Music=General msgstring = Music=General msgstring = Music=General",
            ],
          },
          { heading: "Attached Data", lines: ["WFM_AP_Account_Manager = true"] }
        ]
      }
    }
  ];
  links: Edge[] = [
    { source: "000", target: "010" },
    { source: "010", target: "015", label: "Open" },
    { source: "010", target: "800", label: "Closed" },
    { source: "010", target: "015", label: "Emergency Closed" },
    { source: "015", target: "020" },
    { source: "43afc77e_82cd_437c_ac25_aca81a544270", target: "030" },
    { source: "020", target: "43afc77e_82cd_437c_ac25_aca81a544270", label: "True" },
    { source: "020", target: "030", label: "False" },
    { source: "030", target: "Account_Managers_TGT" },
    { source: "800", target: "3c5b26fa_bdd5_41b5_a4ba_335e7766dc9a" },
    { source: "900", target: "46857758_300b_40c8_af73_b4b495b4577a" },
    { source: "Account_Managers_TGT", target: "agent_Account_Managers_169" },
    { source: "Account_Managers_TGT", target: "010", label: "No Agent" },
    { source: "Account_Managers_TGT", target: "Account_Managers_TGT", label: "Target Failure" }
  ];
  layoutSettings = this.ngGraphService.getLayoutSettings();
  curve: any = shape.curveBasis; // or shape.curveLinear, ...
  layout: Layout = new DagreNodesOnlyLayout(); // or 'dagre', 'dagreCluster', 'dagreNodesOnly', 'd3ForceDirected', 'colaForceDirected'
  update$: Subject<boolean> = new Subject();
  center$: Subject<boolean> = new Subject();
  zoomToFit$: Subject<boolean> = new Subject();
  panToNode$: Subject<boolean> = new Subject();
  miniMapPosition = MiniMapPosition;

  constructor(
    private databaseService: DatabaseService,
    public dialog: MatDialog,
    private ngGraphService: NgGraphService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      value: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
    });
  }

  public getStyles(node: Node): any {
    return {
      'background-color': node.data.backgroundColor,
    };
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
}
