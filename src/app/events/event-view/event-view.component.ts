import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, ParamMap, NavigationExtras } from '@angular/router';
import { EventsService } from '../events.service';
import { Observable, of } from 'rxjs';
import { switchMap, tap, map } from 'rxjs/operators';

import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator, MatDialog } from '@angular/material';
import { ConfirmPwdDialogComponent } from './confirm-pwd-dialog/confirm-pwd-dialog.component';
import { AuthService } from 'src/app/auth.service';
import { FormControl } from '@angular/forms';

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
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.scss']
})
export class EventViewComponent implements OnInit {

  guestSearchControl = new FormControl("");

  event$: Observable<EventModel>;

  guests: [];

  canDeactivate = false;

  displayedColumns: string[] = ['id', 'first name', 'last name', 'email'];
  dataSource: MatTableDataSource<EventModel>;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private router:Router,private route: ActivatedRoute, private eventsService: EventsService,public dialog: MatDialog, private authService: AuthService) { }

  ngOnInit() {
    this.fetchEvent();
  }

  fetchEvent(): void{
    this.event$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.eventsService.eventById(params.get('id'))),
      tap(event=>{
        // this.dataSource = new MatTableDataSource(event.guests);
        // this.dataSource.sort = this.sort;
      })
    );
  }

  getImageUrl(event:EventModel){
    return `/api/v1/asset/img/${event.banner}`;
  }

  applyFilter(filterValue: string, event) {
    if(filterValue.length >= 3){
      this.guests = event.guests.slice(0);
      this.dataSource = new MatTableDataSource(this.guests);
      console.log("Data source is -------", this.dataSource.data.length);
      this.dataSource.sort = this.sort;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }else if(!filterValue){
      this.OnClearSearch();
    }
  }

  /**
   * Navigate away = true;
   * Dont Navigate away = false;
   */
  confirmPassword(): Observable<boolean>{
    return new Observable<boolean>(observer=>{

      if(!this.canDeactivate){
        const dialogRef = this.dialog.open(ConfirmPwdDialogComponent, {
                width: '250px',
                data: this.authService.getUser()
              });

        dialogRef.afterClosed().subscribe(result => {
                //result = result.trim();
                console.log('The dialog was closed', result);
                if(!result){
                  observer.next(false);
                }else {
                  let data = {id: result.user._id, password: result.password};
                  this.authService.verifyPassword(data).subscribe((d:boolean)=>{
                    console.log("Component confirm password", d);
                    observer.next(d);
                  })
                }
          });
      }else{
        observer.next(true);
      }

    });
  }

  OnClearSearch(){
    this.guestSearchControl.setValue("");
    this.guests = [];
    this.dataSource = new MatTableDataSource(this.guests);
  }

  OnRowSelect(guest,event){
    let query: NavigationExtras = {
      queryParams: { '_id': guest._id },
    };
    this.canDeactivate = true;
    this.router.navigate(['/guestview',event._id], query);
  }

}
