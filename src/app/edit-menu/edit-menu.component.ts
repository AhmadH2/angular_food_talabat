import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { RestaurantService } from 'src/app/services/restaurant.service';
import { Menu } from '../menu';
import { Restaurant } from '../restaurant';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-edit-menu',
  templateUrl: './edit-menu.component.html',
  styleUrls: ['./edit-menu.component.css']
})
export class EditMenuComponent implements OnInit {
  // @Output() editMenu: EventEmitter<any> = new EventEmitter();
  @Input() menu: Menu;
  rests: Restaurant[] = this.res.getRestaurants();

  model:Menu = new Menu(0, 0, '', '', 0, '', 9);


  constructor(private modalService: NgbModal, private res: RestaurantService) { }

  ngOnInit(): void {
    this.model.id = this.menu.id;
    this.model.name = this.menu.name;
    this.model.descr = this.menu.descr;
    this.model.price = this.menu.price;
    this.model.image = this.menu.image;
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  

  onSubmit() {
    this.menu.id = this.model.id;
    this.menu.name = this.model.name;
    this.menu.descr = this.model.descr;
    this.menu.price = this.model.price;

    this.menu.rest_id = this.model.rest_id;
    this.menu.image = this.model.image;

    this.res.editMenu(this.menu);
    this.modalService.dismissAll();
    
  }
}