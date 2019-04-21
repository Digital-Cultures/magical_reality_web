import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalkportalComponent } from './walkportal.component';

describe('WalkportalComponent', () => {
  let component: WalkportalComponent;
  let fixture: ComponentFixture<WalkportalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalkportalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalkportalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
