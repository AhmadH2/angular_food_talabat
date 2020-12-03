import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Menu } from '../menu';
import { RestaurantService } from '../restaurant.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-ordered-list',
  templateUrl: './ordered-list.component.html',
  styleUrls: ['./ordered-list.component.css']
})
export class OrderedListComponent implements OnInit {

  orders: Menu[];
  constructor(private restaurantService: RestaurantService, private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit(): void {
    this.orders = this.restaurantService.getOrdered();
  }

  goBack() {
    this.location.back();
  }

  calcPrice():number {
    let total = 0;
    this.orders.forEach(order => total +=order.price);
    console.log(total);
    return total;
  }
}
