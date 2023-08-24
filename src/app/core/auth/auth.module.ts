import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';

@NgModule({
	declarations: [LoginComponent, RegisterComponent, ForgetPasswordComponent],
	imports: [SharedModule, AuthRoutingModule],
	providers: []
})
export class AuthModule {}
