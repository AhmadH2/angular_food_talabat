import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Menu } from './menu';
import { Restaurant } from './restaurant';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private restaurants: Restaurant[] = [
    new Restaurant(2, 'Ahmad', 'Yatta', 4, 5,
      'https://media-cdn.tripadvisor.com/media/photo-s/11/9e/75/70/sala-a-restaurant.jpg'),
    new Restaurant(1, 'Horyzat', 'Hebron', 4, 6,
      'https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png'),
  ];
  private menus: Menu[] = [
    new Menu(0, 1, 'Menu Item', 'goood goood', 45.99, 
    'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=700%2C636'),
    new Menu(1, 1, 'Falafel', 'goood goood', 45.99,
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=700%2C636'),
  ];

  isAdmin = true;

  private orderedItems:Menu[] = [];
  constructor() { }

  getRestaurants(): Restaurant[] {
    return this.restaurants.sort((a,b) => (a.name > b.name)?1:-1);
  }

  getOrdered(): Menu[] {
    return this.orderedItems;
  }

  isOrdered(menu: Menu): boolean {
    if(this.orderedItems.indexOf(menu) != -1) {
      return true;
    }
    else {
      return false;
    }
  }

  orderItem(item:Menu) {
    if (this.isOrdered(item)) {
      for (let i of this.orderedItems)
        if (i.id == item.id)
          item.quantity++;
    }
    else {
      item.quantity = 1;
      this.orderedItems.push(item);
    }
      
  }

  deleteOrder(item:Menu) {
    let index = this.orderedItems.indexOf(item);
    item.quantity--;
    if(item.quantity == 0)
      this.orderedItems.splice(index, 1);
  }

  getRestName(rest_id:number):string{
    return this.restaurants.filter((rest) => rest.id == rest_id)[0].name;
  }

  getMenusById(rest_id:number):Menu[]{

    return this.menus.filter((menu) => menu.rest_id == rest_id).sort((a, b) => (a.name > b.name) ? 1 : -1);
  }

  editMenu(menu: Menu) {
    let index = this.menus.indexOf(menu);
    this.menus[index] = menu;
  }



  deleteMenu(menu: Menu) {
    let index = this.menus.indexOf(menu);
    this.menus.splice(index, 1);
  }


  getMenus(): Menu[] {
    return this.menus.sort((a, b) => (a.name < b.name)?1:-1);
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

  editRestaurant(restaurant:Restaurant) {
    let index = this.restaurants.indexOf(restaurant);
    this.restaurants[index] = restaurant;
  }

  

  
  filterRest(method:string):Restaurant[] {
    method = method.toLowerCase();
    if(method == 'rating') {
      return this.restaurants.sort((a, b) => (a.rating < b.rating) ? 1 : -1);
    }
    if (method == 'city') {
      return this.restaurants.sort((a, b) => (a.city > b.city) ? 1 : -1);
    
    }
    else {
      return this.restaurants.sort((a, b) => (a.name > b.name) ? 1 : -1);
    }
  }

  filterMenus(method:string):Menu[] {
    method = method.toLowerCase();
    if (method == 'rating') {
      return this.menus.sort((a, b) => (a.rating < b.rating) ? 1 : -1);
    }
    else {
      return this.menus.sort((a, b) => (a.name > b.name) ? 1 : -1);
    }

  }
    
}
