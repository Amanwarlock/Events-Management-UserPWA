import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Observable, of, from} from 'rxjs';
import {startWith, map, tap, switchMap} from 'rxjs/operators';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { EventsService } from './events.service';


interface EventModel{
  _id: string;
  name: string;
  description: string;
  scheduledAt: string;
  createdAt: string;
  totalGuests: number;
  banner: string;
  guestFile: string;
  guests: [];
  createdBy: string;
}

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  eventList$: Observable<EventModel[]>;
  eventCount$:  Observable<Number>;

  select: string[] = ['_id', 'name', 'description', 'banner', 'scheduledAt', 'createdAt', 'createdBy', 'totalGuests'];

  pageSize = 10;
  pageCount = 1;
  sort = {createdBy: -1};

  mySearchControl = new FormControl();
  dateSearchControl = new FormControl();

  @Output() eventSelect = new EventEmitter();

  constructor(private router: Router, private eventsService: EventsService) { }

  ngOnInit() {
    this.eventList$ = this.fetchEvents({},this.select,this.sort,this.pageCount,this.pageSize);
    this.autoSearch();
    this.eventCount$ = this.eventsService.eventCount({});
  }

  fetchEvents(filter,select,sort,page,count): Observable<EventModel[]>{
    return this.eventsService.index(filter,select,sort,page,count);
  }

  OnResetDateField(){
    this.dateSearchControl.setValue("");
    this.eventList$ = this._filter(this.dateSearchControl.value);
  }

  OnResetEventNameField(){
    this.mySearchControl.setValue("");
    this.eventList$ = this._filter(this.mySearchControl.value);
  }

  autoSearch(){
    this.mySearchControl.valueChanges
    .pipe(
      startWith(''),
      tap(value => {
        if(value.length >= 3){
          this.eventList$ = this._filter(value);
        }
      })
    ).subscribe(d=>{});

    this.dateSearchControl.valueChanges.pipe(
      tap(value=>{
        this.eventList$ = this._filter(value);
      })
    ).subscribe(d=>{});

  }

  private _filter(value: string): Observable<EventModel[]> {
    //const filterValue = value.toLowerCase();
    let query:any = {};
    let eventNameField = this.mySearchControl.value;
    let dateField = this.dateSearchControl.value;
    
    if(eventNameField && eventNameField.trim()){
      eventNameField = eventNameField.toLowerCase();
      query.name =  new RegExp("^"+ eventNameField, "i");
    }
    if(dateField){
      let currentDate = new Date(dateField);
      let startDate = new Date(currentDate.getFullYear(),currentDate.getMonth(), (currentDate.getDate() - 1),23,59,59);
      let endDate = new Date(currentDate.getFullYear(),currentDate.getMonth(),currentDate.getDate(),23,59,59);
      query.scheduledAt = {[`$gte`]: startDate, [`$lte`]: endDate};
    }
    
    return this.fetchEvents(query,this.sort,this.select,1,5);
    
  }


}
