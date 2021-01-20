import { Injectable } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
import { CanActivate, Router} from '@angular/router';
import { RestaurantService } from './restaurant.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private restaurantService: RestaurantService, private router: Router) { }

  canActivate():boolean {
    if (localStorage.getItem('isLoggedin') != 'true') {
      this.router.navigate(['login']);
      return false;
    }
    else {
      return true;
    }
  }
  
}
