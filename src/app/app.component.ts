import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Subscription } from 'rxjs';
import { SharedService } from "./shared.service";
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  search:string;
  title = 'movie-mood';
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  constructor(private sharedService: SharedService,private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.sharedService.lastSearch.subscribe(search => this.search = search)
    this.authService.autoAuthUser();

    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
      });

  }

  ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(["/"]);
  }
}
