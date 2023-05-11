import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanceladosComponent } from './cancelados.component';

describe('CanceladosComponent', () => {
  let component: CanceladosComponent;
  let fixture: ComponentFixture<CanceladosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CanceladosComponent]
    });
    fixture = TestBed.createComponent(CanceladosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
