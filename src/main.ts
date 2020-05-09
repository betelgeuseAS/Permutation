import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import 'hammerjs';

// Froala Editor:
import 'node_modules/froala-editor/js/froala_editor.min';
import 'node_modules/froala-editor/js/froala_editor.pkgd.min';
import 'node_modules/froala-editor/js/plugins/align.min'; // Align Plugin
import 'node_modules/froala-editor/js/plugins/char_counter.min'; // Char Counter Plugin
import 'node_modules/froala-editor/js/plugins/code_beautifier.min'; // Code Beautifier Plugin
import 'node_modules/froala-editor/js/plugins/code_view.min'; // Code View Plugin
import 'node_modules/froala-editor/js/plugins/colors.min'; // Colors Plugin
import 'node_modules/froala-editor/js/plugins/draggable.min'; // Draggable Plugin
import 'node_modules/froala-editor/js/third_party/embedly.min'; // Embedly Plugin
import 'node_modules/froala-editor/js/plugins/emoticons.min'; // Emoticons Plugin
import 'node_modules/froala-editor/js/plugins/entities.min'; // Entities Plugin
import 'node_modules/froala-editor/js/plugins/file.min'; // File Plugin
import 'node_modules/froala-editor/js/third_party/font_awesome.min'; // Font Awesome Plugin
import 'node_modules/froala-editor/js/plugins/font_family.min'; // Font Plugin
import 'node_modules/froala-editor/js/plugins/font_size.min'; // Font Size Plugin
import 'node_modules/froala-editor/js/plugins/fullscreen.min'; // Fullscreen Plugin
import 'node_modules/froala-editor/js/plugins/help.min'; // Help Plugin
import 'node_modules/froala-editor/js/plugins/image.min'; // Image Plugin
import 'node_modules/froala-editor/js/plugins/image_manager.min'; // Image Manager Plugin
import 'node_modules/froala-editor/js/third_party/image_tui.min'; // Image Tui Plugin
import 'node_modules/froala-editor/js/plugins/inline_class.min'; // Inline Class Plugin
import 'node_modules/froala-editor/js/plugins/inline_style.min'; // Inline Style Plugin
import 'node_modules/froala-editor/js/plugins/line_breaker.min'; // Line Breaker Plugin
import 'node_modules/froala-editor/js/plugins/line_height.min'; // Line Height Plugin
import 'node_modules/froala-editor/js/plugins/link.min'; // Link Plugin
import 'node_modules/froala-editor/js/plugins/lists.min'; // Lists Plugin
import 'node_modules/froala-editor/js/plugins/paragraph_format.min'; // Paragraph Format Plugin
import 'node_modules/froala-editor/js/plugins/paragraph_style.min'; // Paragraph Style Plugin
import 'node_modules/froala-editor/js/plugins/print.min'; // Print Plugin
import 'node_modules/froala-editor/js/plugins/quick_insert.min'; // Quick Insert Plugin
import 'node_modules/froala-editor/js/plugins/quote.min'; // Quote Plugin
import 'node_modules/froala-editor/js/plugins/save.min'; // Save Plugin
import 'node_modules/froala-editor/js/plugins/special_characters.min'; // Special Characters Plugin
import 'node_modules/froala-editor/js/third_party/spell_checker.min'; // Spell Checker Plugin
import 'node_modules/froala-editor/js/plugins/table.min'; // Table Plugin
import 'node_modules/froala-editor/js/plugins/url.min'; // Url Plugin
import 'node_modules/froala-editor/js/plugins/video.min'; // Video Plugin
import 'node_modules/froala-editor/js/plugins/word_paste.min'; // Word Paste Plugin

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
