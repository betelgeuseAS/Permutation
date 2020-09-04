import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { DatabaseService } from '../../../data-access/database.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { QuillService } from '../../../shared/services/quill/quill.service';
import { QuillEditorComponent } from 'ngx-quill';
import { NgDynamicBreadcrumbService } from 'ng-dynamic-breadcrumb';
import { RemoveSheetComponent } from '../../../dialogs/remove-sheet/remove-sheet.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ToastService } from 'angular-toastify';
import { Note } from '../../../data-access/entities/note.entity';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.sass']
})
export class NoteComponent implements OnInit {

  id: number;
  note: Note;

  form: FormGroup;

  @ViewChild(QuillEditorComponent, { static: true }) quillEditor: QuillEditorComponent;
  quillModules: object;
  quillContent: string | null;

  private subscription: Subscription;

  constructor(
    private databaseService: DatabaseService,
    private activateRoute: ActivatedRoute,
    public quillService: QuillService,
    private ngDynamicBreadcrumbService: NgDynamicBreadcrumbService,
    private bottomSheet: MatBottomSheet,
    private toastService: ToastService
  ) {
    this.subscription = activateRoute.params.subscribe(params => this.id = params.noteId);

    this.getNoteById(this.id);
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required)
    });

    this.quillModules = this.quillService.getModule({
      quillEditor: this.quillEditor
    });
  }

  getNoteById(noteId) {
    this.databaseService
      .connection
      .then(() => Note.findOne({ where: {id: noteId},  relations: [/*'images'*/] }))
      .then(note => {
        this.note = note;

        this.updateNoteBreadcrumb();

        this.form.controls.name.setValue(this.note.name);
        this.quillContent = this.note.content;
      });
  }

  updateNoteHandler() {
    if (this.form.valid) {
      const {name} = this.form.value;
      const note = this.note;

      note.name = name;
      note.content = this.quillContent;

      this.databaseService
        .connection
        .then(() => note.save())
        .then(() => {
          this.getNoteById(this.id);

          this.form.reset();
        })
        .then(() => {
          this.toastService.success('Note successfully updated');
        })
        .catch((error) => {
          this.toastService.warn('Unable to update Note');
        });
    }
  }

  updateNoteBreadcrumb() {
    this.ngDynamicBreadcrumbService.updateBreadcrumb([
      {
        label: 'Dashboard',
        url: 'dashboard'
      },
      {
        label: this.note.book.name,
        url: 'book/:bookId'
      },
      {
        label: this.note.name,
        url: ''
      }
    ]);
  }

  removeNoteSheet(): void {
    this.bottomSheet.open(RemoveSheetComponent, {
      data: {
        entity: Note,
        item: this.note
      }
    });
  }
}
