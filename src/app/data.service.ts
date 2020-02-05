import { Injectable } from '@angular/core';
import { Observable, of, Subject, throwError } from 'rxjs';
import { delay, tap, catchError } from 'rxjs/operators';

interface appTitle{
  path: string;
  title: string;
  logo: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  appTitle$ = new Subject<appTitle>();

  constructor() { }

  setTitle(url){
    console.log(url);
    try{
      let appRoute = url.split("/")[1];
      appRoute = appRoute.split("/")[0];
      let appTitle = this.titles[appRoute];
      this.appTitle$.next(appTitle);
    }catch(e){
      console.log("Error occured while setting title", e.message);
    }
  }


  titles = {
    'events': {
      path: 'events',
      title: 'Events',
      logo: 'event'
    },
    'viewevent': {
      path: 'viewevent',
      title: 'Event View',
      logo: 'visibility'
    },
    'guestview':{
      path: 'guestview',
      title: 'Guest',
      logo: 'account_box'
    }
  }


}
