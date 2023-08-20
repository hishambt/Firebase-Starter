import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersDropdownComponent } from './customers-dropdown.component';

describe('CustomersDropdownComponent', () => {
  let component: CustomersDropdownComponent;
  let fixture: ComponentFixture<CustomersDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomersDropdownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomersDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
