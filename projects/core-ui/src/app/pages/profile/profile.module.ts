import { NgModule } from '@angular/core';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
	declarations: [ProfileViewComponent],
	imports: [SharedModule, ProfileRoutingModule],
})
export class ProfileModule {}
