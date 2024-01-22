import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, ValidatorFn } from '@angular/forms';
import { NgIf } from '@angular/common';
import { SSPasswordComponent } from 'softside-ui/lib/components/inputs/password';
import { SSConfirmPasswordComponent as SSConfirmPasswordInputComponent } from 'softside-ui/lib/components/inputs/confirm-password';
import { FormProviderBaseComponent, passwordMatchValidator } from 'softside-ui/lib/_utils';

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
	imports: [NgIf, SSPasswordComponent, SSConfirmPasswordInputComponent, ReactiveFormsModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SSConfirmPasswordComponent extends FormProviderBaseComponent implements OnInit {
	override setValidators: ValidatorFn[] = [passwordMatchValidator('password', 'confirmPassword')];
}
