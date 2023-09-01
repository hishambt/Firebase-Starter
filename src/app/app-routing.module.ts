import { NgModule } from '@angular/core';
import {
	RouterModule,
	Routes,
} from '@angular/router';
import { canActivate } from '@angular/fire/auth-guard';

import { ShellComponent } from './shell/shell/shell.component';
import { HomeModule } from './pages/home/home.module';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuthModule } from './core/auth/auth.module';
import { ProfileModule } from './pages/profile/profile.module';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes =
	[
		{
			path: '',
			redirectTo:
				'/home',
			pathMatch:
				'full',
		},
		{
			path: '',
			component:
				ShellComponent,
			...canActivate(
				authGuard,
			),
			children:
				[
					{
						path: 'home',
						loadChildren:
							() =>
								HomeModule,
					},
					{
						path: 'profile',
						loadChildren:
							() =>
								ProfileModule,
					},
				],
		},
		{
			path: 'auth',
			loadChildren:
				() =>
					AuthModule,
		},
		{
			path: '404',
			component:
				NotFoundComponent,
		},
		{
			path: '**',
			redirectTo:
				'404',
		},
	];

@NgModule({
	imports: [
		RouterModule.forRoot(
			routes,
		),
	],
	exports: [
		RouterModule,
	],
})
export class AppRoutingModule {}
