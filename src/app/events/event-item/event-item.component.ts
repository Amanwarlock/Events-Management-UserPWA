import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { EventsService } from '../events.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-item',
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.scss']
})
export class EventItemComponent implements OnInit {

  myColor: string;

  @Input() event;

  @Input() eventSelected = new EventEmitter();

  isSelected = false;

  constructor(public dialog: MatDialog,private router: Router, private eventsService: EventsService) { }

  ngOnInit() {
  }

  getImageUrl(event){
    return `/api/v1/asset/img/${event.banner}`;
  }

  OnEventSelect(event){
   const dialogRef = this.dialog.open(DialogComponent, {
    width: '250px',
    data: this.event
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed', result);
    if(result){
      this.OnEventLaunch(event);
    }
  });
  }

  OnEventLaunch(event){
    this.router.navigate(['/viewevent',event._id]);
  }

}
