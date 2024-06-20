import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = true;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  login(): Observable<boolean> {
    return of(true).pipe(
      delay(1000),
      tap(val => (localStorage.getItem('token-teamMI')=='9-QCsjE1Xg:^GZaX>#}@,~JTpRyG~[MFZ.ji:j..^|l3[6Fg8Hw{)3S4{##>2%]D')? this.isLoggedIn =  true:  this.isLoggedIn =  false)
    );
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}