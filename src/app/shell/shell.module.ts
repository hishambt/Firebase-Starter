import { NgModule } from '@angular/core';

import { ShellComponent } from './shell/shell.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SharedModule } from '../shared/shared.module';
import { SideNavbarComponent } from './side-navbar/side-navbar.component';
import { ShellLoadingBarComponent } from './_components/shell-loading-bar/shell-loading-bar.component';

@NgModule({
	declarations: [ShellComponent, HeaderComponent, FooterComponent, SideNavbarComponent, ShellLoadingBarComponent],
	imports: [],
})
export class ShellModule {}
