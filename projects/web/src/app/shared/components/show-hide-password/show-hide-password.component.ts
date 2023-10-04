import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChild, OnDestroy, signal } from '@angular/core';
import { IonInput } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-show-hide-password',
	templateUrl: './show-hide-password.component.html',
	styleUrls: ['./show-hide-password.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowHidePasswordComponent implements AfterContentInit, OnDestroy {
	showPassword = signal(false);
	show = signal(false);
	@ContentChild(IonInput) input!: IonInput;
	ionInputEvent$: Subscription | null = null;

	ngAfterContentInit(): void {
		if (this.input.clearInput) {
			this.ionInputEvent$ = this.input.ionInput.subscribe(() => this.onChange());
			this.input.getInputElement().then((element: HTMLInputElement) => {
				element.parentElement?.querySelector('button')?.addEventListener('click', () => this.onChange());
			});
		}
	}

	onChange(): void {
		if (this.input.value) {
			this.input.getInputElement().then((element: HTMLInputElement) => {
				element.classList.add('!w-[70%]', '!flex-none');
				element.parentElement?.querySelector('button')?.classList.add('absolute', 'right-0', 'top-[4px]');
			});

			this.show.set(true);
		} else {
			this.input.getInputElement().then((element: HTMLInputElement) => {
				element.classList.remove('!w-[70%]', '!flex-none');
			});

			this.show.set(false);
		}
	}

	onKeyDown(event: KeyboardEvent): void {
		if (event.code == 'Space') {
			this.toggleShow();
		}
	}

	toggleShow(): void {
		this.showPassword.set(!this.showPassword());
		this.input.type = this.showPassword() ? 'text' : 'password';
	}

	ngOnDestroy(): void {
		if (!this.input.clearInput) {
			return;
		}

		if (this.ionInputEvent$) {
			this.ionInputEvent$.unsubscribe();
		}

		if (this.input) {
			this.input.getInputElement().then((element: HTMLInputElement) => {
				element.parentElement?.querySelector('button')?.removeEventListener('click', () => this.onChange());
			});
		}
	}
}
