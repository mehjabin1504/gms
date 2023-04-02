import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtAuthenticationService } from './jwt-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  constructor(private jwtAuthenticationService: JwtAuthenticationService,
    private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.jwtAuthenticationService.isUserLoggedIn()) {
      // return true;
      // this.router.navigate(['login']);  
      // return false;

      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
