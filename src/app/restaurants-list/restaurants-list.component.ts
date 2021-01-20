import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../models/restaurant';
import { RestaurantService } from '../services/restaurant.service';

@Component({
  selector: 'app-restaurants-list',
  templateUrl: './restaurants-list.component.html',
  styleUrls: ['./restaurants-list.component.css']
})
export class RestaurantsListComponent implements OnInit {

  restaurants: Restaurant[] = [];
  filterMethod:string;
  student: string;
  isAdmin:boolean;

  constructor(public restaurantService: RestaurantService) { }

  ngOnInit(): void {
    this.restaurantService.getRestaurants().subscribe(
      (rest:Restaurant[]) => {
        this.restaurants = rest.sort((a, b) => (a.name > b.name) ? 1 : -1);
      },
    );
    this.isAdmin = localStorage.getItem('isAdmin') == 'true';
  }

  update() {
    this.restaurantService.getRestaurants().subscribe(
      (rest: Restaurant[]) => this.restaurants = rest,
      (err) => console.log(err)
    );
  }


  filter(method: string) {
    method = method.toLowerCase();

    //need to be fixed
    if (method == 'rating') {
      this.restaurants.sort((a, b) => (a.rating < b.rating) ? 1 : -1);
    }
    if (method == 'city') {
      this.restaurants.sort((a, b) => (a.city > b.city) ? 1 : -1);

    }
    else {
      this.restaurants.sort((a, b) => (a.name > b.name) ? 1 : -1);
    }
  }

}
