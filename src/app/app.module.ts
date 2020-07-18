import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { DashboardModule } from './dashboard/dashboard.module';

import { AppComponent } from './app.component';
import { MenuComponent } from './shared/components';
import { ToolbarComponent } from './shared/components/toolbar/toolbar.component';
import { BookModule } from './book/book.module';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

// import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogsModule } from './dialogs/dialogs.module';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ToolbarComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    DashboardModule,
    BookModule,
    DialogsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule
  ],
  // exports: [MaterialModule],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {}
