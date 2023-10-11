import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, ViewChild, inject, signal } from '@angular/core';
import { ControlContainer, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn } from '@angular/forms';
import { IonInput, IonicModule } from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';
import { NgIf } from '@angular/common';

import ErrorMessages from '../_utils/error-msgs';

@Component({
	selector: 'ss-input',
	template: `
		<ion-item lines="none">
			<ion-input
				[label]="label"
				labelPlacement="floating"
				[counter]="counter"
				[maxlength]="maxlength"
				[minlength]="minlength"
				fill="solid"
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
	`,
	standalone: true,
	styles: [''],
	imports: [IonicModule, ReactiveFormsModule, NgIf],
	changeDetection: ChangeDetectionStrategy.OnPush,
	viewProviders: [
		{
			provide: ControlContainer,
			useFactory: (): ControlContainer | void => {
				try {
					return inject(ControlContainer, { skipSelf: true });
				} catch (e) {
					console.error();
				}
			},
		},
	],
})
export class SSInputComponent<T> implements AfterViewInit, OnDestroy {
	@Input({ required: true }) label: string = '';
	@Input({ required: true }) type: string = 'text';
	@Input({ required: true }) controlKey: string = '';
	@Input() maxlength: string = '50';
	@Input() minlength: string = '1';
	@Input() autocomplete: boolean = false;
	@Input() counter: boolean = true;
	@Input() clearInput: boolean = true;
	@Input() clearOnEdit: boolean = false;
	@Input() placeholder: string = 'Enter value here';
	@Input({ required: true }) defaultValue!: T;
	@Input() setValidators: Array<ValidatorFn> = [];
	@Input() hideshow: boolean = false;
	parentContainer = inject(ControlContainer);
	cdr = inject(ChangeDetectorRef);
	showPassword = signal(false);
	show = signal(false);
	@ViewChild(IonInput) input!: IonInput;

	private readonly _destroy$ = new Subject<void>();

	ngOnInit(): void {
		if (!this.parentFormGroup) {
			return;
		}

		this.parentFormGroup.addControl(this.controlKey, new FormControl<T>(this.defaultValue, this.setValidators));
		this.parentFormGroup.valueChanges.pipe(takeUntil(this._destroy$)).subscribe(() => {
			this.cdr.detectChanges();
		});
	}

	get parentFormGroup(): FormGroup | void {
		if (!this.parentContainer) {
			return;
		}

		return this.parentContainer.control as FormGroup;
	}

	get getError(): string {
		if (!this.parentFormGroup) {
			return '';
		}

		return ErrorMessages.getError(this.parentFormGroup.get(this.controlKey) as FormControl<T>, this.label);
	}

	ngAfterViewInit(): void {
		if (this.input.clearInput) {
			this.input.ionInput.pipe(takeUntil(this._destroy$)).subscribe(() => this.onChange());
			this.input.getInputElement().then((element: HTMLInputElement) => {
				element.parentElement?.querySelector('button')?.addEventListener('click', () => this.onChange());
			});
		}
	}

	onChange(): void {
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

	ngOnDestroy(): void {
		if (this.parentFormGroup) {
			this.parentFormGroup.removeControl(this.controlKey);
		}

		this._destroy$.next();
		this._destroy$.complete();

		if (!this.input.clearInput) {
			return;
		}

		if (this.input) {
			this.input.getInputElement().then((element: HTMLInputElement) => {
				element.parentElement?.querySelector('button')?.removeEventListener('click', () => this.onChange());
			});
		}
	}
}
