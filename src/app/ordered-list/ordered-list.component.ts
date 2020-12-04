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
  constructor(private restaurantService: RestaurantService, private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit(): void {
    this.orders = this.restaurantService.getOrders();
    this.restaurants = this.restaurantService.getRestaurants();
  }

  goBack() {
    this.location.back();
  }

  delete(value:Orders) {
    this.restaurantService.deleteOrder(value);
    let index = this.orders.indexOf(value);
    this.orders.splice(index, 1);
  }

  calcPrice():number {
    let total = 0;
    this.orders.forEach(order => total += this.restaurantService.getMenuOfOrder(order).price * order.quantity);
    console.log(total);
    return total;
  }

  filter(value) {
    this.orders = this.restaurantService.getOrdersByRestId(value);
  }
}
