import { Component, Input, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Menu } from '../menu';
import { Restaurant } from '../restaurant';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent implements OnInit {

  @Input()
  menu: Menu;
  rating: number[] = [];

  closeResult: string;

  @Input()
  isOrdered:boolean;

  restName:string;

  constructor(public restaurantService: RestaurantService, private modalService: NgbModal) { }

  ngOnInit(): void {
    for (let i = 0; i < this.menu.rating; i++) {
      this.rating.push(i);
    }

    // this.isOrdered = this.restaurantService.isOrdered(this.menu);
    this.restName = this.restaurantService.getRestName(this.menu.rest_id);
  }

  deleteMenu() {
    this.restaurantService.deleteMenu(this.menu);
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  rate(rating: number) {
    this.restaurantService.rateMenu(rating, this.menu);
    this.modalService.dismissAll();
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  order() {
    this.restaurantService.orderItem(this.menu);
  }

  deletOrder() {
    this.restaurantService.deleteOrder(this.menu);
  }

}
