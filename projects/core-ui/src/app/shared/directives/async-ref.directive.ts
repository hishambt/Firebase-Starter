import { Directive, Input, OnInit, ElementRef, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
	selector: '[appAsyncRef]',
})
export class AsyncRefDirective implements OnInit {
	@Input() appAsyncRef: boolean = false;
	@Input() disableAfterResolve: boolean = false;
	spinnerContainer: HTMLElement = this.renderer.createElement('ion-spinner');

	constructor(
		private targetEl: ElementRef<HTMLElement>,
		private renderer: Renderer2,
	) {}

	ngOnInit(): void {
		if (this.targetEl.nativeElement.childElementCount == 0) {
			const wrapper = this.renderer.createElement('div');
			wrapper.textContent = this.targetEl.nativeElement.textContent;
			this.targetEl.nativeElement.textContent = '';
			this.renderer.appendChild(this.targetEl.nativeElement, wrapper);
		}

		this.spinnerContainer.setAttribute('name', 'dots');
		this.spinnerContainer.classList.add('hidden');

		this.renderer.appendChild(this.targetEl.nativeElement, this.spinnerContainer);
	}

	ngOnChanges(simpleChanges: SimpleChanges): void {
		if (simpleChanges['appAsyncRef'].firstChange) {
			return;
		}

		if (this.appAsyncRef) {
			this.showLoader();
		} else {
			this.hideLoader();
		}
	}

	showLoader(): void {
		for (const item of this.targetEl.nativeElement.children) {
			if (item.tagName !== 'ION-SPINNER') {
				item.classList.add('opacity-0', 'invisible');
			}
		}

		this.spinnerContainer.classList.remove('hidden');

		this.targetEl.nativeElement.setAttribute('disabled', 'disabled');
	}

	hideLoader(): void {
		for (const item of this.targetEl.nativeElement.children) {
			item.classList.remove('opacity-0', 'invisible');
		}

		this.spinnerContainer.classList.add('hidden');

		if (!this.disableAfterResolve) {
			this.targetEl.nativeElement.removeAttribute('disabled');
		}
	}
}
