import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgLetModule } from 'ng-let';
import { IonicModule } from '@ionic/angular';

import { BreadcrumbComponent } from './components/page-header/breadcrumb/breadcrumb.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { FormActionBarComponent } from './components/form-action-bar/form-action-bar.component';
import { GoogleBtnComponent } from './components/google-btn/google-btn.component';
import { AsyncRefDirective } from './directives/async-ref.directive';

@NgModule({
	declarations: [BreadcrumbComponent, PageHeaderComponent, FormActionBarComponent, GoogleBtnComponent, AsyncRefDirective],
	imports: [CommonModule, RouterModule, ReactiveFormsModule, NgLetModule, IonicModule],
	exports: [
		CommonModule,
		RouterModule,
		ReactiveFormsModule,
		NgLetModule,
		BreadcrumbComponent,
		PageHeaderComponent,
		FormActionBarComponent,
		GoogleBtnComponent,
		IonicModule,
		AsyncRefDirective,
	],
	providers: [],
})
export class SharedModule {}
