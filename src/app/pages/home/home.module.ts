import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeViewComponent } from './home-view/home-view.component';

@NgModule({
	declarations: [HomeViewComponent],
	imports: [HomeRoutingModule, SharedModule],
	exports: [],
	providers: []
})
export class HomeModule {}
