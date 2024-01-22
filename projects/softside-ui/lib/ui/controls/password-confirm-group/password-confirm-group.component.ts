import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, ValidatorFn } from '@angular/forms';
import { NgIf } from '@angular/common';

import { passwordMatchValidator } from '../_utils/confirmed.validator';
import { SSPasswordComponent, SSConfirmPasswordComponent } from '../public-api';
import { FormProviderBaseComponent } from '../_utils/form-provider';

@Component({
	selector: 'ss-password-confirm-group',
	template: `
		<ng-container [formGroup]="parentFormGroup">
			<div [formGroupName]="groupName">
				<ss-password [directParentGroup]="directParentGroup"></ss-password>
				<ss-confirm-password [directParentGroup]="directParentGroup"></ss-confirm-password>
			</div>
		</ng-container>
	`,
	standalone: true,
	imports: [NgIf, SSPasswordComponent, SSConfirmPasswordComponent, ReactiveFormsModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SSPasswordConfirmGroupComponent extends FormProviderBaseComponent implements OnInit {
	override setValidators: ValidatorFn[] = [passwordMatchValidator('password', 'confirmPassword')];
}
