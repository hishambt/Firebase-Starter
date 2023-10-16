import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, inject } from '@angular/core';
import { ControlContainer, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import ErrorMessages from './error-msgs';

@Component({
	template: '',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormProviderComponent<T> implements OnInit {
	@Input() label: string = '';
	@Input() controlKey: string = '';
	@Input() disabled: boolean = false;
	@Input() required: boolean = false;
	@Input() setValidators: Array<ValidatorFn> = [];
	group: string = '';
	parentContainer = inject(ControlContainer);
	cdr = inject(ChangeDetectorRef);
	readonly _destroy$ = new Subject<void>();

	ngOnInit(): void {
		if (!this.parentFormGroup) {
			return;
		}

		if (!this.group && (!this.label || !this.controlKey)) {
			console.error(`All inputs inside ${this.parentContainer.name ?? 'a form'} should have a label and controlKey inputs`);

			return;
		}

		if (this.required) {
			this.setValidators.push(Validators.required);
		}

		if (this.controlKey) {
			this.parentFormGroup.addControl(
				this.controlKey,
				new FormControl<string>(
					{ disabled: this.disabled, value: '' },
					{
						validators: this.setValidators,
						updateOn: 'change',
					},
				),
			);
		} else if (this.group) {
			this.parentFormGroup.addControl(this.group, new FormGroup({}, ...this.setValidators));
		}

		this.parentFormGroup.valueChanges.pipe(takeUntil(this._destroy$)).subscribe(() => {
			console.log(this.controlKey);
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

	ngOnDestroy(): void {
		if (this.parentFormGroup) {
			if (this.group) {
				this.parentFormGroup.removeControl(this.group);
			} else if (this.controlKey) {
				this.parentFormGroup.removeControl(this.controlKey);
			}
		}

		this._destroy$.next();
		this._destroy$.complete();
	}
}
export function getControlContainer(): [{ provide: typeof ControlContainer; useFactory: () => void | ControlContainer }] {
	return [
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
	];
}
