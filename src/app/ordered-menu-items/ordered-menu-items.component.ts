import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestaurantService } from '../restaurant.service';
import {Location} from '@angular/common';
import { Orders } from '../orders';

@Component({
  selector: 'app-ordered-menu-items',
  templateUrl: './ordered-menu-items.component.html',
  styleUrls: ['./ordered-menu-items.component.css']
})
export class OrderedMenuItemsComponent implements OnInit {

  orders:Orders[];
  id:number;

  constructor(private restaurantService: RestaurantService,
    private route: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('rest_id');
    this.orders = this.restaurantService.getOrdersByRestId(this.id);
  }

  goBack() {
    this.location.back();
  }

}
