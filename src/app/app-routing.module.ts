import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { EventsComponent } from './events/events.component';
import { AuthGuard } from './auth.guard';
import { EventViewComponent } from './events/event-view/event-view.component';
import { EventDeactivateGuard } from './events/event-deactivate.guard';
import { GuestViewComponent } from './events/guest-view/guest-view.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'events', component: EventsComponent, canActivate: [AuthGuard] },
  {path: 'viewevent/:id', component: EventViewComponent, canActivate: [AuthGuard], canDeactivate: [EventDeactivateGuard] },
  {path: 'guestview/:id', component: GuestViewComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: '/events', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


/**
 * 
 * {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'}
 */