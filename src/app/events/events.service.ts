import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {Observable, throwError, from } from 'rxjs';
import {startWith, map, tap, catchError, flatMap} from 'rxjs/operators';
import { ErrorhandlerService } from '../errorhandler.service';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient, private errorHandler: ErrorhandlerService) { }

////'Content-Type':  'application/x-www-form-urlencoded',
  httpOptions = {
    headers: new HttpHeaders({
      
      'Content-Type': 'multipart/form-data'
    })
  };

  index(query,select,sort,page,count): Observable<any>{
    
    Object.defineProperty(RegExp.prototype, "toJSON", {
      value: RegExp.prototype.toString
    });

    let filter = query ? query: {};
    let api = `/api/v1/event?filter=${JSON.stringify(filter)}`; // encodeURIComponent(JSON.stringify(filter))

    if(select && select.length) api += `&select=${select.join(",")}`;

    if(sort && Object.keys(sort).length) api += `&sort=${JSON.stringify(sort)}`;

    api += `&page=${page}&count=${count}`;

    return this.http.get(api).pipe(tap((d:any)=>{
      d = d && d.length ? d: [];
    },
    catchError(this.errorHandler.handleError)
    ));
  };

  eventCount(query:any): Observable<Number>{
    Object.defineProperty(RegExp.prototype, "toJSON", {
      value: RegExp.prototype.toString
    });

    let filter = query ? query: {};
    let api = `/api/v1/event/count?filter=${JSON.stringify(filter)}`; 
    return this.http.get(api).pipe(
      tap((d:any)=>{}),
      catchError(this.errorHandler.handleError)
      );
  }

  eventById(id: string): Observable<any>{
    return this.http.get(`/api/v1/event/${id}`).pipe(
      tap((d:any)=>{}),
      catchError(this.errorHandler.handleError)
      );
  }

  uploadFile(data:any): Observable<any>{
    return this.http.post(`/api/v1/asset/upload`, data).pipe(
      tap((d:any)=>{

      }),
      catchError(this.errorHandler.handleError)
    );
  }


  eventUpdate(event:any): Observable<any>{
    return this.http.put(`/api/v1/event/${event._id}`, event).pipe(
      tap((d:any)=>{}),
      catchError(this.errorHandler.handleError)
      );
  }

}
