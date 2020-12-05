import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../restaurant.service';



@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})

export class LoginComponent implements OnInit {

  loggedIn:boolean;
  isAdmin:boolean;

  constructor(private restaurantService: RestaurantService) { }

  ngOnInit() {
    this.loggedIn = this.restaurantService.loggedIn;
    this.isAdmin = this.restaurantService.isAdmin;
  }


  onSubmit() {

  }

  login(username:string, password:string) {
    let login = false;
    
    login = this.restaurantService.getCustomers().filter((custmer) => custmer.first_name == username).length > 0;
    if (login) {
      if (this.restaurantService.getAdminList().filter((admin)=>admin==username).length > 0) {
        this.restaurantService.isAdmin = true;
        this.isAdmin = true;
      }
      this.loggedIn = true;
      this.restaurantService.loggedIn = true;
    }

  }


  
}