import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-auth-shell',
	templateUrl: './auth-shell.component.html',
	styleUrls: ['./auth-shell.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthShellComponent {}
