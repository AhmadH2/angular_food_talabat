import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  toggleNavbar = true;
  toggleBtn = false;
  isAdmin = true

  constructor(private restaurantService: RestaurantService) { }

  ngOnInit(): void {
    this.isAdmin = localStorage.getItem('isAdmin') == 'true';
  }

}
