import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../restaurant';
import { RestaurantService } from '../restaurant.service';
import { Student } from '../student';

@Component({
  selector: 'app-restaurants-list',
  templateUrl: './restaurants-list.component.html',
  styleUrls: ['./restaurants-list.component.css']
})
export class RestaurantsListComponent implements OnInit {

  restaurants: Restaurant[] = [];
  filterMethod:string;
  student: string;

  constructor(public restaurantService: RestaurantService) { }

  ngOnInit(): void {
    // this.restaurants = this.restaurantService.getRestaurants();
    this.restaurantService.getRestaurants().subscribe(
      (rest:Restaurant[]) => {
        this.restaurants = rest.sort((a, b) => (a.name > b.name) ? 1 : -1);
      },
    );
    this.restaurantService.getStudent().subscribe(
      (a) => {
        console.log(JSON.stringify(a));
        this.student = JSON.stringify(a);
      },
      (err) => console.log(err)
    );
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
