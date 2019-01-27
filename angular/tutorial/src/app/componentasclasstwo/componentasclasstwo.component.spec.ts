import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentasclasstwoComponent } from './componentasclasstwo.component';

describe('ComponentasclasstwoComponent', () => {
  let component: ComponentasclasstwoComponent;
  let fixture: ComponentFixture<ComponentasclasstwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentasclasstwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentasclasstwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
