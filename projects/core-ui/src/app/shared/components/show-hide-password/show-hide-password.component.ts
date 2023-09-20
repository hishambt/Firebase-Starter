import { AfterContentInit, Component, ContentChild, signal } from '@angular/core';
import { IonInput } from '@ionic/angular';
import { take } from 'rxjs';

@Component({
	selector: 'app-show-hide-password',
	templateUrl: './show-hide-password.component.html',
	styleUrls: ['./show-hide-password.component.scss'],
})
export class ShowHidePasswordComponent implements AfterContentInit {
	showPassword = signal(false);
	show = signal(false);
	@ContentChild(IonInput) input!: IonInput;

	ngAfterContentInit(): void {
		if (this.input.clearInput) {
			this.input.ionInput.pipe(take(1)).subscribe(() => this.onChange());
			this.input.getInputElement().then((element: HTMLInputElement) => {
				element.oninput = (_e): void => {
					this.onChange();
				};
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
}
