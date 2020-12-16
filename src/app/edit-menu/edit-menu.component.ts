import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Menu } from '../menu';
import { Restaurant } from '../restaurant';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-edit-menu',
  templateUrl: './edit-menu.component.html',
  styleUrls: ['./edit-menu.component.css']
})
export class EditMenuComponent implements OnInit {
  @Input() menu: Menu;
  restaurants: Restaurant[];

  model: Menu;

  @Output()
  edit = new EventEmitter<Menu>();

  constructor(private modalService: NgbModal, private restaurantService: RestaurantService) { }

  ngOnInit(): void {
    this.restaurantService.getRestaurants().subscribe(
      (rest: Restaurant[]) => this.restaurants = rest,
    );
    this.model = Object.assign({}, this.menu);

  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  onSubmit() {
    console.log('hiiii from onsubmit');

    this.restaurantService.editMenu(this.model).subscribe();
    this.menu.name = this.model.name;
    this.menu.descr = this.model.descr;
    this.menu.price = this.model.price;
    this.menu.rest_id = this.model.rest_id;
    this.menu.image = this.model.image;
    this.modalService.dismissAll();
    
  }

}