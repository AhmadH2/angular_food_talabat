import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
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

  @Output()
  delete = new EventEmitter<Menu>();

  @Output()
  edit = new EventEmitter<Menu>();

  isAdmin:boolean;

  restName:string;

  constructor(private restaurantService: RestaurantService, private modalService: NgbModal,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    for (let i = 0; i < this.menu.rating; i++) {
      this.rating.push(i);
    }

    // this.isOrdered = this.restaurantService.isOrdered(this.menu);
    this.restName = this.restaurantService.getRestName(this.menu.rest_id);
    this.isAdmin = this.restaurantService.isAdmin;
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
    this.menu.rating = rating;
    this.rating = [];
    for(let i=0; i<rating; i++) {
      this.rating.push(i);
    }
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

  order(quantity:number) {
    if(quantity > 0 && quantity < 300) {
      this.restaurantService.orderItem(this.menu, quantity);
      this.toastr.success("item added to orders list!");
    }
    this.modalService.dismissAll();
    
  }

  deleteItem() {
    this.restaurantService.deleteMenu(this.menu);
    this.delete.emit(this.menu);
    this.toastr.error('Menu deleted!');
  }

  editMenu(value) {
    this.edit.emit(this.menu)
  }
  confirmOrder() {
    this.toastr.success("Confirmed Successully");
  }

}
