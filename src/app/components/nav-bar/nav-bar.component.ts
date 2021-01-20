import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RestaurantService } from '../../services/restaurant.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  toggleNavbar = true;
  toggleBtn = false;
  isAdmin = true;
  isLoggedin = false;

  constructor(private restaurantService: RestaurantService, private authService: AuthService) { }

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.isLoggedin = this.authService.isLoggedin();
     
  }

  logout() {
    this.authService.logout();
  }

}
