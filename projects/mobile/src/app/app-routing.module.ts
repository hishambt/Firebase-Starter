import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { canActivate } from '@angular/fire/auth-guard';

import { ShellComponent } from './shell/shell/shell.component';
import { authGuard } from './core/guards/auth.guard';
import { HomeModule } from './pages/home/home.module';
import { ProfileModule } from './pages/profile/profile.module';
import { AuthModule } from './core/auth/auth.module';
import { ContactsModule } from './pages/contacts/contacts.module';

const routes: Routes = [
	{
		pathMatch: 'full',
		path: '',
		redirectTo: 'home',
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
			{
				path: 'contacts',
				loadChildren: () => ContactsModule,
			},
		],
	},
	{
		path: 'auth',
		loadChildren: () => AuthModule,
	},
	{
		path: '**',
		redirectTo: 'auth/404',
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
	exports: [RouterModule],
})
export class AppRoutingModule {}
