import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateParcelaComponent } from './update-parcela.component';

describe('UpdateParcelaComponent', () => {
  let component: UpdateParcelaComponent;
  let fixture: ComponentFixture<UpdateParcelaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateParcelaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateParcelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
