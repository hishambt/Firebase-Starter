import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  standalone: true,
  imports: [
    SharedModule
  ]
})
export class NotFoundComponent {

  router = inject(Router);

  goTo(url: string) {
		this.router.navigateByUrl(url);
	}
}
