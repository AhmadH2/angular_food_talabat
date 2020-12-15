import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from './customer';
import { Menu } from './menu';
import { Orders } from './orders';
import { Restaurant } from './restaurant';
import { RestaurantRating } from './restaurant-rating';
import { Student } from './student';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private restaurants: Restaurant[];
  private menus: Menu[];

  isAdmin = false;
  loggedIn = false;


  //fetch them from server by custom id
  private ordersList:Orders[] = [
    new Orders('k', 'k', 'k', 'k', 2, '2020/3/3'),
  ];

  private ratingList:RestaurantRating[] = [];

  private customers = [
    new Customer('0', 'Ahmad', 'Horyzat', '999'),
    new Customer('1', 'Mohammad', 'Saleh', '999'),
    new Customer('2', 'Ali', 'Horyzat', '999'),
  ];

  customer_id = '-1';
  url = 'http://localhost:9000/students/5fd7d0d3f774a1230c6db5d1';

  private adminList= ['Ahmad'];

  constructor(private http: HttpClient,) { }

  getStudent():Observable<Object> {
    return this.http.get(this.url);
  }

  getRestaurants(): Observable<Object> {
    return this.http.get('http://localhost:9000/restaurants');
    // return this.restaurants.sort((a,b) => (a.name > b.name)?1:-1);
  }

  getMenusById(rest_id: string): Observable<Object> {
    // console.log('idddddddddd' + rest_id);
    let url = 'http://localhost:9000/menus/' + rest_id;
    console.log(url);
    return this.http.get('http://localhost:9000/menus/' + rest_id);
    // return this.menus.filter((menu) => menu.rest_id == rest_id).sort((a, b) => (a.name > b.name) ? 1 : -1);
  }

  addRestaurant(restaurant: Restaurant): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }
    let body = {
      "name": restaurant.name,
      "city": restaurant.city,
      "lat": restaurant.lat,
      "lng": restaurant.lng,
      "phone": restaurant.phone,
      "image": restaurant.image
    }
    return this.http.post('http://localhost:9000/restaurants', body, httpOptions);
    // this.restaurants.push(restaurant);
  }

  addMenu(menu: Menu):Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }

    let body = {
      "name": menu.name,
      "rest_id": menu.rest_id,
      "descr": menu.descr,
      "price": menu.price,
      "image": menu.image
    }
    return this.http.post('http://localhost:9000/menus', body, httpOptions);
    
  }

  deleteMenu(menu: Menu):Observable<Object> {
    console.log(menu.id);
    return this.http.delete("http://localhost:9000/menus/" + menu.id);
  }

  deleteRestaurant(restaurant: Restaurant) {
    return this.http.delete("http://localhost:9000/restaurants/" + restaurant._id);
  }

  editRestaurant(restaurant: Restaurant):Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }
    let body = {
      "name": restaurant.name,
      "city": restaurant.city,
      "lat": restaurant.lat,
      "lng": restaurant.lng,
      "phone": restaurant.phone,
      "image": restaurant.image
    }
    return this.http.put('http://localhost:9000/restaurants/' + restaurant._id, body, httpOptions);
  }

  editMenu(menu: Menu) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }

    let body = {
      "name": menu.name,
      "rest_id": menu.rest_id,
      "descr": menu.descr,
      "price": menu.price,
      "image": menu.image
    }
    return this.http.put('http://localhost:9000/menus/' + menu.id, body, httpOptions);
  }

  





  getLogInf(){
    return this.loggedIn;
  }

  getCustomers(): Customer[] {
    return this.customers;
  }

  getAdminList():string[] {
    return this.adminList;
  }

  

  getRatings(): RestaurantRating[] {
    return this.ratingList;
  }

  getRatingsById(rest_id:string) {
    return this.ratingList.filter((element)=> element.rest_id==rest_id);
  }

  addRating(rate:RestaurantRating) {
    this.ratingList.push(rate);
  }

  
  getOrders(): Orders[] {
    return this.ordersList;
  }

  getOrdersByRestId(rest_id:string) {
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

  orderItem(item:Menu, quantity:number) {

    this.ordersList.push(new Orders('k', item.rest_id, item.id,this.customer_id, quantity, 'today'));
  }

  deleteOrder(order:Orders) {
    let index = this.ordersList.indexOf(order);
    this.ordersList.splice(index, 1); 
  }

  getRestName(rest_id:string):string{
    return this.restaurants.filter((rest) => rest._id == rest_id)[0].name;
  }


  getMenus(): Menu[] {
    return this.menus.sort((a, b) => (a.name < b.name)?1:-1);
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

  getMenuItem(rest_id: string, menu_id: string):Menu {
    return this.menus.filter((menu) => (menu.rest_id==rest_id) && (menu.id==menu_id))[0];
  }

  getMenuOfOrder(order:Orders) {
    return this.menus.filter((menu) => (menu.rest_id == order.rest_id) && (menu.id == order.menu_id))[0];
  }
    
}
