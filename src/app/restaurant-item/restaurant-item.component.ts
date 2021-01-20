import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Restaurant } from '../models/restaurant';
import { RestaurantService } from '../services/restaurant.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { RestaurantRating } from '../models/restaurant-rating';
import { element } from 'protractor';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-restaurant-item',
  templateUrl: './restaurant-item.component.html',
  styleUrls: ['./restaurant-item.component.css']
})
export class RestaurantItemComponent implements OnInit {

  @Input()
  restaurant: Restaurant;
  rating: number[] = [];
  restRatings: RestaurantRating[];

  closeResult: string;
  isAdmin:boolean;
  responseText = '';
  
  @Output()
  delete = new EventEmitter<any>();

  constructor(public restaurantService: RestaurantService, private modalService: NgbModal,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.restaurantService.getRatingsByRest_Id(this.restaurant.id).subscribe(
      (ratings:RestaurantRating[]) => {
        this.restRatings = ratings;
        let rat = 0;
        for (let i = 0; i < this.restRatings.length; i++) {
          console.log("rating is;  : " + this.restRatings[i].rating);
          rat = Math.round(rat) + Math.round(this.restRatings[i].rating);
        }
        rat = rat / this.restRatings.length;
        this.rating = [];
        for (let i = 0; i < rat; i++) {
          this.rating.push(i);
        }
      },
      (err) => console.log(err) 
    );

    this.isAdmin = this.authService.isAdmin();

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
    let rate = new RestaurantRating('', this.restaurant.id, this.restaurantService.customer_id,
     rating, Date.now().toString());

    this.restaurantService.addRating(rate).subscribe();


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
