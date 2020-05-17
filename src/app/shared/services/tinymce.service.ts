import { Injectable } from '@angular/core';

interface Options {

}

@Injectable({
  providedIn: 'root'
})
export class TinyMCEService {

  // TinyMCE: https://www.tiny.cloud/docs/

  // HTML:
  // <editor
  //   [init]="{
  //   height: 500,
  //   menubar: false,
  //   plugins: [
  //     'advlist autolink lists link image charmap print preview anchor',
  //     'searchreplace visualblocks code fullscreen',
  //     'insertdatetime media table paste code help wordcount'
  //     ]
  // }"
  // ></editor>

  getOptions({

   }: Options): object {
    return {
      // Integration options (Essential editor configuration, including `selector` and `plugins` keys) https://www.tiny.cloud/docs/configure/integration-and-setup/
      // auto_focus: 'element',
      // base_url: '/my/tinymce/dir',
      // cache_suffix: '?v=4.1.6',
      // content_security_policy: "default-src 'self'",
      // external_plugins: { // This option allows you to specify a URL based location of plugins outside of the normal TinyMCE plugins directory.
      //   testing: 'http://www.testing.com/plugin.min.js',
      //   maths: 'http://www.maths.com/plugin.min.js'
      // },
      // hidden_input: true,
      // init_instance_callback: (editor) => {
      //   console.log("Editor: " + editor.id + " is now initialized.");
      // },
      plugins: 'advlist autolink link image lists charmap print preview', // This option allows you to specify which plugins TinyMCE will attempt to load when starting up. By default, TinyMCE will not load any plugins.
      // referrer_policy: '',
      // selector: 'textarea#editable', // This option allows you to specify a CSS selector for the areas that TinyMCE should make editable.
      // setup: (editor) => { // This option allows you to specify a callback that will be executed before the TinyMCE editor instance is rendered.
      //   editor.on('click', (e) => {
      //     console.log('Editor was clicked');
      //   });
      // },
      // suffix: '.min',
      // target: element // Important: selector option has precedence over target, so in order for target to work, you should omit selector option altogether.

      // User interface options (Configure the editor's appearance, including menu and toolbar controls) https://www.tiny.cloud/docs/configure/editor-appearance/
      block_formats: 'Paragraph=p; Heading 1=h1; Heading 2=h2; Heading 3=h3; Heading 4=h4; Heading 5=h5; Heading 6=h6; Preformatted=pre', // This option defines the formats to be displayed in the formatselect dropdown toolbar button and the blockformats menu item. Each item in the string should be separated by semi-colons and specified using the form title=block.
      branding: false, // Use the branding option to disable the “Powered by Tiny” displayed in the status bar for product attribution.
      // contextmenu: 'link image imagetools table spellchecker',
      // contextmenu_never_use_native: false, // The contextmenu_never_use_native option allows you to disable the browser’s native context menu from appearing within the editor.
      // custom_ui_selector: '.my-custom-button',
      draggable_modal: false, // Use the draggable_modal option to enable dragging for modal dialogs.
      elementpath: true, // This option allows you to disable the element path within the status bar at the bottom of the editor.
      // event_root: '#root',
      // fixed_toolbar_container: '#mytoolbar', // Use this option to render the inline toolbar into a fixed positioned HTML element. For example, you could fix the toolbar to the top of the browser viewport.
      font_formats: 'Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats', // This option defines the fonts to be displayed in the fontselect dropdown toolbar button and the fontformats menu item. Each item in the string should be separated by semi-colons and specified using the form of: title=font-family.
      fontsize_formats: '11px 12px 14px 16px 18px 24px 36px 48px', // This option allows you to override the font sizes displayed in the fontsizeselect dropdown toolbar button and the fontsizes menu item. Each item in the string should be space or comma-separated and include units.
      height: 300, // height sets the height of the entire editor, including the menu bar, toolbars, and status bar. Note: If a number is provided, TinyMCE sets the height in pixels. If a string is provided, TinyMCE assumes the value is valid CSS and simply sets the editor’s height as the string value. This allows for alternate units such as %, em, and vh.
      // icons: '', // The icons option allows the editor icons to be extended or replaced using an icon pack. For information on creating icon packs, see: Create an icon pack for TinyMCE: https://www.tiny.cloud/docs/advanced/creating-an-icon-pack/
      // icons_url: '', // The icons_url option allows the editor icons to be extended or replaced using an icon pack. For information on creating icon packs, see: Create an icon pack for TinyMCE: https://www.tiny.cloud/docs/advanced/creating-an-icon-pack/
      inline: false, // The inline option allows you to specify whether TinyMCE should run in inline mode.
      // max_height: 500, // The max_height option has two kinds of behaviors depending on the state of the autoresize plugin: autoresize OFF (Default) : Without the autoresize plugin, this option allows you to set the maximum height that a user can stretch the entire TinyMCE interface (by grabbing the dragable area in the bottom right of the editor interface). autoresize ON : With the autoresize plugin, this option sets the maximum height the editor can automatically expand to.
      // max_width: 500, // Note: This behavior is different than the autoresize plugin, which controls the resizing of the editable area only, not the entire editor.
      menu: { // This option allows you to specify which menus should appear on TinyMCE’s menu bar and the items that should appear within the menus themselves.
        file: {title: 'File', items: 'newdocument restoredraft | preview | print '},
        edit: {title: 'Edit', items: 'undo redo | cut copy paste | selectall | searchreplace'},
        view: {title: 'View', items: 'code | visualaid visualchars visualblocks | spellchecker | preview fullscreen'},
        insert: {title: 'Insert', items: 'image link media template codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor toc | insertdatetime'},
        format: {title: 'Format', items: 'bold italic underline strikethrough superscript subscript codeformat | formats blockformats fontformats fontsizes align | forecolor backcolor | removeformat'},
        tools: {title: 'Tools', items: 'spellchecker spellcheckerlanguage | code wordcount'},
        table: {title: 'Table', items: 'inserttable | cell row column | tableprops deletetable'},
        help: {title: 'Help', items: 'help'}
      },
      menubar: 'file edit insert view format table tools help', // This option allows you to specify which menus should appear and the order that they appear in the menu bar at the top of TinyMCE. Possible Values: true, false, or string of menus.
      // min_height: 100, // The min_height option has two kinds of behaviors depending on the state of the autoresize plugin: autoresize OFF (Default) : Without the autoresize plugin, this option allows you to set the minimum height that a user can shrink the entire TinyMCE interface (by grabbing the dragable area in the bottom right of the editor interface). autoresize ON : With the autoresize plugin, this option sets the minimum height the editor can automatically shrink to.
      // min_width: 400, // Note that this behavior is different than the autoresize plugin, which controls the resizing of the editable area only, not the entire editor.
      // mobile: { // This option allows you specify an alternative configuration for mobile devices. This setting allows for overriding settings specifically for mobile devices. For information on customizing TinyMCE for mobile devices, see: TinyMCE mobile: https://www.tiny.cloud/docs/mobile/
      //   plugins: [ 'autosave', 'lists', 'autolink' ],
      //   toolbar: [ 'undo', 'bold', 'italic', 'styleselect' ]
      // },
      placeholder: 'Type here...', // Note: This feature is only available for TinyMCE 5.2 and later.
      // preview_styles: false, // This option lets you configure the preview of styles in format/style listboxes. Enter a string with the styles that you wish to preview separated by a blankspace, or disable the preview of of all styles by setting it to false. Possible Values: String, false
      // removed_menuitems: 'undo, redo', // This option allows you to remove items from TinyMCE’s drop down menus. This is useful if you are using the menubar option to set your menus rather than the more specific menu option.
      resize: true, // This option gives you the ability to disable the resize handle or set it to resize both horizontal and vertically. The option can be true, false or the string 'both'. Possible Values: true, false, 'both'.
      skin: "oxide", // This option allows you to specify the skin that TinyMCE should use. The default skin included with TinyMCE is named “oxide”. If you would like to create your own skin, please see the guide here: https://www.tiny.cloud/docs/advanced/creating-a-skin/
      // skin_url: '/css/mytinymceskin',
      statusbar: true, // This option allows you to specify whether TinyMCE should display the status bar at the bottom of the editor.
      // style_formats: [ // This option allows you to define custom items for the styleselect dropdown toolbar button and the formats menu item.
      //   { title: 'Headings', items: [
      //       { title: 'Heading 1', format: 'h1' },
      //       { title: 'Heading 2', format: 'h2' },
      //       { title: 'Heading 3', format: 'h3' },
      //       { title: 'Heading 4', format: 'h4' },
      //       { title: 'Heading 5', format: 'h5' },
      //       { title: 'Heading 6', format: 'h6' }
      //     ]},
      //   { title: 'Inline', items: [
      //       { title: 'Bold', format: 'bold' },
      //       { title: 'Italic', format: 'italic' },
      //       { title: 'Underline', format: 'underline' },
      //       { title: 'Strikethrough', format: 'strikethrough' },
      //       { title: 'Superscript', format: 'superscript' },
      //       { title: 'Subscript', format: 'subscript' },
      //       { title: 'Code', format: 'code' }
      //     ]},
      //   { title: 'Blocks', items: [
      //       { title: 'Paragraph', format: 'p' },
      //       { title: 'Blockquote', format: 'blockquote' },
      //       { title: 'Div', format: 'div' },
      //       { title: 'Pre', format: 'pre' }
      //     ]},
      //   { title: 'Align', items: [
      //       { title: 'Left', format: 'alignleft' },
      //       { title: 'Center', format: 'aligncenter' },
      //       { title: 'Right', format: 'alignright' },
      //       { title: 'Justify', format: 'alignjustify' }
      //     ]}
      // ],
      // style_formats_autohide: false,
      // style_formats_merge: false,
      theme: 'silver', // This option allows you to specify the theme that TinyMCE should use. The default theme included with TinyMCE is called Silver.
      // theme_url: '/mytheme/mytheme.js',
      // toolbar: 'undo redo | styleselect | bold italic | link image', // This option allows you to specify the buttons and the order that they will appear on TinyMCE’s toolbar. See: https://www.tiny.cloud/docs/advanced/editor-control-identifiers/#toolbarcontrols
      // or:
      toolbar: [
        {
          name: 'history', items: [ 'undo', 'redo' ]
        },
        {
          name: 'styles', items: [ 'styleselect' ]
        },
        {
          name: 'formatting', items: [ 'bold', 'italic']
        },
        {
          name: 'alignment', items: [ 'alignleft', 'aligncenter', 'alignright', 'alignjustify' ]
        },
        {
          name: 'indentation', items: [ 'outdent', 'indent' ]
        }
      ],
      // or:
      // toolbar: false, // To disable the toolbar, the toolbar option should be provided a boolean value of false.
      // or:
      // toolbar: [ // To specify multiple toolbars, the toolbar option should be provided with an array of space separated strings.
      //   'undo redo | styleselect | bold italic | link image',
      //   'alignleft aligncenter alignright'
      // ],
      toolbar_mode: 'floating', // The toolbar_mode option is used to extend the toolbar to accommodate the overflowing toolbar buttons. This option is useful for small screens or small editor frames. Possible Values: 'floating', 'sliding', 'scrolling', or 'wrap'.
      // toolbar_groups: { // The toolbar_groups option creates a toolbar button that displays a collection of other toolbar buttons as a pop-up toolbar. The style of toolbar shown is based on the current toolbar mode. For example, if toolbar_mode is set to floating, the toolbar group pop-up will appear in a floating shelf.
      //   formatting: {
      //     icon: 'bold',
      //     tooltip: 'Formatting',
      //     items: 'bold italic underline | superscript subscript'
      //   }
      // },
      toolbar_location: 'top', // The toolbar_location option is used to position the toolbar and menubar.
      toolbar_sticky: false, // A Sticky Toolbar (or Docking Toolbar), docks the toolbar and the menu to the top of the screen when scrolling down a web page until the editor is no longer visible.
      // width: 300, // Note: TinyMCE sets the width in pixels if a number is provided. However, if TinyMCE is provided a string it assumes the value is valid CSS and simply sets the editor’s width as the string value. This allows for alternate units such as %, em and vh.

      // Content appearance options (Configure the appearance of content inside TinyMCe's editable area) https://www.tiny.cloud/docs/configure/content-appearance/
      // body_class: 'my_class' // or 'elm1=my_class, elm2=my_class', // This option enables you to specify a class for the body of each editor instance. This class can then be used to do TinyMCE specific overrides in your content_css. There is also a specific mceForceColors class that can be used to override the text and background colors to be black and white.
      // body_id: 'my_id' // or 'elm1=my_id, elm2=my_id2', // This option enables you to specify an id for the body of each editor instance. This id can then be used to do TinyMCE specific overrides in your content_css.
      // content_css: '/myLayout.css' // or ['mycontent.css', 'mycontent2.css'], // It is usually desirable that TinyMCE’s editable area has the same styling as the surrounding content. Consistent styling is achieved with the content_css option, which enables you to extend external CSS into the editable area.
      // content_css_cors: false,
      content_style: 'div { margin: 10px; border: 5px solid red; padding: 3px; }',
      // inline_boundaries: true, // The inline_boundaries option allows you to disable the inline boundaries. For information on how to change the appearance of the inline boundaries see the Boilerplate Content CSS page: https://www.tiny.cloud/docs/advanced/boilerplate-content-css/
      // inline_boundaries_selector: 'a[href],code,.mce-annotation',
      // The textcolor component adds the forecolor/back color button controls that enables selecting colors from a color picker and applying them to text. It adds a toolbar button and menu item to allow this:
      // menu: {
      //   format: { title: "Format", items: "forecolor backcolor" }
      // },
      // toolbar: "forecolor backcolor"
      // +
      color_cols: "5", // This option allows for specifying the number of columns for text color grids. The number of rows is calculated based on the number of text colors supplied divided by the specified number of columns.
      // +
      color_map: [ // This option allows specifying a map of the text colors that will appear in the grid.
        '#BFEDD2', 'Light Green',
        '#FBEEB8', 'Light Yellow',
        '#F8CAC6', 'Light Red',
        '#ECCAFA', 'Light Purple',
        '#C2E0F4', 'Light Blue',

        '#2DC26B', 'Green',
        '#F1C40F', 'Yellow',
        '#E03E2D', 'Red',
        '#B96AD9', 'Purple',
        '#3598DB', 'Blue',

        '#169179', 'Dark Turquoise',
        '#E67E23', 'Orange',
        '#BA372A', 'Dark Red',
        '#843FA1', 'Dark Purple',
        '#236FA1', 'Dark Blue',

        '#ECF0F1', 'Light Gray',
        '#CED4D9', 'Medium Gray',
        '#95A5A6', 'Gray',
        '#7E8C8D', 'Dark Gray',
        '#34495E', 'Navy Blue',

        '#000000', 'Black',
        '#ffffff', 'White'
      ],
      // +
      custom_colors: true, // This option allows disabling the custom color picker in all color swatches of the editor.
      visual: true, // This true/false option gives you the ability to enable or disable the visual aid.
      // visual_anchor_class: 'my-custom-class',
      // visual_table_class: 'my-custom-class',

      // Content filtering options (These settings change the way the editor handles the input and output of content. This will help you to create clean, maintainable and readable content) https://www.tiny.cloud/docs/configure/content-filtering/
      allow_conditional_comments: false, // This option allows you to specify whether the editor should parse and keep conditional comments.
      // allow_html_in_named_anchor: false, // This option allows you to specify whether the editor should parse and keep html within named anchor tags.
      // allow_unsafe_link_target: false,
      // convert_fonts_to_spans: true,
      // custom_elements: 'div', // This option enables you to specify non-HTML elements for the editor.
      // doctype: '', // Set the doctype for the editing area.
      // element_format: 'xhtml', // This option controls whether elements are output in the HTML or XHTML mode. xhtml is the default state for this option. This means that for example <br /> will be <br> if you set this option to html. Possible Values: xhtml, html.
      // encoding: 'xml', // This option allows you to get XML escaped content out of TinyMCE. By setting this option to xml, posted content will be converted to an XML string escaping characters such as <, >, ", and & to <, >, ", and &. This option is disabled by default.
      // entities: '160,nbsp,162,cent,8364,euro,163,pound', // This option contains a comma-separated list of entity names that are used instead of characters. Odd items are the character code, and even items are the names of the character code.
      // entity_encoding: "raw", // Possible Values: 'named', 'numeric', 'raw'.
      // extended_valid_elements: 'img[class|src|border=0|alt|title|hspace|vspace|width|height|align|onmouseover|onmouseout|name]',
      // fix_list_elements: true, // This option enables you to specify that list elements (ul, ol) should be converted to valid XHTML. This option is disabled by default since it causes some glitches with a few browsers.
      // forced_root_block: 'p', // This option enables you to make sure that any non block elements or text nodes are wrapped in block elements. For example <strong>something</strong> will result in output like: <p><strong>something</strong></p>. This option is enabled by default as of version 3.0.
      // forced_root_block_attrs: {
      //   class: 'myclass',
      //   'data-something': 'my data'
      // },
      // invalid_elements: 'strong,em', // The invalid_elements option instructs the editor to remove specific elements when TinyMCE executes a cleanup. This option should contain a comma-separated list of element names to exclude from the content.
      // invalid_styles: 'color font-size',
      // or:
      // invalid_styles: {
      //   '*': 'color font-size', // Global invalid styles
      //   'a': 'background' // Link specific invalid styles
      // },
      // keep_styles: true, // The keep_styles option will keep the editor’s current text style when a user presses enter/return.
      // protect: [ // This configuration option enables you to control what contents should be protected from editing while it gets passed into the editor.
      //   /\<\/?(if|endif)\>/g,  // Protect <if> & </endif>
      //   /\<xsl\:[^>]+\>/g,  // Protect <xsl:...>
      //   /<\?php.*?\?>/g  // Protect php code
      // ],
      // remove_trailing_brs: false,
      // schema: 'html5', // Possible Values: html5, html4, html5-strict.
      // valid_children: '+body[style],-body[div],p[strong|a|#text]',
      // valid_classes: 'class1 class2 class3',
      // or:
      // valid_classes: {
      //   '*': 'class1 class2 class3', // Global classes
      //   'a': 'class4 class5' // Link specific classes
      // },
      // valid_elements: 'a[href|target=_blank],strong/b,div[align],br',
      // valid_styles: {
      //   '*': 'border,font-size',
      //   'div': 'width,height'
      // },

      // Content formatting options (These settings change the way the editor handles the input and output of content. This will help you to create clean, maintainable and readable content) https://www.tiny.cloud/docs/configure/content-formatting/
      // formats: {
      //   // Changes the default format for h1 to have a class of heading
      //   h1: { block: 'h1', classes: 'heading' },
      //   // Changes the default format for the bold button to produce a span with a bold class
      //   bold: { inline: 'span', classes: 'bold' },
      //   // A custom format that wraps blocks into a div with the specified wrapper class
      //   'custom-wrapper': { block: 'div', classes: 'wrapper', wrapper: true }
      // },
      // or:
      // formats: {
      //   // Changes the alignment buttons to add a class to each of the matching selector elements
      //   alignleft: { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes: 'left' },
      //   aligncenter: { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes: 'center' },
      //   alignright: { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes: 'right' },
      //   alignjustify: { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes: 'full' }
      // },
      // or:
      // formats: {
      //   // Changes the default format for the underline button to produce a span with a class and not merge that underline into parent spans
      //   underline: { inline: 'span', styles: { 'text-decoration': 'underline' }, exact: true },
      //   strikethrough: { inline: 'span', styles: { 'text-decoration': 'line-through' }, exact: true }
      // },
      // or:
      // extended_valid_elements: 'span[*]', // Needed to retain spans without attributes these are removed by default
      // formats: {
      //   removeformat: [
      //     // Configures `clear formatting` to remove specified elements regardless of it's attributes
      //     { selector: 'b,strong,em,i,font,u,strike', remove: 'all' },
      //
      //     // Configures `clear formatting` to remove the class red from spans and if the element then becomes empty i.e has no attributes it gets removed
      //     { selector: 'span', classes: 'red', remove: 'empty' },
      //
      //     // Configures `clear formatting` to remove the class green from spans and if the element then becomes empty it's left intact
      //     { selector: 'span', classes: 'green', remove: 'none' }
      //   ]
      // },
      // or:
      // formats: {
      //   removeformat: [
      //     {
      //       selector: 'h1,h2,h3,h4,h5,h6',
      //       remove: 'all',
      //       split: false,
      //       expand: false,
      //       block_expand: true,
      //       deep: true
      //     },
      //     {
      //       selector: 'a,b,strong,em,i,font,u,strike,sub,sup,dfn,code,samp,kbd,var,cite,mark,q,del,ins',
      //       remove: 'all',
      //       split: true,
      //       expand: false,
      //       deep: true
      //     },
      //     { selector: 'span', attributes: ['style', 'class'], remove: 'empty', split: true, expand: false, deep: true },
      //     { selector: '*', attributes: ['style', 'class'], split: false, expand: false, deep: true }
      //   ]
      // },
      // or:
      // formats: {
      //   alignleft: { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes: 'left' },
      //   aligncenter: { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes: 'center' },
      //   alignright: { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes: 'right' },
      //   alignjustify: { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes: 'full' },
      //   bold: { inline: 'span', classes: 'bold' },
      //   italic: { inline: 'span', classes: 'italic' },
      //   underline: { inline: 'span', classes: 'underline', exact: true },
      //   strikethrough: { inline: 'del' },
      //   forecolor: { inline: 'span', classes: 'forecolor', styles: { color: '%value' } },
      //   hilitecolor: { inline: 'span', classes: 'hilitecolor', styles: { backgroundColor: '%value' } },
      //   custom_format: { block: 'h1', attributes: { title: 'Header' }, styles: { color: 'red' } }
      // },
      // style_formats: [
      //   // Adds the h1 format defined above to style_formats
      //   { title: 'My heading', format: 'h1' },
      //   // Adds a h1 format to style_formats that applies a class of heading
      //   { title: 'My heading', block: 'h1', classes: 'heading' }
      // ],
      // indentation : '20pt',
      // indent_use_margin: true

      // Spelling options (TinyMCE spell checking) // https://www.tiny.cloud/docs/configure/spelling/
      // browser_spellcheck: false, // https://www.tiny.cloud/docs/enterprise/check-spelling/
      // gecko_spellcheck: true,

      // Image & file upload options (These settings affect TinyMCE's image and file upload capabilities) https://www.tiny.cloud/docs/configure/file-image-upload/
      automatic_uploads: true,
      // file_picker_callback: (callback, value, meta) => {
      //   // Provide file and text for the link dialog
      //   if (meta.filetype == 'file') {
      //     callback('mypage.html', {text: 'My text'});
      //   }
      //
      //   // Provide image and alt text for the image dialog
      //   if (meta.filetype == 'image') {
      //     callback('myimage.jpg', {alt: 'My alt text'});
      //   }
      //
      //   // Provide alternative source and posted for the media dialog
      //   if (meta.filetype == 'media') {
      //     callback('movie.mp4', {source2: 'alt.ogg', poster: 'image.jpg'});
      //   }
      // },
      file_picker_types: 'file image media', // This option enables you to specify what types of file pickers you need by a space or comma separated list of type names. There are currently three valid types: file, image and media. Possible Values: file, image, media.
      // images_dataimg_filter: (img) => {
      //   return img.hasAttribute('internal-blob');
      // },
      // images_reuse_filename: false,
      // images_upload_base_path: '/some/basepath',
      // images_upload_credentials: false,
      // images_upload_handler: (blobInfo, success, failure) => {
      //   var xhr, formData;
      //
      //   xhr = new XMLHttpRequest();
      //   xhr.withCredentials = false;
      //   xhr.open('POST', 'postAcceptor.php');
      //
      //   xhr.onload = function() {
      //     var json;
      //
      //     if (xhr.status != 200) {
      //       failure('HTTP Error: ' + xhr.status);
      //       return;
      //     }
      //
      //     json = JSON.parse(xhr.responseText);
      //
      //     if (!json || typeof json.location != 'string') {
      //       failure('Invalid JSON: ' + xhr.responseText);
      //       return;
      //     }
      //
      //     success(json.location);
      //   };
      //
      //   formData = new FormData();
      //   formData.append('file', blobInfo.blob(), blobInfo.filename());
      //
      //   xhr.send(formData);
      // },
      // images_upload_url: 'postAcceptor.php',

      // Localization options (These settings configure TinyMCE's language capabilities, including right-to-left support and language Localization) https://www.tiny.cloud/docs/configure/localization/
      // directionality: 'ltr', // Possible Values: 'ltr', 'rtl'
      // language: 'sv_SE', // For set new language see: https://www.tiny.cloud/docs/configure/localization/#language
      // language_url: '/languages/fi.js',

      // URL handling options (These settings affect the way URLs are handled by the editor) https://www.tiny.cloud/docs/configure/url-handling/
      // relative_urls : true, // This will convert all URLs within the same domain to relative URLs. The URLs will be relative from the document_base_url.
      // remove_script_host : true,
      // document_base_url : "http://www.example.com/path1/",
      // anchor_bottom: '#mybottom',
      // anchor_top: '#mytop',
      // allow_script_urls: true,
      // convert_urls: false,
      // urlconverter_callback: (url, node, on_save, name) => {
      //   // Do some custom URL conversion
      //   url = url.substring(3);
      //
      //   // Return new URL
      //   return url;
      // },

      // Advanced editing behaviors (Learn about some edge case editor behavior) https://www.tiny.cloud/docs/configure/advanced-editing-behavior/
      // br_in_pre: true,
      // custom_undo_redo_levels: 10, // Default Value: unlimited
      // end_container_on_empty_block: false,
      // object_resizing : false //or 'img',
      // resize_img_proportional: true,
      // typeahead_urls: true,
    };
  }
}
