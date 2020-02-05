import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component';

import {HeaderInterceptor} from './interceptors/header.interceptor';
import { AuthTokenInterceptor } from './interceptors/authToken.interceptor';
import { EventsComponent } from './events/events.component';
import { EventItemComponent } from './events/event-item/event-item.component';
import { ImageSecurePipe } from './pipes/imageSecure.pipe';
import { DialogComponent } from './dialog/dialog.component';
import { EventViewComponent } from './events/event-view/event-view.component';
import { ConfirmPwdDialogComponent } from './events/event-view/confirm-pwd-dialog/confirm-pwd-dialog.component';
import { GuestViewComponent } from './events/guest-view/guest-view.component';
import { SignaturePadModule } from '@ng-plus/signature-pad';
//import { SignaturePadModule } from 'angular2-signaturepad';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EventsComponent,
    EventItemComponent,
    ImageSecurePipe,
    DialogComponent,
    EventViewComponent,
    ConfirmPwdDialogComponent,
    GuestViewComponent
  ],
  entryComponents: [
    DialogComponent,
    ConfirmPwdDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SignaturePadModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi:true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
