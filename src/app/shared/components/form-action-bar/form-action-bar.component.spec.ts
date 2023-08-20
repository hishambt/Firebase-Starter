import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormActionBarComponent } from './form-action-bar.component';

describe('FormActionBarComponent', () => {
  let component: FormActionBarComponent;
  let fixture: ComponentFixture<FormActionBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormActionBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormActionBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
