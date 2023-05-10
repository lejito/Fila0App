import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendientesComponent } from './pendientes.component';

describe('PendientesComponent', () => {
  let component: PendientesComponent;
  let fixture: ComponentFixture<PendientesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PendientesComponent]
    });
    fixture = TestBed.createComponent(PendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
