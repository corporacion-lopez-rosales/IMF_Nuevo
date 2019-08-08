import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedidasTabComponent } from './medidas-tab.component';

describe('MedidasTabComponent', () => {
  let component: MedidasTabComponent;
  let fixture: ComponentFixture<MedidasTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedidasTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedidasTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
