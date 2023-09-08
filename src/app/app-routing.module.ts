import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ShellComponent } from './shell/shell/shell.component';
import { authGuard } from './core/guards/auth.guard';
import { canActivate } from '@angular/fire/auth-guard';
import { AuthModule } from '@angular/fire/auth';
import { HomeModule } from './pages/home/home.module';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProfileModule } from './pages/profile/profile.module';

const routes: Routes = [
	{
		path: '',
		redirectTo: '/home',
		pathMatch: 'full',
	},
	{
		path: '',
		component: ShellComponent,
		...canActivate(authGuard),
		children: [
			{
				path: 'home',
				loadChildren: () => HomeModule,
			},
			{
				path: 'profile',
				loadChildren: () => ProfileModule,
			},
		],
	},
	{
		path: 'auth',
		loadChildren: () => AuthModule,
	},
	{
		path: '404',
		component: NotFoundComponent,
	},
	{
		path: '**',
		redirectTo: '404',
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
	exports: [RouterModule],
})
export class AppRoutingModule {}
