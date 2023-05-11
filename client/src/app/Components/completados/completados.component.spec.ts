import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletadosComponent } from './completados.component';

describe('CompletadosComponent', () => {
  let component: CompletadosComponent;
  let fixture: ComponentFixture<CompletadosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompletadosComponent]
    });
    fixture = TestBed.createComponent(CompletadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
