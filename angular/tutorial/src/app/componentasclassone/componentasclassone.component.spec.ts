import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentasclassoneComponent } from './componentasclassone.component';

describe('ComponentasclassoneComponent', () => {
  let component: ComponentasclassoneComponent;
  let fixture: ComponentFixture<ComponentasclassoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentasclassoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentasclassoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
