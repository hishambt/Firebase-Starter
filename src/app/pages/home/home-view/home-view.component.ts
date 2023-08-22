import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { INullableUser } from 'src/app/shared/models/IUser.model';

@Component({
	selector: 'app-home-view',
	templateUrl: './home-view.component.html',
	styleUrls: ['./home-view.component.scss']
})
export class HomeViewComponent {

	user$ = this.authService.user$;

	constructor(private router: Router, private http: HttpClient, private authService: AuthService) {

	}

	goTo(url: string) {
		this.router.navigateByUrl(url);
	}

	getTest() {
    this.http.post("https://jsonplaceholder.typicode.com/todos/1", null).subscribe(res => {
      console.log(res);
    })
  }
}
