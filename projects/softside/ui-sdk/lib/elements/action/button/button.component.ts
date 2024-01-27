import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { AsyncRefDirective } from '@softside/ui-sdk/lib/shared';

@Component({
	selector: 'ss-button',
	template: `
		<ion-button
			[expand]="expand"
			[fill]="fill"
			[shape]="shape"
			[size]="size"
			[disabled]="disabled"
			[strong]="strong"
			[type]="type"
			[appAsyncRef]="loading"
			(click)="Click.emit($event)"
		>
			<ion-icon
				[size]="iconSize"
				[slot]="slot"
				[name]="iconName"
			></ion-icon>
			<ion-label>{{ label }}</ion-label>
		</ion-button>
	`,
	standalone: true,
	imports: [IonicModule, AsyncRefDirective],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SSButtonComponent {
	@Input() expand: 'full' | 'block' = 'full';
	@Input() fill: 'clear' | 'default' | 'outline' | 'solid' | undefined = 'solid';
	@Input() shape: 'round' | undefined = undefined;
	@Input() size: 'small' | 'default' | 'large' = 'default';
	@Input() type: 'button' | 'reset' | 'submit' = 'button';
	@Input() disabled: boolean = false;
	@Input() strong: boolean = false;
	@Input() iconSize: 'small' | 'large' | '' = 'small';
	@Input() slot: 'start' | 'end' | 'top' | 'bottom' | 'icon-only' | '' = 'start';
	@Input() iconName: string = '';
	@Input() label: string = '';
	@Input() loading: Subscription | null = null;

	@Output() Click = new EventEmitter<Event>();
}
