import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Restaurant } from '../restaurant';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-edit-restaurant',
  templateUrl: './edit-restaurant.component.html',
  styleUrls: ['./edit-restaurant.component.css']
})

export class EditRestaurantComponent implements OnInit {

  @Input() restaurant: Restaurant;
  cities: string[] = ['Yatta', 'Hebron', 'Dora'];
  model:Restaurant;
  
  constructor(private restaurantService:RestaurantService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.model = Object.assign({},this.restaurant);
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }




  onSubmit() {

    
    this.restaurant.name = this.model.name;
    this.restaurant.city = this.model.city;
    this.restaurant.street = this.model.street;
    this.restaurant.lat = this.model.lat;
    this.restaurant.lng = this.model.lng;
    this.restaurant.phone = this.model.phone;
    this.modalService.dismissAll();
    this.restaurant.image=this.model.image;

  }

  save() {

    this.restaurant.name = this.model.name;
    this.restaurant.city = this.model.city;
    this.restaurant.street = this.model.street;
    this.restaurant.lat = this.model.lat;
    this.restaurant.lng = this.model.lng;
    this.restaurant.phone = this.model.phone;
    this.modalService.dismissAll();
    this.restaurant.image = this.model.image;
    
    this.modalService.dismissAll();
  }



}