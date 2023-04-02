
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtAuthenticationService } from '../security/jwt-authentication.service';

@Injectable({
  providedIn: 'root'
})

export class HttpIntersepterBasicAuthService implements HttpInterceptor{
  constructor(
    private jwtAuthenticationService: JwtAuthenticationService
  ) { 
    
  }

  intercept(request: HttpRequest<any>, next: HttpHandler){
    let jwtAuthHeaderString = this.jwtAuthenticationService.getAuthenticatedToken();
    let userId = this.jwtAuthenticationService.getAuthenticatedUser();

    if(jwtAuthHeaderString && userId){
    request = request.clone({
      setHeaders : {
        Authorization: jwtAuthHeaderString
      }
    })
  }
    return next.handle(request);
  }


}
