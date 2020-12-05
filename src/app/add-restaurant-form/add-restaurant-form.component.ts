import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../restaurant';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-add-restaurant-form',
  templateUrl: './add-restaurant-form.component.html',
  styleUrls: ['./add-restaurant-form.component.css']
})
export class AddRestaurantFormComponent implements OnInit {

  submitted = false;

  cities: string[] = ['Yatta', 'Hebron', 'Dora'];

  model = new Restaurant(this.restaurantService.getRestaurants().length, '',  '', 0, 0, '');

  constructor(public restaurantService: RestaurantService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.submitted = true;

  }

  newRestaurant() {
    this.restaurantService.addRestaurant(this.model);
    this.model = new Restaurant(this.restaurantService.getRestaurants().length, '', '', 0, 0, '',);
  }


}
