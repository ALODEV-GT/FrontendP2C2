import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-body',
  templateUrl: './dialog-body.component.html',
  styleUrls: ['./dialog-body.component.css']
})
export class DialogBodyComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {

  }

  isPackage: boolean = this.data.isPackage
  name: string = "";

  retonarResultado(closed: boolean) {
    return { name: this.name, isPackage: this.isPackage, closed: closed }
  }

}


