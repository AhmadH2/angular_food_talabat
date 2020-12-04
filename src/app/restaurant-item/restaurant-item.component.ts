import { Component, Input, OnInit } from '@angular/core';
import { Restaurant } from '../restaurant';
import { RestaurantService } from '../restaurant.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-restaurant-item',
  templateUrl: './restaurant-item.component.html',
  styleUrls: ['./restaurant-item.component.css']
})
export class RestaurantItemComponent implements OnInit {

  @Input()
  restaurant: Restaurant;
  rating: number[] = [];

  closeResult: string;
  isAdmin:boolean


  constructor(public restaurantService: RestaurantService, private modalService: NgbModal) { }

  ngOnInit(): void {
    for(let i=0; i<this.restaurant.rating; i++) {
      this.rating.push(i);
    }
    this.isAdmin = this.restaurantService.isAdmin;
  }

  deleteRest() {
    this.restaurantService.deleteRestaurant(this.restaurant);
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  rate(rating:number) {
    this.restaurantService.rateRestaurant(rating, this.restaurant);
    this.rating = [];
    for (let i = 0; i < rating; i++) {
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



}
