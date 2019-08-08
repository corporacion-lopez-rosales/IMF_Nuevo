import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaparcelaComponent } from './creaparcela.component';

describe('CreaparcelaComponent', () => {
  let component: CreaparcelaComponent;
  let fixture: ComponentFixture<CreaparcelaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreaparcelaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreaparcelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
