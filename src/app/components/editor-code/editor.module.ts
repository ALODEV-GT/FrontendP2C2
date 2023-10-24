import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorComponent } from './editor/editor.component';
import { CodeEditorModule } from '@ngstack/code-editor';

@NgModule({
  declarations: [
    EditorComponent
  ],
  imports: [
    CommonModule,
    CodeEditorModule.forRoot()
  ], exports: [
    EditorComponent
  ]
})
export class EditorModule { }
