import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './auth.service';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'user-app-pwa';
  showDashboard = false;
  appTitle;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private authService: AuthService, private dataService: DataService){ }

  ngOnInit() {
    this.dataService.appTitle$.asObservable().subscribe(data=>{
      this.appTitle = data
    });

    this.authService.isLoggedIn$.asObservable().subscribe(flag=>{
      this.showDashboard = flag;
    });

  }

  logout(){
    this.authService.logout().subscribe(()=>{
      this.router.navigate(['/login']);
    });
  }

}
