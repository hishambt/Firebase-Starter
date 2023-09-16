import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgLetModule } from 'ng-let';
import { IonicModule } from '@ionic/angular';

import { BreadcrumbComponent } from './components/page-header/breadcrumb/breadcrumb.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { FormActionBarComponent } from './components/form-action-bar/form-action-bar.component';
import { AsyncRefDirective } from './directives/async-ref.directive';
import { ShowHidePasswordComponent } from './components/show-hide-password/show-hide-password.component';

@NgModule({
	declarations: [BreadcrumbComponent, PageHeaderComponent, FormActionBarComponent, AsyncRefDirective, ShowHidePasswordComponent],
	imports: [CommonModule, RouterModule, ReactiveFormsModule, NgLetModule, IonicModule],
	exports: [
		CommonModule,
		RouterModule,
		ReactiveFormsModule,
		NgLetModule,
		BreadcrumbComponent,
		PageHeaderComponent,
		FormActionBarComponent,
		IonicModule,
		AsyncRefDirective,
		ShowHidePasswordComponent,
	],
	providers: [],
})
export class SharedModule {}
