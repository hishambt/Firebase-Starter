import { Directive, Input, OnInit, OnChanges, ElementRef, Renderer2 } from '@angular/core';
import { IonSpinner } from '@ionic/angular';

@Directive({
	selector: '[appAsyncRef]',
})
export class AsyncRefDirective implements OnInit, OnChanges {
	@Input() appAsyncRef: boolean = false;
	textContent: string = '';
	spinnerContainer!: ElementRef<IonSpinner>;

	constructor(
		private targetEl: ElementRef,
		private renderer: Renderer2,
	) {}

	ngOnInit(): void {
		this.spinnerContainer = this.renderer.createElement('ion-spinner');
	}

	ngOnChanges(): void {
		if (this.appAsyncRef) {
			this.textContent = this.targetEl.nativeElement.textContent;
			this.targetEl.nativeElement.textContent = '';
			this.spinnerContainer.nativeElement.name = 'dots';
			this.targetEl.nativeElement.setAttribute('disabled', 'disabled');
			this.renderer.appendChild(this.targetEl.nativeElement, this.spinnerContainer);
		} else if ((this.targetEl.nativeElement as HTMLElement).children.namedItem('ion-spinner')) {
			this.targetEl.nativeElement.textContent = this.textContent;
			this.renderer.removeChild(this.targetEl.nativeElement, this.spinnerContainer);
		}
	}
}
