import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, ParamMap, NavigationExtras } from '@angular/router';
import { EventsService } from '../events.service';
import { Observable, of } from 'rxjs';
import { switchMap, tap, map } from 'rxjs/operators';
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
  selector: 'app-guest-view',
  templateUrl: './guest-view.component.html',
  styleUrls: ['./guest-view.component.scss']
})
export class GuestViewComponent implements OnInit {

  event$: Observable<EventModel>;

  signature: {};

  signatureImage;

  signatureForm;

  guestId: string;

  guest: {};


  constructor(private router:Router,private route: ActivatedRoute, private eventsService: EventsService,private authService: AuthService) { }

  ngOnInit() {
    this.fetchEvent();
  }

  ngAfterViewInit() {
  
  }

  fetchEvent(): void{
    this.event$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>{
        return this.eventsService.eventById(params.get('id'));
      }),
      tap(event=>{
        this.route.queryParamMap.pipe(map(params => params.get('_id') || 'None')).subscribe(_id =>{
          this.guestId = _id;
          event.guests.filter(guest =>{
            if(guest._id === _id){
              this.guest = guest;
            }
          });
      });
      })
    );

  }

  getImageUrl(event:EventModel){
    return `/api/v1/asset/img/${event.banner}`;
  }


  OnCaptureSignature(data) {
    console.log("Base64 signature----",data);
    let fileName = this.imageName('png');
    const imageBlob = this.dataURItoBlob(data);
    this.signatureImage = new File([imageBlob], fileName, { type: 'image/png' });
    this.signatureForm = new FormData();
    this.signatureForm.append("uploadedFile", this.signatureImage);
  }

  OnSign(data){
    console.log("Base64 signature on blur up----",data);
    let test : EventEmitter<any> = new EventEmitter();
    test.emit("done");
  }

  imageName(imgType){
    const date = new Date().valueOf();
    let text = '';
    const possibleText = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      text += possibleText.charAt(Math.floor(Math.random() *    possibleText.length));
    }
    const imageName = date + '.' + text + '.' + imgType;
    return imageName;
  }
  
  randomNumber(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  dataURItoBlob(dataURI) {
    dataURI = dataURI.split(",")[1];
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/png' });    
    return blob;
 }

 OnCheckIn(event,guest){
   let data = {
     eventId: event._id,
     guestId: guest._id,
     hasCheckedIn: true,
     signature: ""
   }
    this.eventsService.uploadFile(this.signatureForm).subscribe(d=>{
      event.guests.map(el=>{
        if(el._id === guest._id){
          el.hasCheckedIn = true;
          el.signature = d.fileInfo.filename;
        }
      });
      this.eventsService.eventUpdate(event).subscribe(d=>{
        console.log("Event successfully updated");
        this.router.navigate(['/viewevent', event._id]);
      });
    })
 }


}

