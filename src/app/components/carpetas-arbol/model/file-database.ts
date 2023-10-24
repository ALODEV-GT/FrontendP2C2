import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FoodNode } from '../carpetas-arbol.component';

@Injectable()
export class FileDatabase {
  dataChange = new BehaviorSubject<FoodNode[]>([]);

  get data(): FoodNode[] {
    return this.dataChange.value;
  }

}
