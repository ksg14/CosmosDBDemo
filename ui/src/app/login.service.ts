import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class LoginService {

  loginStatus: boolean;

  constructor(private router: Router) { }

  login (): void {
    this.loginStatus = true;
    this.router.navigateByUrl ('/session');
  }
  
  logout (): void {
    this.loginStatus = false;
    this.router.navigateByUrl ('/login');
  }

  getStatus (): boolean {
    return this.loginStatus;
  }

}
