import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Restaurant } from '../restaurant';
import { RestaurantService } from '../restaurant.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { RestaurantRating } from '../restaurant-rating';
import { element } from 'protractor';

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
  isAdmin:boolean;
  responseText = '';
  
  @Output()
  delete = new EventEmitter<any>();

  constructor(public restaurantService: RestaurantService, private modalService: NgbModal) { }

  ngOnInit(): void {
    let rat = 0;
    let restsRating = this.restaurantService.getRatingsById(this.restaurant.id);
    for (let i = 0; i < restsRating.length; i++) {
      rat = Math.round(rat) + Math.round(restsRating[i].rating);
    }
    rat = rat / restsRating.length;
    this.rating = [];
    for (let i = 0; i < rat; i++) {
      this.rating.push(i);
    }
    this.isAdmin = this.restaurantService.isAdmin;
  }

  async deleteRest() {
    await this.restaurantService.deleteRestaurant(this.restaurant).subscribe();
    this.delete.emit()

  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  rate(rating:number) {
    let rate = new RestaurantRating(this.restaurantService.getRatings().length, 
    this.restaurant.id, 0, rating, 'today');

    this.restaurantService.addRating(rate);

    let rat:number = 0.0;
    let restsRating = this.restaurantService.getRatingsById(this.restaurant.id);

    for(let i=0; i<restsRating.length; i++) {
      
      rat = Math.round(rat) + Math.round(restsRating[i].rating);
    }

    rat = rat / restsRating.length;
    this.rating = [];
    for (let i = 0; i < rat; i++) {
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
