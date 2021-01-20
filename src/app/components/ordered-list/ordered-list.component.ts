import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Menu } from '../../models/menu';
import { RestaurantService } from '../../services/restaurant.service';
import { Location } from '@angular/common';
import { Orders } from '../../models/orders';
import { RestaurantRating } from '../../models/restaurant-rating';
import { Restaurant } from '../../models/restaurant';

@Component({
  selector: 'app-ordered-list',
  templateUrl: './ordered-list.component.html',
  styleUrls: ['./ordered-list.component.css']
})
export class OrderedListComponent implements OnInit {

  orders: Orders[] = [];
  restaurants: Restaurant[] = [];
  menus: Menu[] = [];
  constructor(private restaurantService: RestaurantService, private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit(): void {
    this.restaurantService.getOrdersByCustomer(localStorage.getItem('customer_id')).subscribe(
      (ord:Orders[]) => {this.orders = ord;},
      (err) => console.log(err)
    );
    this.restaurantService.getRestaurants().subscribe(
      (rest: Restaurant[]) => this.restaurants = rest,
      (err) => console.log(err)
    );
    this.restaurantService.getMenus().subscribe(
      (menus:Menu[]) => this.menus = menus,
      (err) => console.log(err)
    )
    
  }

  goBack() {
    this.location.back();
  }

  delete(order:Orders) {
    let index = this.orders.indexOf(order);
    this.orders.splice(index, 1);
  }

  getMenuOfOrder(order):Menu {
    return this.menus.filter((menu) => (menu.rest_id == order.rest_id) && (menu.id == order.menu_id))[0];
  }

  calcPrice():number {
    let total = 0;
    this.orders.forEach(
      order => total += this.getMenuOfOrder(order).price * order.quantity);
    console.log(total);
    return total;
  }

}
