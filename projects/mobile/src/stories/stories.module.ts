import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import ButtonComponent from './button.component';
import HeaderComponent from './header.component';
import PageComponent from './page.component';

@NgModule({
    imports: [CommonModule],
    exports: [],
    declarations: [ButtonComponent, HeaderComponent, PageComponent],
    providers: [],
})
export class StoriesModule { }
