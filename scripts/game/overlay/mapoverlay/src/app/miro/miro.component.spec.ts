/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MiroComponent } from './miro.component';

describe('MiroComponent', () => {
  let component: MiroComponent;
  let fixture: ComponentFixture<MiroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
