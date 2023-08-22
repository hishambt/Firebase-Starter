import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellComponent } from './shell/shell/shell.component';
import { HomeModule } from './pages/home/home.module';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuthModule } from './core/auth/auth.module';
import { fireauthGuard } from './core/guards/fireauth.guard';

const routes: Routes = [
  {
		path: '',
		redirectTo: '/home',
		pathMatch: 'full'
	},
  {
		path: '',
		component: ShellComponent,
		children: [
			{
				path: 'home',
				canActivate: [fireauthGuard],
				loadChildren: () => HomeModule
			},
			{
				path: 'customers',
				component: NotFoundComponent
			},
		]
	},
	{
		path: 'auth',
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
