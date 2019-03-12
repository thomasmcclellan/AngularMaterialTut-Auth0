import { Injectable } from '@angular/core';
import * as auth0 from 'auth0-js';
import { Router } from '@angular/router';
import { Creds } from '../config/creds'

(window as any).global = window;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth0 = new auth0.WebAuth({
    clientID: Creds.clientId,
    domain: Creds.domain,
    responseType: 'token',
    redirectUri: Creds.uri,
    scope: 'openid'
  })

  accessToken: String;
  expiresAt: Number;

  constructor(public router: Router) { }

  public login() : void {
    this.auth0.authorize()
  }

  public handleAuthentication() : void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken) {
        window.location.hash = ''
        this.accessToken = authResult.accessToken
        this.expiresAt = (authResult.expiresIn * 1000) + new Date().getTime()
        this.router.navigate(['/dashboard'])
      } else if (err){
        this.router.navigate(['/'])
        console.log(err)
      }
    })
  }

  public logout() : void {
    this.accessToken = null
    this.expiresAt = null 
    this.router.navigate(['/'])
  }

  public isAuthenticated() : boolean {
    return new Date().getTime() < this.expiresAt
  }
}
