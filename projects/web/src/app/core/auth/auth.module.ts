import { NgModule } from '@angular/core';

import { SSEmailComponent } from 'softside-ui/lib/components/inputs/email';
import { SSPasswordComponent } from 'softside-ui/lib/components/inputs/password';
import { SSConfirmPasswordComponent } from 'softside-ui/lib/components/composed/confirm-password';

import { SharedModule } from '../../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { AuthShellComponent } from './auth-shell/auth-shell.component';

@NgModule({
	declarations: [
		AuthShellComponent,
		LoginComponent,
		RegisterComponent,
		ForgetPasswordComponent,
		VerifyEmailComponent,
	],
	imports: [
		SharedModule,
		AuthRoutingModule,
		SSEmailComponent,
		SSPasswordComponent,
		SSConfirmPasswordComponent,
	],
	providers: [],
})
export class AuthModule { }
