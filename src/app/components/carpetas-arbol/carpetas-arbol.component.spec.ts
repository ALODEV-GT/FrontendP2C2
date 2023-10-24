import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarpetasArbolComponent } from './carpetas-arbol.component';

describe('CarpetasArbolComponent', () => {
  let component: CarpetasArbolComponent;
  let fixture: ComponentFixture<CarpetasArbolComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarpetasArbolComponent]
    });
    fixture = TestBed.createComponent(CarpetasArbolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
