import { Injectable } from '@angular/core';
import { Menu } from './menu';
import { Restaurant } from './restaurant';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private restaurants: Restaurant[] = [
    new Restaurant(0, 'Ahmad', 'Yatta', 'Yatta', ' Absar', '23', '32',
      'https://media-cdn.tripadvisor.com/media/photo-s/11/9e/75/70/sala-a-restaurant.jpg', 4),
    new Restaurant(0, 'Ahmad', 'Yatta', 'Yatta', ' Absar', '23', '32',
      'https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png', 4),
  ];
  private menues: Menu[] = [];

  constructor() { }

  getRestaurants(): Restaurant[] {
    return this.restaurants;
  }

  getMenus(): Menu[] {
    return this.menues;
  }

  addRestaurant(restaurant: Restaurant) {
    this.restaurants.push(restaurant);
  }

  addMenu(menu: Menu) {
    this.menues.push(menu);
  }

}
