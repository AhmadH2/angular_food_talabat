import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Menu } from '../menu';
import { Orders } from '../orders';
import { RestaurantService } from '../restaurant.service';
import {Location} from '@angular/common'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ordered-item',
  templateUrl: './ordered-item.component.html',
  styleUrls: ['./ordered-item.component.css']
})
export class OrderedItemComponent implements OnInit {

  @Input()
  order: Orders;
  menu:Menu;
  restName:string;

  @Output()
  delete = new EventEmitter<Orders>();

  constructor(private restaurantServise: RestaurantService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.restName = this.restaurantServise.getRestName(this.order.rest_id);
    this.menu = this.restaurantServise.getMenuItem(this.order.rest_id, this.order.menu_id);
  }

  deletOrder(){
    this.order.quantity--;
    this.delete.emit(this.order);
  }

  confirmOrder() {
    this.toastr.success("Confirmed Successully");
  }

}
