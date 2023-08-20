import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShellLoadingBarComponent } from './shell-loading-bar.component';

describe('ShellLoadingBarComponent', () => {
  let component: ShellLoadingBarComponent;
  let fixture: ComponentFixture<ShellLoadingBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShellLoadingBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShellLoadingBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
