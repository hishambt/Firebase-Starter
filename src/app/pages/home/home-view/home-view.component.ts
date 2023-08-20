import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-home-view',
	templateUrl: './home-view.component.html',
	styleUrls: ['./home-view.component.scss']
})
export class HomeViewComponent {

	constructor(private router: Router, private http: HttpClient) {

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
