import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddresBookComponent } from './addres-book.component';

describe('AddresBookComponent', () => {
  let component: AddresBookComponent;
  let fixture: ComponentFixture<AddresBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddresBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddresBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
