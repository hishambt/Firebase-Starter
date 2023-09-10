import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgLetModule } from 'ng-let';
import { BreadcrumbComponent } from './components/page-header/breadcrumb/breadcrumb.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { FormActionBarComponent } from './components/form-action-bar/form-action-bar.component';
import { GoogleBtnComponent } from './components/google-btn/google-btn.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
	declarations: [BreadcrumbComponent, PageHeaderComponent, FormActionBarComponent, GoogleBtnComponent],
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
	],
	providers: [],
})
export class SharedModule {}