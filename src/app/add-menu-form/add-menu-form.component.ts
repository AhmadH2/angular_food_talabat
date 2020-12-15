import { Component, OnInit } from '@angular/core';
import { Menu } from '../menu';
import { Restaurant } from '../restaurant';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-add-menu-form',
  templateUrl: './add-menu-form.component.html',
  styleUrls: ['./add-menu-form.component.css']
})
export class AddMenuFormComponent implements OnInit {

  restaurants: Restaurant[];

  menus: Menu[];

  model = new Menu('', '', '', '', 0, '');
  responseText = '';

  constructor(public restaurantService: RestaurantService) { }

  ngOnInit(): void {
    // this.menus = this.restaurantService.getMenus();
    
    // this.restaurantService.getRestaurants();
    this.restaurantService.getRestaurants().subscribe(
      (rest: Restaurant[]) => this.restaurants = rest,
      (err) => console.log(err),
    );
  }

  onSubmit() {

  }

  newMenu() {
    this.restaurantService.addMenu(this.model).subscribe(
      (data) => this.responseText = JSON.stringify(data),
      (error) => this.responseText = error
    )
    this.model = new Menu('', '', '', '', 0, '');
    console.log(this.menus[0]);
  }

}
