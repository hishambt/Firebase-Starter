import { ChangeDetectionStrategy, Component, EventEmitter, Output, input } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgIf } from '@angular/common';
import { IonButton, IonIcon, IonLabel } from '@ionic/angular/standalone';

import { AsyncRefDirective } from '@softside/ui-sdk/lib/shared';

@Component({
	selector: 'ss-button',
	template: `
		<ion-button
			[expand]="expand()"
			[fill]="fill()"
			[shape]="shape()"
			[size]="size()"
			[disabled]="disabled()"
			[strong]="strong()"
			[type]="type()"
			[appAsyncRef]="loading()"
			(click)="clickOutput.emit($event)"
		>
			<ng-container *ngIf="prefixIconName()">
				<ng-container *ngTemplateOutlet="icon; context: { size: iconSize(), slot: 'start', name: prefixIconName() }"></ng-container>
			</ng-container>
			<ion-label>{{ label() }}</ion-label>
			<ng-container *ngIf="suffixIconName()">
				<ng-container *ngTemplateOutlet="icon; context: { size: iconSize(), slot: 'end', name: suffixIconName() }"></ng-container>
			</ng-container>
		</ion-button>

		<ng-template
			#icon
			let-size="size"
			let-slot="slot"
			let-name="name"
		>
			<ion-icon
				[size]="size"
				[slot]="slot"
				[name]="name"
			></ion-icon>
		</ng-template>
	`,
	standalone: true,
	imports: [NgIf, IonIcon, IonLabel, IonButton, AsyncRefDirective],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SSButtonComponent {
	expand = input<'full' | 'block'>('full');
	fill = input<'clear' | 'default' | 'outline' | 'solid'>('solid');
	shape = input<'round' | undefined>(undefined);
	size = input<'small' | 'default' | 'large'>('default');
	type = input<'button' | 'reset' | 'submit'>('button');
	disabled = input<boolean>(false);
	strong = input<boolean>(false);
	iconSize = input<'small' | 'large' | ''>('small');
	prefixIconName = input<string>('');
	suffixIconName = input<string>('');
	label = input<string>('');
	loading = input<Subscription | null>(null);

	@Output() clickOutput = new EventEmitter<Event>();
}
