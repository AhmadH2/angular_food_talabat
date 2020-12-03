import { ThrowStmt } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Menu } from '../menu';
import { RestaurantService } from '../restaurant.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-menus-list',
  templateUrl: './menus-list.component.html',
  styleUrls: ['./menus-list.component.css']
})
export class MenusListComponent implements OnInit {
  menus: Menu[];

  constructor(private restaurantService: RestaurantService, 
    private route: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('rest_id');
    console.log('idd' + id);
    // this.heroService.getHero(id)
      // .subscribe(hero => this.hero = hero);
    this.menus = this.restaurantService.getMenusById(id);
  }

  goBack() {
    this.location.back();
  }

}
