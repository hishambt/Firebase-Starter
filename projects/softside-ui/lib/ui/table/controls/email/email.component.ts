import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { SSInputComponent } from '../_input/_input.component';

@Component({
	selector: 'ss-email',
	template: `<ss-input></ss-input>`,
	standalone: true,
	styles: [''],
	imports: [IonicModule, SSInputComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SSEmailComponent {}
