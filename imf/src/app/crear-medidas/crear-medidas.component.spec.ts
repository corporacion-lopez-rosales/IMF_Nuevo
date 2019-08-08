import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearMedidasComponent } from './crear-medidas.component';

describe('CrearMedidasComponent', () => {
  let component: CrearMedidasComponent;
  let fixture: ComponentFixture<CrearMedidasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearMedidasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearMedidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
