import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, ValidatorFn, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import ErrorMessages from './error-msgs';

@Component({
	template: '',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormProviderComponent implements OnInit {
	@Input() label: string = '';
	@Input() controlKey: string = '';
	@Input() disabled: boolean = false;
	@Input() required: boolean = false;
	@Input() setValidators: Array<ValidatorFn> = [];
	@Input() directParentGroup: FormGroup | null = null;
	@Input() groupName: string = '';
	currentFormGroup!: FormGroup;
	cdr = inject(ChangeDetectorRef);
	readonly _destroy$ = new Subject<void>();
	protected formGroupDirective = inject(FormGroupDirective);

	ngOnInit(): void {
		if (!this.parentFormGroup) {
			return;
		}

		// Provide direct parent group component which extends this class with the instance of direct parent group
		// In this case, there's no directParentGroup input coming. Instead, we provide it, so in return it provides it to the child input
		if (this.groupName) {
			this.directParentGroup = this.parentFormGroup.get(this.groupName) as FormGroup;
		}

		this.currentFormGroup = this.directParentGroup ? this.directParentGroup : this.parentFormGroup;

		if (!this.groupName && (!this.label || !this.controlKey)) {
			console.error(`All inputs inside ${this.formGroupDirective.name ?? 'a form'} should have a label and controlKey inputs`);

			return;
		}

		if (this.required) {
			this.setValidators.push(Validators.required);
		}

		if (this.controlKey) {
			if (this.currentFormGroup.get(this.controlKey)) {
				this.currentFormGroup.controls[this.controlKey].setValidators(this.setValidators);

				if (this.disabled) {
					this.currentFormGroup.controls[this.controlKey].disable();
				} else {
					this.currentFormGroup.controls[this.controlKey].enable();
				}
			} else {
				console.error(this.controlKey + ' appears in HTML but is missing from the TS file');
			}
		} else if (this.directParentGroup) {
			this.directParentGroup.setValidators(this.setValidators);
		}

		if (!this.groupName) {
			this.currentFormGroup.controls[this.controlKey].valueChanges.pipe(takeUntil(this._destroy$)).subscribe(() => {
				this.cdr.detectChanges();
			});
		}
	}

	get parentFormGroup(): FormGroup {
		if (!this.formGroupDirective) {
			return new FormGroup([]);
		}

		return this.formGroupDirective.control as FormGroup;
	}

	get getError(): string {
		if (!this.parentFormGroup) {
			return '';
		}

		return ErrorMessages.getError(this.currentFormGroup.get(this.controlKey) as FormControl, this.label);
	}

	ngOnDestroy(): void {
		if (this.currentFormGroup) {
			if (this.controlKey) {
				this.currentFormGroup.reset();
			}
		}

		this._destroy$.next();
		this._destroy$.complete();
	}
}
