import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Menu } from '../../models/menu';
import { Orders } from '../../models/orders';
import { Restaurant } from '../../models/restaurant';
import { RestaurantService } from '../../services/restaurant.service';

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

  @Output()
  delete = new EventEmitter<Menu>();

  @Output()
  edit = new EventEmitter<Menu>();

  isAdmin:boolean;

  constructor(private restaurantService: RestaurantService, private modalService: NgbModal,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    for (let i = 0; i < this.menu.rating; i++) {
      this.rating.push(i);
    }

    this.isAdmin = localStorage.getItem('isAdmin') == 'true';
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
    // this.restaurantService.rateMenu(rating, this.menu);
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
      let order = new Orders('0', this.menu.rest_id, this.menu.id,
        localStorage.getItem("customer_id"), quantity, '10/10/2022');
      this.restaurantService.orderItem(order).subscribe();
      this.toastr.success("item added to orders list!");
    }
    this.modalService.dismissAll();
    
  }

  deleteItem() {
    this.restaurantService.deleteMenu(this.menu).subscribe();
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
