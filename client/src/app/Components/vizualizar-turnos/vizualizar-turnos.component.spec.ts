import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VizualizarTurnosComponent } from './vizualizar-turnos.component';

describe('VizualizarTurnosComponent', () => {
  let component: VizualizarTurnosComponent;
  let fixture: ComponentFixture<VizualizarTurnosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VizualizarTurnosComponent]
    });
    fixture = TestBed.createComponent(VizualizarTurnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
