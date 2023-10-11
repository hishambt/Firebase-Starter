import { NgModule } from '@angular/core';
import { ImageCropperModule } from 'ngx-image-cropper';

import {
	SSEmailComponent,
	SSPasswordConfirmGroupComponent,
} from 'softside-ui/lib/ui/controls';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
	declarations: [
		ProfileViewComponent,
	],
	imports: [
		SharedModule,
		ProfileRoutingModule,
		ImageCropperModule,
		SSEmailComponent,
		SSPasswordConfirmGroupComponent,
	],
})
export class ProfileModule {}
