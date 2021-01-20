import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {RestaurantService} from './restaurant.service'

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  constructor(private restaurantService:RestaurantService, private router:Router) { }

  canActivate():boolean {
    if(localStorage.getItem('isAdmin') != 'true') {
      this.router.navigate(['login']);
      return false;
    }
    else {
      return true;
    }
  }
}
