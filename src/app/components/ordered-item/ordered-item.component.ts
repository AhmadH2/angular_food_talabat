import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Menu } from '../../models/menu';
import { Orders } from '../../models/orders';
import { RestaurantService } from '../../services/restaurant.service';
import {Location} from '@angular/common'
import { ToastrService } from 'ngx-toastr';
import { Restaurant } from '../../models/restaurant';

@Component({
  selector: 'app-ordered-item',
  templateUrl: './ordered-item.component.html',
  styleUrls: ['./ordered-item.component.css']
})
export class OrderedItemComponent implements OnInit {

  @Input()
  order: Orders;
  menu:Menu = new Menu('', '', '', '', 5, '');
  restName:string;
  menus: Menu[];
  restaurants: Restaurant[];

  @Output()
  delete = new EventEmitter<Orders>();

  constructor(private restaurantService: RestaurantService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.restaurantService.getRestaurants().subscribe(
      (rest: Restaurant[]) => {
        this.restaurants = rest;
        this.restName = this.restaurants.filter((rest) => rest.id == this.order.rest_id)[0].name;
      },
      (err) => console.log(err),
    );
    this.restaurantService.getMenusById(this.order.rest_id).subscribe(
      (menus: Menu[]) => {
        this.menus = menus;
        this.menu = this.menus.filter((menu) => (menu.rest_id == this.order.rest_id) && (menu.id == this.order.menu_id))[0];
      },
      (err) => console.log(err),
    );

  }

  async deletOrder(){
    await this.restaurantService.deleteOrder(this.order).subscribe();
    this.toastr.error('Item deleted!');
    this.delete.emit(this.order);
    
  }

  confirmOrder() {
    this.toastr.success("Confirmed Successully");
  }

}
