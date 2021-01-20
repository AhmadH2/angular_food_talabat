import { ThrowStmt } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Menu } from '../models/menu';
import { RestaurantService } from '../services/restaurant.service';
import { Location } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-menus-list',
  templateUrl: './menus-list.component.html',
  styleUrls: ['./menus-list.component.css']
})
export class MenusListComponent implements OnInit {
  menus: Menu[] = [];
  id:string;
  isAdmin:boolean;

  constructor(private restaurantService: RestaurantService, 
    private route: ActivatedRoute, private location: Location, private authService: AuthService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (d) => {this.id = d['id']; console.log(this.id)},
    );
  
    this.restaurantService.getMenusById(this.id).subscribe(
      (men:Menu[]) => this.menus = men.sort((a,b)=> (a.name > b.name)?1:-1),
      (err) => console.log(err)
    );
    this.isAdmin = this.authService.isAdmin();
  }

  goBack() {
    this.location.back();
  }

  filter(method: string): Menu[] {
    method = method.toLowerCase();
    if (method == 'rating') {
      return this.menus.sort((a, b) => (a.rating < b.rating) ? 1 : -1);
    }
    else {
      return this.menus.sort((a, b) => (a.name > b.name) ? 1 : -1);
    }

  }

  delete(value) {
    let index = this.menus.indexOf(value);
    this.menus.splice(index, 1);
  }

  editMenu(value) {
    const id = this.route.snapshot.paramMap.get('rest_id');
    this.restaurantService.getMenusById(id).subscribe(
      (men: Menu[]) => this.menus = men,
      (err) => console.log(err)
    );
  }
}
