import { Injectable } from '@angular/core';

// import {EditorChangeContent, EditorChangeSelection} from 'ngx-quill';

import Quill from 'quill';
// const parchment = Quill.import('parchment');
// const block = parchment.query('block');
// block.tagName = 'DIV';
// // or class NewBlock extends Block {} NewBlock.tagName = 'DIV'
// Quill.register(block /* or NewBlock */, true);

// It can be also in main.ts file imported:
import 'quill-emoji';
import 'quill-mention';

// import {Mention} from 'quill-mention';
// Quill.register('modules/mention', Mention);

import ImageResize from 'quill-image-resize-module';
Quill.register('modules/imageResize', ImageResize);

import { DatabaseService } from '../../../data-access/database.service';
import { Hero } from '../../../data-access/entities/hero.entity';

import { MatDialog } from '@angular/material/dialog';
import { InfoQuillDialogComponent } from '../../../dialogs/info-quill-dialog/info-quill-dialog.component';

interface Options {
  quillEditor: any;
  matModal: MatDialog;
}

@Injectable({
  providedIn: 'root'
})
export class QuillService {
  // ng-quill: https://github.com/KillerCodeMonkey/ngx-quill
  // Quill: https://quilljs.com/docs/quickstart/
  // Quill API: https://quilljs.com/docs/api/
  // Building a Custom Module: https://quilljs.com/guides/building-a-custom-module/
  // Examples: https://killercodemonkey.github.io/ngx-quill-example/

  // Themes (add themes into angular.json):
  // "node_modules/quill/dist/quill.bubble.css" - Bubble is a simple tooltip based theme.
  // "node_modules/quill/dist/quill.snow.css" - Snow is a clean, flat toolbar theme.
  // "node_modules/quill/dist/quill.core.css"

  // Options: https://quilljs.com/docs/configuration/#options

  // HTML:
  // <quill-editor></quill-editor>
  // <quill-view-html [content]="content" theme="snow"></quill-view-html>
  // <quill-editor
  //   [styles]="{height: '200px'}"
  //   (onFocus)="focus($event)"
  //   (onEditorChanged)="changedEditor($event)"
  //   (onBlur)="blur($event)"
  //   (onEditorCreated)="created($event)"
  //   [(ngModel)]="content"
  //   [modules]="modules" - https://quilljs.com/docs/modules/
  //   customToolbarPosition="top"
  //   [placeholder]="editorPlacehorder"
  //   [debug]="debug" - https://quilljs.com/docs/api/#debug
  //   [formats]="formats" - https://quilljs.com/docs/formats/
  //   [bounds]="bounds"
  //   [readOnly]="readOnly"
  //   [scrollingContainer]="scrollingContainer"
  //   theme="snow"
  // ></quill-editor>
  // import { EditorChangeContent, EditorChangeSelection, QuillEditorComponent } from 'ngx-quill';
  // import Quill from 'quill';
  // created(event: Quill) {
  //   // tslint:disable-next-line:no-console
  //   // console.log('editor-created', event);
  // }
  // changedEditor(event: EditorChangeContent | EditorChangeSelection) {
  //   // tslint:disable-next-line:no-console
  //   console.log('editor-change', event);
  // }
  // focus($event) {
  //   // tslint:disable-next-line:no-console
  //   console.log('focus', $event);
  // }
  // blur($event) {
  //   // tslint:disable-next-line:no-console
  //   console.log('blur', $event);
  // }

  dataMention: {
    heroes?: Array<{id: number; value: string}>,
    places?: Array<{id: number; value: string}>,
    notes?: Array<{id: number; value: string}>,
    plots?: Array<{id: number; value: string}>
  } = {};

  constructor(
    private databaseService: DatabaseService,
  ) {
    this.manageQuillIcons();
    this.manageDataMention();
  }

  protected manageQuillIcons() {
    // Set new icons in exits buttons
    // Quill icons: https://github.com/quilljs/quill/tree/develop/assets/icons
    const icons = Quill.import('ui/icons');
    // icons['bold'] = '<i class="fa fa-bold" aria-hidden="true"></i>';
    icons.undo = '<svg viewbox="0 0 18 18"><polygon class="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10"></polygon><path class="ql-stroke" d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"></path></svg>';
    icons.redo = '<svg viewbox="0 0 18 18"><polygon class="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10"></polygon><path class="ql-stroke" d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5"></path></svg>';
    icons.info = '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><g><g><path d="M256,0C114.497,0,0,114.507,0,256c0,141.503,114.507,256,256,256c141.503,0,256-114.507,256-256C512,114.497,397.492,0,256,0z M256,472c-119.393,0-216-96.615-216-216c0-119.393,96.615-216,216-216c119.393,0,216,96.615,216,216C472,375.393,375.384,472,256,472z"/></g></g><g><g><path d="M266,128.878h-70c-11.046,0-20,8.954-20,20c0,11.046,8.954,20,20,20h70c16.542,0,30,13.458,30,30s-13.458,30-30,30h-20c-11.046,0-20,8.954-20,20v28.792c0,11.046,8.954,20,20,20s20-8.954,20-20v-8.792c38.598,0,70-31.402,70-70C336,160.28,304.598,128.878,266,128.878z"/></g></g><g><g><circle cx="246" cy="349.16" r="27"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>\n';
  }

  protected manageDataMention() {
    this.databaseService
      .connection
      .then(() => Hero.find({ select: ["id", "name"] }))
      .then(heroes => {
        this.dataMention.heroes = heroes.map(item => {
          return {id: item.id, value: item.name};
        });
      });
  }

  getModule({
    quillEditor = null,
    matModal = null
  }: Options): object {
    return { // https://quilljs.com/docs/modules/
      // Emoji plugin:
      // https://www.npmjs.com/package/quill-emoji
      // https://stackblitz.com/edit/ngx-quill-emoji?file=src%2Fapp%2Fapp.component.ts
      'emoji-shortname': true,
      'emoji-textarea': false,
      'emoji-toolbar': true,

      // Mention plugin:
      // https://www.npmjs.com/package/quill-mention
      // https://github.com/afry/quill-mention
      mention: {
        allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
        mentionDenotationChars: ["@", "#", "Hero-", "Place-", "Note-", "Plot-"],
        onSelect: (item, insertItem) => {
          // const editor = this.editor.quillEditor;
          const editor = quillEditor.quillEditor;
          insertItem(item);
          // necessary because quill-mention triggers changes as 'api' instead of 'user'
          editor.insertText(editor.getLength() - 1, '', 'user');
        },
        source: (searchTerm, renderList, mentionChar) => {
          // const values = [
          //   { id: 1, value: 'Value 1' },
          //   { id: 2, value: 'Value 2' }
          // ];
          let values = [];

          switch (mentionChar) {
            case 'Hero-':
              values = this.dataMention.heroes;
              break;
            case 'Place-':
              values = this.dataMention.places;
              break;
            case 'Note-':
              values = this.dataMention.notes;
              break;
            case 'Plot-':
              values = this.dataMention.plots;
              break;
          }

          if (searchTerm.length === 0 || !values) {
            renderList(values, searchTerm);
          } else {
            const matches = [];

            values.forEach((entry) => {
              if (entry.value.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
                matches.push(entry);
              }
            });
            renderList(matches, searchTerm);
          }
        }
      },

      // Image resize plugin:
      // https://www.npmjs.com/package/quill-image-resize
      // imageResize: {
      //   displaySize: true,
      //   modules: ['Resize', 'DisplaySize', 'Toolbar'], // You can add own module https://www.npmjs.com/package/quill-image-resize
      //   // handleStyles: {
      //   //   backgroundColor: 'black',
      //   //   border: 'none',
      //   //   color: 'white'
      //   // },
      //   // toolbarStyles: {
      //   //   backgroundColor: 'black',
      //   //   border: 'none',
      //   //   color: 'white'
      //   // },
      //   // toolbarButtonStyles: {},
      //   // toolbarButtonSvgStyles: {},
      // },
      // imageResize: true,

      toolbar: { // https://quilljs.com/docs/modules/toolbar/
        container: [
          ['bold', 'italic', 'underline', 'strike'], // toggled buttons
          ['blockquote', 'code-block'],

          [{header: 1}, {header: 2}], // custom button values
          [{list: 'ordered'}, {list: 'bullet'}],
          [{script: 'sub'}, {script: 'super'}], // superscript/subscript
          [{indent: '-1'}, {indent: '+1'}], // outdent/indent
          [{direction: 'rtl'}], // text direction

          [{size: ['small', /*'normal'*/false, 'large', 'huge']}], // custom dropdown
          [{header: [1, 2, 3, 4, 5, 6, false]}],

          // ['image'], // image
          // ['code-block'], // code block
          [{ color: [] }, { background: [] }],
          [{font: [] }],
          [{align: []}],

          ['clean'], // remove formatting button

          ['link', 'image', 'video'],

          ['emoji'], // emoji module

          ['undo', 'redo'],

          ['counter'], // custom counter

          ['info'], // custom info
        ],
        handlers: {
          // link(value) {
          //   if (value) {
          //     const href = prompt('Enter the URL');
          //     this.quill.format('link', href);
          //   } else {
          //     this.quill.format('link', false);
          //   }
          // }
          undo() { // Name similar as in toolbar container
            quillEditor.quillEditor.history.undo();
          },
          redo() {
            quillEditor.quillEditor.history.redo();
          },
          counter() {
            const btn = document.querySelector('.ql-toolbar .ql-formats .ql-counter');
            if (btn) {
              const wordsCount = btn.innerHTML.match(/\d+/g)[0];
              const editor = quillEditor.quillEditor;
              const suffix = Number(wordsCount) > 1 ? 's' : '';
              editor.insertText(editor.getLength(), `${wordsCount} word${suffix}`, {color: '#17A2B8', italic: true});
            }
          },
          info() {
            matModal.open(InfoQuillDialogComponent, {
              data: {},
              disableClose: true,
              width: '50vw'
            });
          }
        }
      },

      keyboard: { // https://quilljs.com/docs/modules/keyboard/
        // bindings: {
        //   custom: { // Shift + B
        //     key: 'B',
        //     shiftKey: true,
        //     handler(range, context) {
        //       // Handle shift+b
        //       console.log(range, context);
        //     }
        //   },
        // }
      },

      history: { // https://quilljs.com/docs/modules/history/
        delay: 2000,
        maxStack: 500,
        userOnly: true
      },

      clipboard: { // https://quilljs.com/docs/modules/clipboard/

      },

      // https://quilljs.com/docs/modules/syntax/
      // You nee include Highlight.js:
      // https://highlightjs.org/
      // https://ngx-highlight.netlify.app/
      syntax: false,

      // Custom counter plugin:
      // counter: { container: '#counter', unit: 'word' }
      counter: {container: '.ql-counter', unit: 'word'} // custom counter
    };
  }
}
