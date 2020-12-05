import { Component } from '@angular/core';
import { RestaurantService } from './restaurant.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {



  constructor(private restaurantService:RestaurantService) { 
    
  };

  ngOnInit(): void { 


    
  };
  title = 'Talabat';
}
