import { Component } from '@angular/core';
import { RestaurantService } from './restaurant.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isAdmin:boolean;

  constructor(private restaurantService:RestaurantService) { 
    this.isAdmin = this.restaurantService.isAdmin;
  };

  ngOnInit(): void { };
  title = 'Talabat';
}
