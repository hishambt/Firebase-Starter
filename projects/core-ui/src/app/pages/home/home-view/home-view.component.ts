import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'projects/core-ui/src/app/core/services/auth.service';

@Component({
	selector: 'app-home-view',
	templateUrl: './home-view.component.html',
	styleUrls: ['./home-view.component.scss'],
})
export class HomeViewComponent {
	router = inject(Router);
	authService = inject(AuthService);
}
