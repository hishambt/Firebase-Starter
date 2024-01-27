import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnDestroy, ViewChild, signal } from '@angular/core';
import { IonInput, IonicModule } from '@ionic/angular';
import { takeUntil } from 'rxjs';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FormProviderBaseComponent } from '@softside/ui-sdk/lib/_utils';

@Component({
	selector: 'ss-input',
	template: `
		<ng-container [formGroup]="currentFormGroup">
			<ion-item lines="none">
				<ion-input
					[label]="label"
					labelPlacement="floating"
					[counter]="counter"
					[maxlength]="maxlength"
					[minlength]="minlength"
					fill="solid"
					[required]="required"
					[autocomplete]="autocomplete"
					[placeholder]="placeholder"
					[type]="type"
					[clearInput]="clearInput"
					[clearOnEdit]="clearOnEdit"
					[errorText]="getError"
					[formControlName]="controlKey"
					[name]="controlKey"
				></ion-input>
				<div
					*ngIf="hideshow"
					[class.!right-[2rem]]="show()"
					class="ion-no-padding h-6 transition-all ease-in-out duration-[50ms] z-10 cursor-pointer absolute right-0"
					(click)="toggleShow()"
					(keydown)="onKeyDown($event)"
				>
					<ion-icon
						tabindex="0"
						class="me-1 w-7 text-lg block"
						[style.color]="'var(--ion-color-step-600, #666)'"
						size="medium"
						[name]="showPassword() ? 'eye-outline' : 'eye-off-outline'"
					></ion-icon>
				</div>
			</ion-item>
		</ng-container>
	`,
	imports: [NgIf, IonicModule, ReactiveFormsModule],
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SSInputComponent extends FormProviderBaseComponent implements AfterViewInit, OnDestroy {
	@Input({ required: true }) type: string = 'text';
	@Input() maxlength: string = '50';
	@Input() minlength: string = '1';
	@Input() autocomplete: boolean = false;
	@Input() counter: boolean = true;
	@Input() clearInput: boolean = true;
	@Input() clearOnEdit: boolean = false;
	@Input() placeholder: string = 'Enter value here';
	@Input() hideshow: boolean = false;
	showPassword = signal(false);
	show = signal(false);
	@ViewChild(IonInput) input!: IonInput;

	ngAfterViewInit(): void {
		if (this.input.clearInput) {
			this.input.ionInput.pipe(takeUntil(this._destroy$)).subscribe(() => this.onChange());
			this.input.getInputElement().then((element: HTMLInputElement) => {
				element.parentElement?.querySelector('button')?.addEventListener('click', () => this.onChange());
			});
		}
	}

	onChange(): void {
		this.input.getInputElement().then((element: HTMLInputElement) => {
			element.blur();
			element.focus();
		});

		if (this.input.value) {
			this.input.getInputElement().then((element: HTMLInputElement) => {
				element.classList.add('!w-[70%]', '!flex-none');
				element.parentElement?.querySelector('button')?.classList.add('absolute', 'right-0', 'top-[4px]');
			});

			this.show.set(true);
		} else {
			this.input.getInputElement().then((element: HTMLInputElement) => {
				element.classList.remove('!w-[70%]', '!flex-none');
			});

			this.show.set(false);
		}
	}

	onKeyDown(event: KeyboardEvent): void {
		if (event.code == 'Space') {
			this.toggleShow();
		}
	}

	toggleShow(): void {
		this.showPassword.set(!this.showPassword());
		this.input.type = this.showPassword() ? 'text' : 'password';
	}

	override ngOnDestroy(): void {
		if (!this.input.clearInput) {
			return;
		}

		if (this.input) {
			this.input.getInputElement().then((element: HTMLInputElement) => {
				element.parentElement?.querySelector('button')?.removeEventListener('click', () => this.onChange());
			});
		}

		super.ngOnDestroy();
	}
}
