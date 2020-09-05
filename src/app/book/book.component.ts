import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Book } from '../data-access/entities/book.entity';
import { DatabaseService } from '../data-access/database.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgDynamicBreadcrumbService } from 'ng-dynamic-breadcrumb';
import { QuillEditorComponent } from 'ngx-quill';
import { QuillService } from '../shared/services/quill/quill.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { RemoveSheetComponent } from '../dialogs/remove-sheet/remove-sheet.component';
import { ToastService } from 'angular-toastify';
import { GraphComponent } from '@swimlane/ngx-graph';
import { PlotComponent } from './plot/plot.component';


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.sass']
})
export class BookComponent implements OnInit {

  bookId: number;
  form: FormGroup;
  book: Book;
  private subscription: Subscription;

  @ViewChild(QuillEditorComponent, { static: true }) quillEditor: QuillEditorComponent;
  quillModules: object;
  quillContent: string | null;

  @ViewChild(PlotComponent, { static: true }) appPlot: PlotComponent;

  constructor(
    private databaseService: DatabaseService,
    private activateRoute: ActivatedRoute,
    private ngDynamicBreadcrumbService: NgDynamicBreadcrumbService,
    public quillService: QuillService,
    private bottomSheet: MatBottomSheet,
    private toastService: ToastService
  ) {
    this.subscription = activateRoute.params.subscribe(params => this.bookId = params.bookId);

    this.getBookById(this.bookId);
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
    });

    this.quillModules = this.quillService.getModule({
      quillEditor: this.quillEditor
    });
  }

  getBookById(bookId) {
    this.databaseService
      .connection
      .then(() => Book.findOne({ where: {id: bookId},  relations: ['heroes'/*, 'heroes.imagePreview'*/, 'notes', 'places'] }))
      .then(book => {
        this.book = book;

        this.form.controls.name.setValue(this.book.name);

        this.quillContent = this.book.content;

        this.updateBookBreadcrumb();
      });

    // let book = await repository.createQueryBuilder('book')
    //   .innerJoinAndSelect('book.heroes', 'heroes')
    //   .innerJoinAndSelect('heroes.imagePreview', 'imagePreview')
    //   .getMany();
  }

  updateBookHandler() {
    if (this.form.valid) {
      const {name} = this.form.value;
      const book = this.book;

      const ngxGraph: GraphComponent = this.appPlot.ngxGraph;

      book.name = name;
      book.plotNodes = JSON.stringify(ngxGraph.graph.nodes);
      book.plotLinks = JSON.stringify(ngxGraph.graph.edges);
      // book.plotClusters = JSON.stringify(this.appPlot.ngxGraph.graph.clusters);
      book.content = this.quillContent;

      this.databaseService
        .connection
        .then(() => book.save())
        .then(() => {
          this.getBookById(this.bookId);
        })
        .then(() => {
          // name = '';

          this.toastService.success('Book successfully updated');
        })
        .catch((error) => {
          this.toastService.warn('Unable to update Book');
        });
    }
  }

  updateBookBreadcrumb() {
    // this.ngDynamicBreadcrumbService.updateBreadcrumbLabels({
    //   bookBreadcrumb: this.book.name
    // });

    this.ngDynamicBreadcrumbService.updateBreadcrumb([
      {
        label: 'Dashboard',
        url: 'dashboard'
      },
      {
        label: this.book.name,
        url: ''
      }
    ]);
  }

  removeBookSheet(): void {
    this.bottomSheet.open(RemoveSheetComponent, {
      data: {
        entity: Book,
        item: this.book
      }
    });
  }
}
