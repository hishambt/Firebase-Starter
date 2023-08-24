import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppSettingsService {
  private isAppLoading = new BehaviorSubject<boolean>(false);
  isAppLoading$ = this.isAppLoading.asObservable();

  constructor() {}

  getUrlRoute(): string {
    return window.location.href;
  }

  getUrlOrigin(): string {
    return window.location.origin;
  }

  getRouteParam(url: string): any {
    const mUrl = new URL(url);
    const path = mUrl.pathname;
    const routeElements = path
      .split('/')
      .filter(Boolean)
      .map((segment) => {
        return segment;
      });

    return routeElements;
  }

  toggleIsLoading(isLoading: boolean) {
    this.isAppLoading.next(isLoading);
  }
}
