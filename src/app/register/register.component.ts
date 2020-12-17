import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  customer: Customer = new Customer('', '', '', '');

  constructor(private restaurantService: RestaurantService) { }

  ngOnInit(): void {
  }
  onSubmit() {
    this.restaurantService.register(this.customer).subscribe();
    this.customer = new Customer('', '', '', '');
  }

}
