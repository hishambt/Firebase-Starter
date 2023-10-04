import { NgModule } from '@angular/core';

import { CoreLibModule } from 'lib';

import { SharedModule } from '../../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeViewComponent } from './home-view/home-view.component';

@NgModule({
	declarations: [HomeViewComponent],
	imports: [HomeRoutingModule, CoreLibModule, SharedModule],
	exports: [],
	providers: [],
})
export class HomeModule { }
