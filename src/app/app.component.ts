import { Component } from '@angular/core';
import { RestaurantService } from './restaurant.service';
import { Student } from './student';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  arr: any;
  student:Student;

  constructor(private restaurantService:RestaurantService) { 
    
  };

  ngOnInit(): void {  
    this.arr = this.restaurantService.getStudent().subscribe(
      (a) => this.student = a,
    ) 
  };
  title = 'Talabat';
}
