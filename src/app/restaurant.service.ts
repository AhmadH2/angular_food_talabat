import { Injectable } from '@angular/core';
import { Customer } from './customer';
import { Menu } from './menu';
import { Orders } from './orders';
import { Restaurant } from './restaurant';
import { RestaurantRating } from './restaurant-rating';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private restaurants: Restaurant[] = [
    new Restaurant(0, 'Ahmad', 'Yatta', 4, 5,
      'https://media-cdn.tripadvisor.com/media/photo-s/11/9e/75/70/sala-a-restaurant.jpg'),
    new Restaurant(1, 'Horyzat', 'Hebron', 4, 6,
      'https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png'),
  ];
  private menus: Menu[] = [
    new Menu(0, 1, 'Menu Item', 'goood goood', 45.99, 
    'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=700%2C636'),
    new Menu(1, 1, 'Falafel', 'goood goood', 15.99,
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=700%2C636'),
    new Menu(2, 2, 'Falafel', 'goood goood', 25.99,
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=700%2C636'),
  ];

  isAdmin = false;
  loggedIn = false;

  private ordersList:Orders[] = [];

  private ratingList:RestaurantRating[] = [];

  private customers = [
    new Customer(0, 'Ahmad', 'Horyzat', '999'),
    new Customer(1, 'Ali', 'Horyzat', '999'),
  ];

  private adminList= ['Ahmad'];

  getLogInf(){
    return this.loggedIn;
  }

  getCustomers(): Customer[] {
    return this.customers;
  }

  getAdminList():string[] {
    return this.adminList;
  }

  constructor() { }

  getRatings(): RestaurantRating[] {
    return this.ratingList;
  }

  getRatingsById(rest_id:number) {
    return this.ratingList.filter((element)=> element.rest_id==rest_id);
  }

  addRating(rate:RestaurantRating) {
    this.ratingList.push(rate);
  }

  getRestaurants(): Restaurant[] {
    return this.restaurants.sort((a,b) => (a.name > b.name)?1:-1);
  }

  getOrders(): Orders[] {
    return this.ordersList;
  }

  getOrdersByRestId(rest_id:number) {
    return this.ordersList.filter((order)=> order.rest_id == rest_id);
  }

  isOrdered(menu: Menu): boolean {

    for (let i = 0; i < this.ordersList.length; i++) {
      if ((menu.id == this.ordersList[i].menu_id) && (menu.rest_id == this.ordersList[i].rest_id)) {
        return true;
      }
    }
    return false;
    
  }

  orderItem(item:Menu, quamtity:number) {

    this.ordersList.push(new Orders(this.ordersList.length, item.rest_id, item.id, quamtity, 'today'));
  }

  deleteOrder(order:Orders) {
    let index = this.ordersList.indexOf(order);
    this.ordersList.splice(index, 1);
    
     
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

  getMenuItem(rest_id:number, menu_id:number):Menu {
    return this.menus.filter((menu) => (menu.rest_id==rest_id) && (menu.id==menu_id))[0];
  }

  getMenuOfOrder(order:Orders) {
    return this.menus.filter((menu) => (menu.rest_id == order.rest_id) && (menu.id == order.menu_id))[0];
  }
    
}
