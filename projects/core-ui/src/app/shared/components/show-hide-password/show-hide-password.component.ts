import { AfterContentInit, Component, ContentChild, OnDestroy } from '@angular/core';
import { IonInput } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-show-hide-password',
	templateUrl: './show-hide-password.component.html',
	styleUrls: ['./show-hide-password.component.scss'],
})
export class ShowHidePasswordComponent implements AfterContentInit, OnDestroy {
	showPassword = false;
	show = false;
	inputValue$: Subscription | null = null;
	@ContentChild(IonInput) input!: IonInput;

	ngAfterContentInit(): void {
		if (this.input.clearInput) {
			this.inputValue$ = this.input.ionInput.subscribe(() => {
				if (this.input.value) {
					this.show = true;
				} else {
					this.show = false;
				}
			});
		}
	}

	toggleShow(): void {
		this.showPassword = !this.showPassword;
		this.input.type = this.showPassword ? 'text' : 'password';
	}

	ngOnDestroy(): void {
		if (this.inputValue$) {
			this.inputValue$.unsubscribe();
		}
	}
}
