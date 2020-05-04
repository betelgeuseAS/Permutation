import { Injectable } from '@angular/core';

interface Options {
  placeholderText?: string;
  charCounterCount?: boolean;
  toolbarInline?: boolean;
  events?: any;
}

@Injectable({
  providedIn: 'root'
})
export class FroalaService {

  // https://froala.com/wysiwyg-editor/examples/
  // https://github.com/froala/angular-froala-wysiwyg#extend-functionality

  // HTML:
  // <div
  //   [froalaEditor]="options" // options - options froala
  //   (froalaInit)="initialize($event)" // initialize - own writhing method
  //   [(froalaModel)]="content" // init content; [ngModel] - for one way binding, [(froalaModel)] - for two way binding
  // >Test</div>

  // Examples: https://froala.com/wysiwyg-editor/examples/

  // Options: https://froala.com/wysiwyg-editor/docs/options

  // Events: https://froala.com/wysiwyg-editor/docs/events/

  // Methods: https://froala.com/wysiwyg-editor/docs/methods/

  // Plugins https://froala.com/wysiwyg-editor/docs/plugins
  // Include Plugins (js files from node_modules) for get more functionality.
  // Available Plugins:
  // Name */* Description */* JS to include */* CSS to include
  // Align */*	Adds the align option. */* ../js/plugins/align.min.js */*	-
  // Char Counter */*	Limits the number of characters that can be inserted in the editor. */*	../js/plugins/char_counter.min.js */*	../css/plugins/char_counter.min.css
  // Code Beautifier */* Beautifies the code inside the code view mode. */*	../js/plugins/code_beautifier.min.js */* -
  // Code View */* Enables code view for the editor content. */* ../js/plugins/code_view.min.js	*/* ../css/plugins/code_view.min.css
  // Colors */*	Adds the possibility to change the background and text colors. */* ../js/plugins/colors.min.js */* ../css/plugins/colors.min.css
  // Draggable */* Adds to drag content. E.g.: images, videos. */* ../js/plugins/draggable.min.js */* ../css/plugins/draggable.min.css
  // Embedly */* Embeds any content from the web in the editor */* ../js/third_party/embedly.min.js */* ../css/third_party/embedly.min.css
  // Emoticons */* Makes your users smile */* ../js/plugins/emoticons.min.js */* ../css/plugins/emoticons.min.css
  // Entities */* Converts characters to special HTML entities. */* ../js/plugins/entities.min.js */* -
  // File */* Upload any kind of files and special links will be inserted in the editor to download them. */* ../js/plugins/file.min.js */* ../css/plugins/file.min.css
  // Font Awesome */*	Insert Font Awesome icons in the editor text. */* ../js/third_party/font_awesome.min.js */* -
  // Font */* Family	Allows users to select from different font types. */* ../js/plugins/font_family.min.js */* -
  // Font Size */* Allows users to change the font size with pixel precision. */* ../js/plugins/font_size.min.js */* -
  // Fullscreen */* Adds fullscreen option. */* ../js/plugins/fullscreen.min.js */* ../css/plugins/fullscreen.min.css
  // Help */* Displays the shortcuts inside the editor. */* ../js/plugins/help.min.js */* ../css/plugins/help.min.css
  // Image */* Enables advanced image editing. */* ../js/plugins/image.min.js */* ../css/plugins/image.min.css
  // Image Manager */* Browse through and delete images on your server. */* ../js/plugins/image_manager.min.js */* ../css/plugins/image_manager.min.css
  // Image Tui */* Make photos beautiful in seconds with stunning filters, frames, stickers, touch-up tools and more. */* ../js/third_party/image_tui.min.js */* ../css/third_party/image_tui.min.css
  // Inline Class */* Define custom classes for selected text. */* ../js/plugins/inline_class.min.js */* -
  // Inline Style */* Define custom styles for selected text. */* ../js/plugins/inline_style.min.js */* -
  // Line Breaker */* Helper to add new lines between elements such as tables. */* ../js/plugins/line_breaker.min.js */* ../css/plugins/line_breaker.min.css
  // Line Height */* Allows users to select the line height for the current selected paragraph. */* ../js/plugins/line_height.min.js */* -
  // Link */* Enables advanced link editing. */* ../js/plugins/link.min.js */* -
  // Lists */* Allows users to insert lists in the editor. */* ../js/plugins/lists.min.js */* -
  // Paragraph Format */* Allows users to change the type of a paragraph. */* ../js/plugins/paragraph_format.min.js */* -
  // Paragraph Style */* Allows user to choose a style for a paragraph. */* ../js/plugins/paragraph_style.min.js */* -
  // Print */* Adds print option to the toolbar. */* ../js/plugins/print.min.js */* -
  // Quick Insert */* Helper to add images, tables and other stuff easier. */* ../js/plugins/quick_insert.min.js */* ../css/plugins/quick_insert.min.css
  // Quote */* Adds quote option. */* ../js/plugins/quote.min.js */* -
  // Save */* Enables AJAX saving of the content inside the editor. */* ../js/plugins/save.min.js */* -
  // Special Characters */* Adds the possibility to insers special characters. */* ../js/plugins/special_characters.min.js */* ../css/plugins/special_characters.min.css
  // Spell Checker */* Allows the user to see and correct misspellings while typing. */* ../js/third_party/spell_checker.min.js */* ../css/third_party/spell_checker.min.css
  // Table */* Basic and advanced operations on cells, rows and columns. */* ../js/plugins/table.min.js */* ../css/plugins/table.min.css
  // Url */* Convert text to URL as you type. */* ../js/plugins/url.min.js */* -
  // Video */* Easily insert videos by URL or by embedded code. */* ../js/plugins/video.min.js */* ../css/plugins/video.min.css
  // Word Paste */* Cleans the HTML pasted from Word. */* ../js/plugins/word_paste.min.js */* -

  getOptions({
    placeholderText = 'Type Something',
    charCounterCount = true,
    toolbarInline = false,
    events = null
  }: Options): object {
    return {
      // apiKey: '',
      app: 'froala',
      attribution: true,
      autoStart: true,
      autofocus: false,
      charCounterCount,
      charCounterMax: -1,
      codeBeautifierOptions: {
        end_with_newline: true,
        indent_inner_html: true,
        extra_liners: "['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'pre', 'ul', 'ol', 'table', 'dl']",
        brace_style: 'expand',
        indent_char: '\t',
        indent_size: 1,
        wrap_line_length: 0
      },
      codeMirror: false,
      codeMirrorOptions: {
        indentWithTabs: true,
        lineNumbers: true,
        lineWrapping: true,
        mode: 'text/html',
        tabMode: 'indent',
        tabSize: 2
      },
      codeViewKeepActiveButtons: 	["fullscreen"],
      // codoxOptions: {},
      colorsBackground: [
        '#61BD6D', '#1ABC9C', '#54ACD2', '#2C82C9', '#9365B8', '#475577', '#CCCCCC',
        '#41A85F', '#00A885', '#3D8EB9', '#2969B0', '#553982', '#28324E', '#000000',
        '#F7DA64', '#FBA026', '#EB6B56', '#E25041', '#A38F84', '#EFEFEF', '#FFFFFF',
        '#FAC51C', '#F37934', '#D14841', '#B8312F', '#7C706B', '#D1D5D8', 'REMOVE'
      ],
      colorsButtons: ["colorsBack", "|", "-"],
      colorsHEXInput: true,
      colorsStep: 7,
      colorsText: [
        '#61BD6D', '#1ABC9C', '#54ACD2', '#2C82C9', '#9365B8', '#475577', '#CCCCCC',
        '#41A85F', '#00A885', '#3D8EB9', '#2969B0', '#553982', '#28324E', '#000000',
        '#F7DA64', '#FBA026', '#EB6B56', '#E25041', '#A38F84', '#EFEFEF', '#FFFFFF',
        '#FAC51C', '#F37934', '#D14841', '#B8312F', '#7C706B', '#D1D5D8', 'REMOVE'
      ],
      direction: 'auto',
      disableRightClick: false,
      // docId: '',
      documentReady: false,
      dragInline: true,
      editInPopup: false,
      // editor: Floala,
      editorClass: null,
      embedlyEditButtons: ['embedlyRemove'],
      embedlyInsertButtons: ['embedlyBack', '|'],
      embedlyKey: null,
      embedlyScriptPath: 'https://cdn.embedly.com/widgets/platform.js',
      emoticonsButtons: ["emoticonsBack", "|"],
      emoticonsSet: [
        {code: '1f600', desc: 'Grinning face'},
        {code: '1f601', desc: 'Grinning face with smiling eyes'},
        {code: '1f602', desc: 'Face with tears of joy'},
        {code: '1f603', desc: 'Smiling face with open mouth'},
        {code: '1f604', desc: 'Smiling face with open mouth and smiling eyes'},
        {code: '1f605', desc: 'Smiling face with open mouth and cold sweat'},
        {code: '1f606', desc: 'Smiling face with open mouth and tightly-closed eyes'},
        {code: '1f607', desc: 'Smiling face with halo'},

        {code: '1f608', desc: 'Smiling face with horns'},
        {code: '1f609', desc: 'Winking face'},
        {code: '1f60a', desc: 'Smiling face with smiling eyes'},
        {code: '1f60b', desc: 'Face savoring delicious food'},
        {code: '1f60c', desc: 'Relieved face'},
        {code: '1f60d', desc: 'Smiling face with heart-shaped eyes'},
        {code: '1f60e', desc: 'Smiling face with sunglasses'},
        {code: '1f60f', desc: 'Smirking face'},

        {code: '1f610', desc: 'Neutral face'},
        {code: '1f611', desc: 'Expressionless face'},
        {code: '1f612', desc: 'Unamused face'},
        {code: '1f613', desc: 'Face with cold sweat'},
        {code: '1f614', desc: 'Pensive face'},
        {code: '1f615', desc: 'Confused face'},
        {code: '1f616', desc: 'Confounded face'},
        {code: '1f617', desc: 'Kissing face'},

        {code: '1f618', desc: 'Face throwing a kiss'},
        {code: '1f619', desc: 'Kissing face with smiling eyes'},
        {code: '1f61a', desc: 'Kissing face with closed eyes'},
        {code: '1f61b', desc: 'Face with stuck out tongue'},
        {code: '1f61c', desc: 'Face with stuck out tongue and winking eye'},
        {code: '1f61d', desc: 'Face with stuck out tongue and tightly-closed eyes'},
        {code: '1f61e', desc: 'Disappointed face'},
        {code: '1f61f', desc: 'Worried face'},

        {code: '1f620', desc: 'Angry face'},
        {code: '1f621', desc: 'Pouting face'},
        {code: '1f622', desc: 'Crying face'},
        {code: '1f623', desc: 'Persevering face'},
        {code: '1f624', desc: 'Face with look of triumph'},
        {code: '1f625', desc: 'Disappointed but relieved face'},
        {code: '1f626', desc: 'Frowning face with open mouth'},
        {code: '1f627', desc: 'Anguished face'},

        {code: '1f628', desc: 'Fearful face'},
        {code: '1f629', desc: 'Weary face'},
        {code: '1f62a', desc: 'Sleepy face'},
        {code: '1f62b', desc: 'Tired face'},
        {code: '1f62c', desc: 'Grimacing face'},
        {code: '1f62d', desc: 'Loudly crying face'},
        {code: '1f62e', desc: 'Face with open mouth'},
        {code: '1f62f', desc: 'Hushed face'},

        {code: '1f630', desc: 'Face with open mouth and cold sweat'},
        {code: '1f631', desc: 'Face screaming in fear'},
        {code: '1f632', desc: 'Astonished face'},
        {code: '1f633', desc: 'Flushed face'},
        {code: '1f634', desc: 'Sleeping face'},
        {code: '1f635', desc: 'Dizzy face'},
        {code: '1f636', desc: 'Face without mouth'},
        {code: '1f637', desc: 'Face with medical mask'}
      ],
      emoticonsStep: 8,
      emoticonsUseImage: true,
      // enter: FroalaEditor.ENTER_P,
      entities: '&quot;&#39;&iexcl;&cent;&pound;&curren;&yen;&brvbar;&sect;&uml;&copy;&ordf;&laquo;&not;&shy;&reg;&macr;&deg;&plusmn;&sup2;&sup3;&acute;&micro;&para;&middot;&cedil;&sup1;&ordm;&raquo;&frac14;&frac12;&frac34;&iquest;&Agrave;&Aacute;&Acirc;&Atilde;&Auml;&Aring;&AElig;&Ccedil;&Egrave;&Eacute;&Ecirc;&Euml;&Igrave;&Iacute;&Icirc;&Iuml;&ETH;&Ntilde;&Ograve;&Oacute;&Ocirc;&Otilde;&Ouml;&times;&Oslash;&Ugrave;&Uacute;&Ucirc;&Uuml;&Yacute;&THORN;&szlig;&agrave;&aacute;&acirc;&atilde;&auml;&aring;&aelig;&ccedil;&egrave;&eacute;&ecirc;&euml;&igrave;&iacute;&icirc;&iuml;&eth;&ntilde;&ograve;&oacute;&ocirc;&otilde;&ouml;&divide;&oslash;&ugrave;&uacute;&ucirc;&uuml;&yacute;&thorn;&yuml;&OElig;&oelig;&Scaron;&scaron;&Yuml;&fnof;&circ;&tilde;&Alpha;&Beta;&Gamma;&Delta;&Epsilon;&Zeta;&Eta;&Theta;&Iota;&Kappa;&Lambda;&Mu;&Nu;&Xi;&Omicron;&Pi;&Rho;&Sigma;&Tau;&Upsilon;&Phi;&Chi;&Psi;&Omega;&alpha;&beta;&gamma;&delta;&epsilon;&zeta;&eta;&theta;&iota;&kappa;&lambda;&mu;&nu;&xi;&omicron;&pi;&rho;&sigmaf;&sigma;&tau;&upsilon;&phi;&chi;&psi;&omega;&thetasym;&upsih;&piv;&ensp;&emsp;&thinsp;&zwnj;&zwj;&lrm;&rlm;&ndash;&mdash;&lsquo;&rsquo;&sbquo;&ldquo;&rdquo;&bdquo;&dagger;&Dagger;&bull;&hellip;&permil;&prime;&Prime;&lsaquo;&rsaquo;&oline;&frasl;&euro;&image;&weierp;&real;&trade;&alefsym;&larr;&uarr;&rarr;&darr;&harr;&crarr;&lArr;&uArr;&rArr;&dArr;&hArr;&forall;&part;&exist;&empty;&nabla;&isin;&notin;&ni;&prod;&sum;&minus;&lowast;&radic;&prop;&infin;&ang;&and;&or;&cap;&cup;&int;&there4;&sim;&cong;&asymp;&ne;&equiv;&le;&ge;&sub;&sup;&nsub;&sube;&supe;&oplus;&otimes;&perp;&sdot;&lceil;&rceil;&lfloor;&rfloor;&lang;&rang;&loz;&spades;&clubs;&hearts;&diams;',
      events,
      faButtons: ["fontAwesomeBack", "|"],
      fileAllowedTypes: ['*'],
      fileInsertButtons: ['fileBack', '|'],
      fileMaxSize: 1024 * 1024 * 10,
      fileUpload: true,
      fileUploadMethod: 'POST',
      fileUploadParam: 'file',
      fileUploadParams: {},
      fileUploadToS3: false,
      fileUploadURL: 'http://i.froala.com/upload',
      fileUseSelectedText: false,
      fontAwesomeSets: {},
      fontAwesomeTemplate: '<i class="fa fa-[NAME] fr-deletable" aria-hidden="true">&nbsp;</i>',
      fontFamily: {
        'Arial,Helvetica,sans-serif': 'Arial',
        'Georgia,serif': 'Georgia',
        'Impact,Charcoal,sans-serif': 'Impact',
        'Tahoma,Geneva,sans-serif': 'Tahoma',
        "'Times New Roman',Times,serif": 'Times New Roman',
        'Verdana,Geneva,sans-serif': 'Verdana'
      },
      fontFamilyDefaultSelection: 'Font Family',
      fontFamilySelection: false,
      fontSize: ['8', '9', '10', '11', '12', '14', '18', '24', '30', '36', '48', '60', '72', '96'],
      fontSizeDefaultSelection: '12',
      fontSizeSelection: false,
      fontSizeUnit: 'px',
      formEditButtons: ["inputStyle", "inputEdit"],
      formMultipleStyles: true,
      formStyles: {'fr-rounded': "Rounded", 'fr-large': "Large"},
      formUpdateButtons: ["inputBack", "|"],
      fullPage: false,
      height: null,
      heightMax: null,
      heightMin: null,
      helpSets: [
        {
          title: 'Inline Editor',
          commands: [
            { val: 'OSkeyE',  desc: 'Show the editor' }
          ]
        },
        {
          title: 'Common actions',
          commands: [
            { val: 'OSkeyC',  desc: 'Copy' },
            { val: 'OSkeyX',  desc: 'Cut' },
            { val: 'OSkeyV',  desc: 'Paste' },
            { val: 'OSkeyZ',  desc: 'Undo' },
            { val: 'OSkeyShift+Z',  desc: 'Redo' },
            { val: 'OSkeyK',  desc: 'Insert Link' },
            { val: 'OSkeyP',  desc: 'Insert Image' }
          ]
        },
        {
          title: 'Basic Formatting',
          commands: [
            { val: 'OSkeyA',  desc: 'Select All' },
            { val: 'OSkeyB',  desc: 'Bold' },
            { val: 'OSkeyI',  desc: 'Italic' },
            { val: 'OSkeyU',  desc: 'Underline' },
            { val: 'OSkeyS',  desc: 'Strikethrough' },
            { val: 'OSkey]',  desc: 'Increase Indent' },
            { val: 'OSkey[',  desc: 'Decrease Indent' }
          ]
        },
        {
          title: 'Quote',
          commands: [
            { val: 'OSkey\'',  desc: 'Increase quote level' },
            { val: 'OSkeyShift+\'',  desc: 'Decrease quote level' }
          ]
        },
        {
          title: 'Image / Video',
          commands: [
            { val: 'OSkey+',  desc: 'Resize larger' },
            { val: 'OSkey-',  desc: 'Resize smaller' }
          ]
        },
        {
          title: 'Table',
          commands: [
            { val: 'Alt+Space',  desc: 'Select table cell' },
            { val: 'Shift+Left/Right arrow',  desc: 'Extend selection one cell' },
            { val: 'Shift+Up/Down arrow',  desc: 'Extend selection one row' }
          ]
        },
        {
          title: 'Navigation',
          commands: [
            { val: 'OSkey/',  desc: 'Shortcuts' },
            { val: 'Alt+F10',  desc: 'Focus popup / toolbar' },
            { val: 'Esc',  desc: 'Return focus to previous position' }
          ]
        }
      ],
      htmlAllowComments: true,
      htmlAllowedAttrs: ['accept', 'accept-charset', 'accesskey', 'action', 'align', 'allowfullscreen', 'allowtransparency', 'alt', 'aria-.*', 'async', 'autocomplete', 'autofocus', 'autoplay', 'autosave', 'background', 'bgcolor', 'border', 'charset', 'cellpadding', 'cellspacing', 'checked', 'cite', 'class', 'color', 'cols', 'colspan', 'content', 'contenteditable', 'contextmenu', 'controls', 'coords', 'data', 'data-.*', 'datetime', 'default', 'defer', 'dir', 'dirname', 'disabled', 'download', 'draggable', 'dropzone', 'enctype', 'for', 'form', 'formaction', 'frameborder', 'headers', 'height', 'hidden', 'high', 'href', 'hreflang', 'http-equiv', 'icon', 'id', 'ismap', 'itemprop', 'keytype', 'kind', 'label', 'lang', 'language', 'list', 'loop', 'low', 'max', 'maxlength', 'media', 'method', 'min', 'mozallowfullscreen', 'multiple', 'muted', 'name', 'novalidate', 'open', 'optimum', 'pattern', 'ping', 'placeholder', 'playsinline', 'poster', 'preload', 'pubdate', 'radiogroup', 'readonly', 'rel', 'required', 'reversed', 'rows', 'rowspan', 'sandbox', 'scope', 'scoped', 'scrolling', 'seamless', 'selected', 'shape', 'size', 'sizes', 'span', 'src', 'srcdoc', 'srclang', 'srcset', 'start', 'step', 'summary', 'spellcheck', 'style', 'tabindex', 'target', 'title', 'type', 'translate', 'usemap', 'value', 'valign', 'webkitallowfullscreen', 'width', 'wrap'],
      htmlAllowedEmptyTags: ['textarea', 'a', 'iframe', 'object', 'video', 'style', 'script', '.fa', '.fr-emoticon', '.fr-inner', 'path', 'line', 'hr'],
      htmlAllowedStyleProps: [],
      htmlAllowedTags: ['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'blockquote', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'hgroup', 'hr', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'menu', 'menuitem', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'pre', 'progress', 'queue', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'style', 'section', 'select', 'small', 'source', 'span', 'strike', 'strong', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr'],
      htmlDoNotWrapTags: ['script', 'style'],
      htmlExecuteScripts: true,
      htmlIgnoreCSSProperties: [],
      htmlRemoveTags: ['script', 'style'],
      htmlSimpleAmpersand: false,
      htmlUntouched: false,
      iconsTemplate: 'svg',
      iframe: false,
      iframeDefaultStyle: 'html{margin: 0px;}body{padding:10px;background:transparent;color:#000000;position:relative;z-index: 2;-webkit-user-select:auto;margin:0px;overflow:hidden;}body:after{content:"";clear:both;display:block}',
      iframeStyle: '',
      iframeStyleFiles: [],
      imageAddNewLine: false,
      imageAllowedTypes: ['jpeg', 'jpg', 'png', 'gif', 'webp'],
      imageAltButtons: ['imageBack', '|'],
      imageCORSProxy: 'https://cors-anywhere.froala.com',
      imageDefaultAlign: 'center',
      imageDefaultDisplay: 'block',
      imageDefaultMargin: 5,
      imageDefaultWidth: 300,
      imageEditButtons: ['imageReplace', 'imageAlign', 'imageCaption', 'imageRemove', '|', 'imageLink', 'linkOpen', 'linkEdit', 'linkRemove', '-', 'imageDisplay', 'imageStyle', 'imageAlt', 'imageSize'],
      imageInsertButtons: ['imageBack', '|', 'imageUpload', 'imageByURL', 'imageManager'],
      imageManagerDeleteMethod: 'POST',
      imageManagerDeleteParams: {},
      imageManagerDeleteURL: '',
      imageManagerLoadMethod: 'GET',
      imageManagerLoadParams: {},
      imageManagerLoadURL: 'http://i.froala.com/load-files',
      imageManagerPageSize: 12,
      imageManagerPreloader: '',
      imageManagerScrollOffset: 20,
      imageManagerToggleTags: true,
      imageMaxSize: 1024 * 1024 * 10,
      imageMinWidth: 16,
      imageMove: true,
      imageMultipleStyles: true,
      imageOutputSize: false,
      imagePaste: true,
      imagePasteProcess: false,
      imageResize: true,
      imageResizeWithPercent: false,
      imageRoundPercent: false,
      imageSizeButtons: ['imageBack', '|'],
      imageSplitHTML: false,
      imageStyles: {
        'fr-rounded': 'Rounded',
        'fr-bordered': 'Bordered'
      },
      imageTUIOptions: {
        includeUI: {
          initMenu: "filter",
          menuBarPosition: "left",
          theme: {
            "menu.activeIcon.path": "https://cdn.jsdelivr.net/npm/tui-image-editor@3.2.2/dist/svg/icon-b.svg",
            "menu.disabledIcon.path": "https://cdn.jsdelivr.net/npm/tui-image-editor@3.2.2/dist/svg/icon-a.svg",
            "menu.hoverIcon.path": "https://cdn.jsdelivr.net/npm/tui-image-editor@3.2.2/dist/svg/icon-c.svg",
            "menu.normalIcon.path": "https://cdn.jsdelivr.net/npm/tui-image-editor@3.2.2/dist/svg/icon-d.svg",
            "submenu.activeIcon.name": "icon-c",
            "submenu.activeIcon.path": "https://cdn.jsdelivr.net/npm/tui-image-editor@3.2.2/dist/svg/icon-c.svg",
            "submenu.normalIcon.name": "icon-d",
            "submenu.normalIcon.path": "https://cdn.jsdelivr.net/npm/tui-image-editor@3.2.2/dist/svg/icon-d.svg"
          }
        }
      },
      imageTextNear: true,
      imageUpload: true,
      imageUploadMethod: 'POST',
      imageUploadParam: 'file',
      imageUploadParams: {},
      imageUploadRemoteUrls: true,
      imageUploadToS3: false,
      imageUploadURL: null,
      indentMargin: 20,
      initOnClick: false,
      inlineClasses: {
        'fr-class-code': 'Code',
        'fr-class-highlighted': 'Highlighted',
        'fr-class-transparency': 'Transparent'
      },
      inlineStyles: {
        'Big Red': 'font-size: 20px; color: red;',
        'Small Blue': 'font-size: 14px; color: blue;'
      },
      keepFormatOnDelete: false,
      language: null,
      lineBreakerHorizontalOffset: 10,
      lineBreakerOffset: 15,
      lineBreakerTags: ['table', 'hr', 'form', 'dl', 'span.fr-video', '.fr-embedly', '.fr-img-caption'],
      lineHeights: {
        Default: '',
        Single: '1',
        1.15: '1.15',
        1.5: '1.5',
        Double: '2'
      },
      linkAlwaysBlank: false,
      linkAlwaysNoFollow: true,
      linkAttributes: {},
      linkAutoPrefix: 'http://',
      linkConvertEmailAddress: true,
      linkEditButtons: ['linkOpen', 'linkStyle', 'linkEdit', 'linkRemove'],
      linkInsertButtons: ['linkBack', '|', 'linkList'],
      linkList: [],
      linkMultipleStyles: true,
      linkNoOpener: true,
      linkNoReferrer: true,
      linkStyles: {
        'fr-green': 'Green',
        'fr-strong': 'Thick'
      },
      linkText: false,
      listAdvancedTypes: true,
      multiLine: true,
      paragraphDefaultSelection: 'Paragraph Format',
      paragraphFormat: {
        N: 'Normal',
        H1: 'Heading 1',
        H2: 'Heading 2',
        H3: 'Heading 3',
        H4: 'Heading 4',
        PRE: 'Code'
      },
      paragraphFormatSelection: false,
      paragraphMultipleStyles: true,
      paragraphStyles: {
        'fr-text-gray': 'Gray',
        'fr-text-bordered': 'Bordered',
        'fr-text-spaced': 'Spaced',
        'fr-text-uppercase': 'Uppercase'
      },
      pasteAllowLocalImages: false,
      pasteAllowedStyleProps: [],
      pasteDeniedAttrs: ['class', 'id', 'style'],
      pasteDeniedTags: [],
      pastePlain: false,
      placeholderText, // The placeholder used when the WYSIWYG editor body is empty.
      pluginsEnabled: null, // The plugins that should be enabled in the current editor instance. By default, all plugins are enabled. Available plugins are: align, charCounter, codeBeautifier, codeView, colors, draggable, embedly, emoticons, entities, file, fontAwesome, fontFamily, fontSize, fullscreen, image, imageTUI, imageManager, inlineStyle, inlineClass, lineBreaker, lineHeight, link, lists, paragraphFormat, paragraphStyle, quickInsert, quote, save, table, url, video, wordPaste.
      quickInsertButtons: ['image', 'video', 'embedly', 'table', 'ul', 'ol', 'hr'],
      quickInsertEnabled: true,
      quickInsertTags: ['p', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'pre', 'blockquote'],
      requestHeaders: {},
      requestWithCORS: true,
      requestWithCredentials: false,
      saveInterval: 10000,
      saveMethod: 'POST',
      saveParam: 'body',
      saveParams: {},
      saveURL: null,
      scrollableContainer: 'body',
      shortcutsEnabled: ['show', 'bold', 'italic', 'underline', 'strikeThrough', 'indent', 'outdent', 'undo', 'redo', 'insertImage', 'createLink'],
      shortcutsHint: true,
      specialCharButtons: ["specialCharBack", "|"],
      specialCharactersSets: {},
      spellcheck: true,
      tabIndex: null,
      tabSpaces: 0,
      tableCellMultipleStyles: true,
      tableCellStyles: {
        'fr-highlighted': 'Highlighted',
        'fr-thick': 'Thick'
      },
      tableColors: [
        '#61BD6D', '#1ABC9C', '#54ACD2', '#2C82C9', '#9365B8', '#475577', '#CCCCCC',
        '#41A85F', '#00A885', '#3D8EB9', '#2969B0', '#553982', '#28324E', '#000000',
        '#F7DA64', '#FBA026', '#EB6B56', '#E25041', '#A38F84', '#EFEFEF', '#FFFFFF',
        '#FAC51C', '#F37934', '#D14841', '#B8312F', '#7C706B', '#D1D5D8', 'REMOVE'
      ],
      tableColorsButtons: ['tableBack', '|'],
      tableColorsStep: 7,
      tableDefaultWidth: '100%',
      tableEditButtons: ['tableHeader', 'tableRemove', '|', 'tableRows', 'tableColumns', 'tableStyle', '-', 'tableCells', 'tableCellBackground', 'tableCellVerticalAlign', 'tableCellHorizontalAlign', 'tableCellStyle'],
      tableInsertButtons: ['tableBack', '|'],
      tableInsertHelper: true,
      tableInsertHelperOffset: 15,
      tableInsertMaxSize: 10,
      tableMultipleStyles: true,
      tableResizer: true,
      tableResizerOffset: 5,
      tableResizingLimit: 30,
      tableStyles: {
        'fr-dashed-borders': 'Dashed Borders',
        'fr-alternate-rows': 'Alternate Rows'
      },
      theme: null, // "dark"
      toolbarBottom: false,
      toolbarButtons: {
        moreText: {
          buttons: ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', 'textColor', 'backgroundColor', 'inlineClass', 'inlineStyle', 'clearFormatting']
        },
        moreParagraph: {
          buttons: ['alignLeft', 'alignCenter', 'formatOLSimple', 'alignRight', 'alignJustify', 'formatOL', 'formatUL', 'paragraphFormat', 'paragraphStyle', 'lineHeight', 'outdent', 'indent', 'quote']
        },
        moreRich: {
          buttons: ['insertLink', 'insertImage', 'insertVideo', 'insertTable', 'emoticons', 'fontAwesome', 'specialCharacters', 'embedly', 'insertFile', 'insertHR']
        },
        moreMisc: {
          buttons: ['undo', 'redo', 'fullscreen', 'print', 'getPDF', 'spellChecker', 'selectAll', 'html', 'help'],
          align: 'right',
          buttonsVisible: 2
        }
      },
      toolbarButtonsMD: null,
      toolbarButtonsSM: {
        moreText: {
          buttons: ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', 'textColor', 'backgroundColor', 'inlineClass', 'inlineStyle', 'clearFormatting'],
          buttonsVisible: 2
        },
        moreParagraph: {
          buttons: ['alignLeft', 'alignCenter', 'formatOLSimple', 'alignRight', 'alignJustify', 'formatOL', 'formatUL', 'paragraphFormat', 'paragraphStyle', 'lineHeight', 'outdent', 'indent', 'quote'],
          buttonsVisible: 2
        },
        moreRich: {
          buttons: ['insertLink', 'insertImage', 'insertVideo', 'insertTable', 'emoticons', 'fontAwesome', 'specialCharacters', 'embedly', 'insertFile', 'insertHR'],
          buttonsVisible: 2
        },
        moreMisc: {
          buttons: ['undo', 'redo', 'fullscreen', 'print', 'getPDF', 'spellChecker', 'selectAll', 'html', 'help'],
          align: 'right',
          buttonsVisible: 2
        }
      },
      toolbarButtonsXS: {
        moreText: {
          buttons: ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', 'textColor', 'backgroundColor', 'inlineClass', 'inlineStyle', 'clearFormatting'],
          buttonsVisible: 0
        },
        moreParagraph: {
          buttons: ['alignLeft', 'alignCenter', 'formatOLSimple', 'alignRight', 'alignJustify', 'formatOL', 'formatUL', 'paragraphFormat', 'paragraphStyle', 'lineHeight', 'outdent', 'indent', 'quote'],
          buttonsVisible: 0
        },
        moreRich: {
          buttons: ['insertLink', 'insertImage', 'insertVideo', 'insertTable', 'emoticons', 'fontAwesome', 'specialCharacters', 'embedly', 'insertFile', 'insertHR'],
          buttonsVisible: 0
        },
        moreMisc: {
          buttons: ['undo', 'redo', 'fullscreen', 'print', 'getPDF', 'spellChecker', 'selectAll', 'html', 'help'],
          align: 'right',
          buttonsVisible: 2
        }
      },
      toolbarContainer: null,
      toolbarInline, // Enable or disable inline mode.
      toolbarSticky: true, // Keeps the toolbar at the top of the editing box in basic mode. Disabling this option, will keep the toolbar at the top of the page when scrolling down.
      toolbarStickyOffset: 0,
      toolbarVisibleWithoutSelection: false,
      tooltips: true,
      typingTimer: 500,
      useClasses: true,
      // username: '',
      videoAllowedProviders: ['.*'],
      videoAllowedTypes: ['mp4', 'webm', 'ogg'],
      videoDefaultAlign: 'center',
      videoDefaultDisplay: 'block',
      videoDefaultWidth: 600,
      videoEditButtons: ['videoReplace', 'videoRemove', '|', 'videoDisplay', 'videoAlign', 'videoSize'],
      videoInsertButtons: ['videoBack', '|', 'videoByURL', 'videoEmbed', 'videoUpload'],
      videoMaxSize: 1024 * 1024 * 30,
      videoMove: true,
      videoResize: true,
      videoResponsive: false,
      videoSizeButtons: ['videoBack', '|'],
      videoSplitHTML: false,
      videoTextNear: true,
      videoUpload: true,
      videoUploadMethod: 'POST',
      videoUploadParam: 'file',
      videoUploadParams: {},
      videoUploadToS3: false,
      videoUploadURL: null,
      width: 'auto', // Sets the width of the editing box.
      wordAllowedStyleProps: ['font-family', 'font-size', 'background', 'color', 'width', 'text-align', 'vertical-align', 'background-color', 'padding', 'margin', 'height', 'margin-top', 'margin-left', 'margin-right', 'margin-bottom', 'text-decoration', 'font-weight', 'font-style', 'text-indent', 'border', 'border-.*'],
      wordDeniedAttrs: [],
      wordDeniedTags: [],
      wordPasteKeepFormatting: true,
      wordPasteModal: true,
      zIndex: 1,
    };
  }
}
