import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroTurnosComponent } from './registro-turnos.component';

describe('RegistroTurnosComponent', () => {
  let component: RegistroTurnosComponent;
  let fixture: ComponentFixture<RegistroTurnosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroTurnosComponent]
    });
    fixture = TestBed.createComponent(RegistroTurnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
