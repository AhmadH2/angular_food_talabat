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

  model = new Menu(0, 0, '', '', 0, '', 0);

  constructor(public restaurantService: RestaurantService) { }

  ngOnInit(): void {
    this.menus = this.restaurantService.getMenus();
    this.restaurants = this.restaurantService.getRestaurants();
  }

  onSubmit() {

  }

  newMenu() {
    // this.menus.push(this.model);
    this.restaurantService.addMenu(this.model);
    this.model = new Menu(0, 0, '', '', 0, '', 0);
    console.log(this.menus[0]);
  }

}
