import { Component } from '@angular/core';
import { CodeModel } from "@ngstack/code-editor";
import { Parser } from 'src/app/parser/parser';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent {
  theme = 'vs-dark';
  result = '';

  codeModel: CodeModel = {
    language: 'java',
    uri: 'Main.java',
    value: ''
  };

  options = {
    contextmenu: true,
    minimap: {
      enabled: true
    },
    fontSize: 15
  };

  onCompile() {
    let par = new Parser(this.codeModel.value)
    par.parse()
  }

  ngOnInit(): void {
  }
}
