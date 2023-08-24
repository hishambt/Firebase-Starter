import { Component, EventEmitter, Input, Output, inject } from '@angular/core';

import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Output() toggleDrawer = new EventEmitter();
  user$ = this.authService.user$;

  constructor(private authService: AuthService, private router: Router, private _snackBar: MatSnackBar) {}

  revealId(id: string) {
    this._snackBar.open(id, 'Ok', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['mat-toolbar', 'mat-accent']
    });
  }

  logout() {
    this.authService.logout().subscribe(() => {
			this.router.navigate(['auth']);
		});
  }
}
