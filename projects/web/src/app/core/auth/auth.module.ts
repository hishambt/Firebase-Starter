import { NgModule } from '@angular/core';
import {
	IonButton,
	IonButtons,
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonCardTitle,
	IonCol,
	IonContent,
	IonRouterOutlet,
	IonRow,
	IonText,
} from '@ionic/angular/standalone';

import { SSEmailComponent } from '@softside/ui-sdk/lib/components/inputs/email';
import { SSPasswordComponent } from '@softside/ui-sdk/lib/components/inputs/password';
import { SSConfirmPasswordComponent } from '@softside/ui-sdk/lib/components/composed/confirm-password';
import { SSButtonComponent } from '@softside/ui-sdk/lib/elements';

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
		SSButtonComponent,
		IonRouterOutlet,
		IonContent,
		IonCard,
		IonCardHeader,
		IonCardTitle,
		IonCardContent,
		IonRow,
		IonCol,
		IonButton,
		IonButtons,
		IonText,
	],
	providers: [],
})
export class AuthModule {}
