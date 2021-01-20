import { Component, OnInit } from '@angular/core';
import { Customer } from '../models/customer';
import { AuthService } from '../services/auth.service';
import { RestaurantService } from '../services/restaurant.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  customer: Customer = new Customer('', '', '', '');

  constructor(private restaurantService: RestaurantService, private authService: AuthService) { }

  ngOnInit(): void {
  }
  onSubmit() {
    this.authService.register(this.customer).subscribe();
    this.customer = new Customer('', '', '', '');
  }

}
