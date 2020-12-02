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
      'https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png', 5),
  ];
  private menus: Menu[] = [
    new Menu(0, 'd', 'Menu Item', 'goood goood', 45.99, 
    'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=700%2C636', 7),
  ];

  constructor() { }

  getRestaurants(): Restaurant[] {
    return this.restaurants;
  }

  getMenus(): Menu[] {
    return this.menus;
  }

  addRestaurant(restaurant: Restaurant) {
    this.restaurants.push(restaurant);
  }

  addMenu(menu: Menu) {
    this.menus.push(menu);
  }

  deleteRestaurant(restaurant:Restaurant) {
    let index = this.restaurants.indexOf(restaurant);
    this.restaurants.splice(index, 1);
  }

  deleteMenu(menu:Menu) {
    let index = this.menus.indexOf(menu);
    this.menus.splice(index, 1);
  }

  rateRestaurant(rating:number, restaurant:Restaurant) {
    let index = this.restaurants.indexOf(restaurant);
    this.restaurants[index].rating = rating;
    console.log(this.restaurants[index].rating);
  }

  rateMenu(rating:number, menu:Menu) {
    let index = this.menus.indexOf(menu);
    this.menus[index].rating = rating;
    console.log(this.menus[index].rating);
  }

}
