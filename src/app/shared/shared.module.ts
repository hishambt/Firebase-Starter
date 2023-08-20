import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from './modules/material.module';
import { BreadcrumbComponent } from './components/page-header/breadcrumb/breadcrumb.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { FormActionBarComponent } from './components/form-action-bar/form-action-bar.component';
import { GoogleBtnComponent } from './components/google-btn/google-btn.component';

@NgModule({
	declarations: [
		BreadcrumbComponent,
		PageHeaderComponent,
		FormActionBarComponent,
  	GoogleBtnComponent
	],
	imports: [
		CommonModule,
		RouterModule,
		ReactiveFormsModule,
		MaterialModule,
	],
	exports: [
		CommonModule,
		RouterModule,
		ReactiveFormsModule,
		MaterialModule,
		BreadcrumbComponent,
		PageHeaderComponent,
		FormActionBarComponent,
		GoogleBtnComponent
	],
	providers: []
})
export class SharedModule {}
