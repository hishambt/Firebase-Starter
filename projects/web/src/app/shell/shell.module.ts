import { NgModule } from '@angular/core';
import {
	IonAvatar,
	IonButton,
	IonButtons,
	IonChip,
	IonContent,
	IonHeader,
	IonIcon,
	IonItem,
	IonLabel,
	IonList,
	IonMenu,
	IonMenuButton,
	IonMenuToggle,
	IonPopover,
	IonRouterOutlet,
	IonSearchbar,
	IonSplitPane,
	IonTitle,
	IonToolbar,
} from '@ionic/angular/standalone';

import { ShellComponent } from './shell/shell.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SharedModule } from '../shared/shared.module';
import { SideNavbarComponent } from './side-navbar/side-navbar.component';
import { ShellLoadingBarComponent } from './_components/shell-loading-bar/shell-loading-bar.component';

@NgModule({
	declarations: [
		ShellComponent,
		HeaderComponent,
		FooterComponent,
		SideNavbarComponent,
	],
	imports: [
		SharedModule,
		ShellLoadingBarComponent,
		IonMenuToggle,
		IonIcon,
		IonLabel,
		IonItem,
		IonList,
		IonToolbar,
		IonButtons,
		IonMenuButton,
		IonTitle,
		IonSearchbar,
		IonButton,
		IonChip,
		IonAvatar,
		IonPopover,
		IonHeader,
		IonSplitPane,
		IonMenu,
		IonContent,
		IonRouterOutlet,
	],
})
export class ShellModule {}
