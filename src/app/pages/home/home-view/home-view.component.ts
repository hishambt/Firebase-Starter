import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
    selector: 'app-home-view',
    templateUrl: './home-view.component.html',
    styleUrls: ['./home-view.component.scss'],
})
export class HomeViewComponent {
    router = inject(Router);
    authService = inject(AuthService);
    
    // user$ = this.authService.currentUserProfile$;

    goTo(url: string) {
        this.router.navigateByUrl(url);
    }
}
