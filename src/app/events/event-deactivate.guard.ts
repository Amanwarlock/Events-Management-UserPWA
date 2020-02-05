import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanDeactivate  } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, tap, map } from 'rxjs/operators';
import { EventViewComponent } from './event-view/event-view.component';

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
 }
 

@Injectable({
  providedIn: 'root'
})
export class EventDeactivateGuard implements CanDeactivate<EventViewComponent>{
  
  canDeactivate(component: EventViewComponent,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) : Observable<boolean>{
    return component.confirmPassword().pipe(tap(d=>{
      console.log("Deactivate guard password confirmation ------",d);
    }),map((x: boolean)=> x));
  }
  
}
