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

interface Options {
  quillEditor: any;
  dataMention: Array<{id: number; value: string}>;
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

  constructor() {
    // Set new icons in exits buttons
    // Quill icons: https://github.com/quilljs/quill/tree/develop/assets/icons
    const icons = Quill.import('ui/icons');
    // icons['bold'] = '<i class="fa fa-bold" aria-hidden="true"></i>';
    icons['undo'] = '<svg viewbox="0 0 18 18"><polygon class="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10"></polygon><path class="ql-stroke" d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"></path></svg>';
    icons['redo'] = '<svg viewbox="0 0 18 18"><polygon class="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10"></polygon><path class="ql-stroke" d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5"></path></svg>';
  }

  getModule({
     quillEditor = null,
     dataMention = []
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
        mentionDenotationChars: ["@", "#"],
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
          const values = dataMention;

          if (searchTerm.length === 0) {
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

          // ----------
          // let values;
          //
          // if (mentionChar === "@") {
          //   values = atValues;
          // } else {
          //   values = hashValues;
          // }
          //
          // if (searchTerm.length === 0) {
          //   renderList(values, searchTerm);
          // } else {
          //   const matches = [];
          //   for (let i = 0; i < values.length; i++)
          //     if (
          //       ~values[i].value.toLowerCase().indexOf(searchTerm.toLowerCase())
          //     )
          //       matches.push(values[i]);
          //   renderList(matches, searchTerm);
          // }
        }
      },

      // Image resize plugin:
      // https://www.npmjs.com/package/quill-image-resize
      imageResize: {
        displaySize: true,
        modules: ['Resize', 'DisplaySize', 'Toolbar'], // You can add own module https://www.npmjs.com/package/quill-image-resize
        // handleStyles: {
        //   backgroundColor: 'black',
        //   border: 'none',
        //   color: 'white'
        // },
        // toolbarStyles: {
        //   backgroundColor: 'black',
        //   border: 'none',
        //   color: 'white'
        // },
        // toolbarButtonStyles: {},
        // toolbarButtonSvgStyles: {},
      },
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
          ['counter'], // custom counter

          ['undo', 'redo']
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
              editor.insertText(editor.getLength(), `${wordsCount} word(s)`, {color: '#17A2B8', italic: true});
            }
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
