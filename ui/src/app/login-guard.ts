import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';


@Injectable()
export class LoginRouteGuard implements CanActivate {

  constructor(private loginService: LoginService) {}

  canActivate() {
    console.log ("guard - " + this.loginService.getStatus ());
    return this.loginService.getStatus ();
  }
}