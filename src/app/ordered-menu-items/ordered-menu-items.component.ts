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
  id:string;

  constructor(private restaurantService: RestaurantService,
    private route: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('rest_id');
    this.restaurantService.getOrdersByRestId(this.id).subscribe(
      (orders:Orders[]) => this.orders = orders,
      (err) => console.log(err)
    );
  }

  goBack() {
    this.location.back();
  }

}
