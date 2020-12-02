import { Component, OnInit } from '@angular/core';
import { Menu } from '../menu';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-menus-list',
  templateUrl: './menus-list.component.html',
  styleUrls: ['./menus-list.component.css']
})
export class MenusListComponent implements OnInit {
  menus: Menu[];

  constructor(private restaurantService:RestaurantService) { }

  ngOnInit(): void {
    this.menus = this.restaurantService.getMenus();
  }

}
