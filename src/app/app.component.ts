import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { map, shareReplay } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AuthService } from './shared/services/auth.service';
import { INullableUser } from './shared/models/IUser.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result: any) => result.matches),
      shareReplay()
    );

  currentUser$ = this._authService.user$;

  title: string = 'FireBase';

  constructor(
    private _authService: AuthService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {}

  login() {
    this._authService.login();
  }

  logout() {
    this._authService.logout();
  }
}
