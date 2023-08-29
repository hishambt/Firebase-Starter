import { NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { verifyGuard } from '../guards/auth.guard';

const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);

const redirectUnauthorizedToLogin = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
	return redirectUnauthorizedTo(`/auth/login?returnUrl=${state.url}`);
}

const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
    {
        path: 'login',
        component: LoginComponent,
				...canActivate(redirectLoggedInToHome)
    },
    {
        path: 'register',
        component: RegisterComponent,
				...canActivate(redirectLoggedInToHome)
    },
    {
        path: 'forget-password',
        component: ForgetPasswordComponent,
				...canActivate(redirectLoggedInToHome)
    },
    {
        path: 'verify-email',
        component: VerifyEmailComponent,
				...canActivate(verifyGuard)
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [],
})
export class AuthRoutingModule {}
