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

  model = new Restaurant('', '',  '', 0, 0, '', '');

  responseText = "";
  constructor(public restaurantService: RestaurantService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.submitted = true;
    

  }

  newRestaurant() {
    // this.restaurantService.addRestaurant(this.model);
    this.restaurantService.addRestaurant(this.model).subscribe(
      (data) => this.responseText = JSON.stringify(data),
      (error) => this.responseText = error
    )
    // this.restaurantService.getRestaurants().subscribe(
    //   (rest: Restaurant[]) => this.model = rest,
    //   (err) => console.log(err),
    // );
    this.model = new Restaurant('', '', '', 0, 0, '','');
  }


}
