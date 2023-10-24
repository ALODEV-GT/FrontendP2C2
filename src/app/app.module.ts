import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditorModule } from './components/editor-code/editor.module';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { MainComponent } from './pages/main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { CarpetasArbolComponent } from './components/carpetas-arbol/carpetas-arbol.component';
import { DialogBodyComponent } from './components/dialog-body/dialog-body.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
    MainComponent,
    CarpetasArbolComponent,
    DialogBodyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    EditorModule,
    NgbModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
