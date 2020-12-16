import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Menu } from '../menu';
import { RestaurantService } from '../restaurant.service';
import { Location } from '@angular/common';
import { Orders } from '../orders';
import { RestaurantRating } from '../restaurant-rating';
import { Restaurant } from '../restaurant';

@Component({
  selector: 'app-ordered-list',
  templateUrl: './ordered-list.component.html',
  styleUrls: ['./ordered-list.component.css']
})
export class OrderedListComponent implements OnInit {

  orders: Orders[];
  restaurants: Restaurant[];
  menus: Menu[];
  constructor(private restaurantService: RestaurantService, private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit(): void {
    // this.orders = this.restaurantService.getOrdersByRestId('');
    this.restaurantService.getOrdersByCustomer(this.restaurantService.customer_id).subscribe(
      (ord:Orders[]) => {this.orders = ord;},
      (err) => console.log(err)
    );
    this.restaurantService.getRestaurants().subscribe(
      (rest: Restaurant[]) => this.restaurants = rest,
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
    // this.restaurantService.getOrdersByCustomer(this.restaurantService.customer_id).subscribe(
    //   (orders: Orders[]) => this.orders = orders,
    // );
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

  // filter(value) {
  //   this.orders = this.restaurantService.getOrdersByRestId(value);
  // }
}
