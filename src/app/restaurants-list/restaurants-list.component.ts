import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../restaurant';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-restaurants-list',
  templateUrl: './restaurants-list.component.html',
  styleUrls: ['./restaurants-list.component.css']
})
export class RestaurantsListComponent implements OnInit {

  restaurants: Restaurant[];
  filterMethod:string;

  constructor(public restaurantService: RestaurantService) { }

  ngOnInit(): void {
    this.restaurants = this.restaurantService.getRestaurants();
  }

  filter(value) {
    this.restaurants = this.restaurantService.filterRest(value);
  }

}
