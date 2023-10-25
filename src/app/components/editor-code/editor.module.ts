import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorComponent } from './editor/editor.component';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EditorComponent
  ],
  imports: [
    CommonModule,
    CodemirrorModule,
    FormsModule
  ], exports: [
    EditorComponent
  ]
})
export class EditorModule { }
