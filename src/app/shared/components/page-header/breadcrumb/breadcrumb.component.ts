import { Component, Input } from '@angular/core';

import { IBreadcrumbItem } from '../../../models/IBreadcrumbItem';

@Component({
	selector: 'app-breadcrumb',
	templateUrl: './breadcrumb.component.html',
	styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent {
	@Input() items: IBreadcrumbItem[] = [];
}
