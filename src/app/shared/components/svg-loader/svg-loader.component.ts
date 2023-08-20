import { Component, Input, OnInit } from '@angular/core';

import { DefaultImage, SVGS } from '../../svgs/svgImages';

@Component({
	selector: 'app-svg-loader',
	templateUrl: './svg-loader.component.html',
	styleUrls: ['./svg-loader.component.scss']
})
export class SvgLoaderComponent implements OnInit {
	@Input() name: string = '';
	@Input() width: string = 'auto';

	public svg: string = '';

	constructor() {}

	ngOnInit(): void {
		if (this.name) {
			this.svg = SVGS[this.name];
		} else {
			this.svg = DefaultImage['defaultNoImage'];
		}
	}
}
