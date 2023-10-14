import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, inject } from '@angular/core';
import { ControlContainer, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';

import ErrorMessages from '../_utils/error-msgs';

@Component({
	selector: 'ss-textarea',
	template: `
		<ion-textarea
			[label]="label"
			labelPlacement="floating"
			fill="solid"
			[placeholder]="placeholder"
			[maxlength]="maxlength"
			[autoGrow]="true"
			[errorText]="getError"
			[formControlName]="controlKey"
			[name]="controlKey"
		></ion-textarea>
	`,
	standalone: true,
	imports: [IonicModule, ReactiveFormsModule],
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
export class SSTextareaComponent {
	@Input({ required: true }) label: string = '';
	@Input({ required: true }) controlKey: string = '';
	@Input() maxlength: string = '50';
	@Input() placeholder: string = 'Enter value here';
	@Input() setValidators: Array<ValidatorFn> = [];
	@Input() disabled: boolean = false;
	@Input() required: boolean = false;
	parentContainer = inject(ControlContainer);
	cdr = inject(ChangeDetectorRef);

	private readonly _destroy$ = new Subject<void>();

	ngOnInit(): void {
		if (!this.parentFormGroup) {
			return;
		}

		if (this.required) {
			this.setValidators.push(Validators.required);
		}

		this.parentFormGroup.addControl(this.controlKey, new FormControl<string>({ disabled: this.disabled, value: '' }, this.setValidators));

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

		return ErrorMessages.getError(this.parentFormGroup.get(this.controlKey) as FormControl<string>, this.label);
	}

	ngOnDestroy(): void {
		if (this.parentFormGroup) {
			this.parentFormGroup.removeControl(this.controlKey);
		}

		this._destroy$.next();
		this._destroy$.complete();
	}
}
