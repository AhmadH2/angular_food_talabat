import { ThrowStmt } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Menu } from '../menu';
import { RestaurantService } from '../restaurant.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-menus-list',
  templateUrl: './menus-list.component.html',
  styleUrls: ['./menus-list.component.css']
})
export class MenusListComponent implements OnInit {
  menus: Menu[];
  id:number;
  isAdmin:boolean;

  constructor(private restaurantService: RestaurantService, 
    private route: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('rest_id');
    this.menus = this.restaurantService.getMenusById(this.id);
    this.isAdmin = this.restaurantService.isAdmin;
  }

  goBack() {
    this.location.back();
  }

  filter(value) {
    this.menus = this.restaurantService.filterMenus(value);
  }

  delete(value) {
    let index = this.menus.indexOf(value);
    this.menus.splice(index, 1);
  }

  editMenu(value) {
    const id = +this.route.snapshot.paramMap.get('rest_id');
    this.menus = this.restaurantService.getMenusById(id);
  }


}
