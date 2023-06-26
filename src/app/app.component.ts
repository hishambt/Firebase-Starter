import { EMPTY, Observable, Subscribable, Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit, Optional } from '@angular/core';
import { map, shareReplay } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { Auth, authState, signInAnonymously, signOut, User, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { traceUntilFirst } from '@angular/fire/performance';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result: any) => result.matches),
      shareReplay()
    );
    private readonly userDisposable: Subscription|undefined;
    public readonly user: Observable<User | null> = EMPTY;
  
    isLoggedIn = false;
    title: string = "FireBase";
  
    constructor(@Optional() private auth: Auth, private breakpointObserver: BreakpointObserver) {
      if (auth) {
        this.user = authState(this.auth);
        this.userDisposable = authState(this.auth).pipe(
          traceUntilFirst('auth'),
          map(u => {
            return !!u;
          })
        ).subscribe(isLoggedIn => {
          this.isLoggedIn = isLoggedIn;
        });
      }
    }
  
    ngOnInit(): void { }
  
    ngOnDestroy(): void {
      if (this.userDisposable) {
        this.userDisposable.unsubscribe();
      }
    }
  
    async login() {
      return await signInWithPopup(this.auth, new GoogleAuthProvider());
    }
  
    async loginAnonymously() {
      return await signInAnonymously(this.auth);
    }
  
    async logout() {
      return await signOut(this.auth);
    }
}
