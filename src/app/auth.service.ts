import { Injectable } from '@angular/core';
import { Observable, of, Subject, throwError } from 'rxjs';
import { delay, tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ErrorhandlerService } from './errorhandler.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn$ = new Subject<any>();

  constructor(private http: HttpClient,  private router: Router, private errorHandler: ErrorhandlerService) { }

  
  hasLoggedIn(): Observable<boolean>{
    return this.http.put('/api/v1/isLoggedIn',{}).pipe(
        tap((d:any)=>{}),
        catchError(this.errorHandler.handleError)
    );
  }

  login(data): Observable<any> {
    return this.http.post('/api/v1/login',data).pipe(
      tap((d:any) => {
        this.isLoggedIn$.next(true );
        localStorage.setItem('token',d.token);
        localStorage.setItem('isLoggedIn', "true");
        localStorage.setItem('user',JSON.stringify(d));
      }),
      catchError(this.errorHandler.handleError),
    );
  }

  logout(): Observable<boolean>  {
    let user: any = localStorage.getItem("user");
    user = JSON.parse(user);
    let email = user ? user.email: null;
    return this.http.put('/api/v1/logout', {email: email}).pipe(
      tap((d:any)=>{
        this.isLoggedIn$.next(false);
        this.router.navigate(['/login']);
        localStorage.clear();
      }),
      catchError(this.errorHandler.handleError),
    );
  }

  verifyPassword(data: any): Observable<boolean>{
    return this.http.post('/api/v1/password/verify', data).pipe(
      tap((d: boolean)=>{
        return d;
      }),
      catchError(this.errorHandler.handleError)
    );
  }

  setRedirectUrl(url:string){
    localStorage.setItem("redirectUrl",url);
  }

  getRedirectUrl(){
    let url = localStorage.getItem("redirectUrl");
    url = url && typeof url === 'string' ? url: null; 
    localStorage.removeItem("redirectUrl");
    return url;
  }

  getUser(){
    let user = localStorage.getItem("user");
    return JSON.parse(user);
  }

  getToken(){
    return localStorage.getItem("token");
  }

}
