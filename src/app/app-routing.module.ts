import { NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { ShellComponent } from './shell/shell/shell.component';
import { HomeModule } from './pages/home/home.module';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuthModule } from './core/auth/auth.module';
import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { ProfileModule } from './profile/profile.module';

// if user is not authorized to access a page, the user will be redirected to the login with a return URL
const redirectUnauthorizedToLogin = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
	return redirectUnauthorizedTo(`/auth/login?returnUrl=${state.url}`);
}
// If user is logged in and tried to access auth routes, the user will be redirected to the homepage
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  {
		path: '',
		redirectTo: '/home',
		pathMatch: 'full'
	},
  {
		path: '',
		component: ShellComponent,
		...canActivate(redirectUnauthorizedToLogin),
		children: [
			{
				path: 'home',
				loadChildren: () => HomeModule
			},
			{
				path: 'profile',
				loadChildren: () => ProfileModule
			}
		]
	},
	{
		path: 'auth',
		...canActivate(redirectLoggedInToHome),
		loadChildren: () => AuthModule
	},
	{
		path: '404',
		component: NotFoundComponent
	},
	{
		path: '**',
		redirectTo: "404",
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
