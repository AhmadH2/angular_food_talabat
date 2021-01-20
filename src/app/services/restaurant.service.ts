import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Customer } from '../customer';
import { Menu } from '../menu';
import { Orders } from '../orders';
import { Restaurant } from '../restaurant';
import { RestaurantRating } from '../restaurant-rating';
import { Student } from '../student';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private restaurants: Restaurant[];
  private menus: Menu[];


  //fetch them from server by custom id
  private ordersList: Orders[] = [
    new Orders('k', 'k', 'k', 'k', 2, '2020/3/3'),
  ];

  private ratingList: RestaurantRating[] = [];


  customer_id = localStorage.getItem('customer_id');
  // url = 'https://talabat-backend.herokuapp.com';
  url = 'http://localhost:9000'

  private adminList = ['Ahmad'];

  constructor(private http: HttpClient, private router:Router) { }

  getStudent(): Observable<Object> {
    return this.http.get(this.url);
  }

  getRestaurants(): Observable<Object> {

    const httpOptions = {
      headers: new HttpHeaders({
        "Authorization": localStorage.getItem('token')
      })
    }
    return this.http.get(this.url + '/restaurants', httpOptions);
  }

  getMenus(): Observable<Object> {
    return this.http.get(this.url + '/menus');
  }

  getMenusById(rest_id: string): Observable<Object> {
    return this.http.get(this.url + '/menus/' + rest_id);
  }

  addRestaurant(restaurant: Restaurant): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem('token')
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
    return this.http.post(this.url + '/restaurants', body, httpOptions);
    // this.restaurants.push(restaurant);
  }

  addMenu(menu: Menu): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem('token')
      })
    }

    let body = {
      "name": menu.name,
      "rest_id": menu.rest_id,
      "descr": menu.descr,
      "price": menu.price,
      "image": menu.image
    }
    return this.http.post(this.url + '/menus', body, httpOptions);
  }

  deleteMenu(menu: Menu): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Authorization": localStorage.getItem('token')
      })
    };
    return this.http.delete(this.url + "/menus/" + menu.id);

  }

  deleteRestaurant(restaurant: Restaurant) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Authorization": localStorage.getItem('token')
      })
    };
    return this.http.delete(this.url + "/restaurants/" + restaurant.id);
  }

  editRestaurant(restaurant: Restaurant): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem('token')
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
    return this.http.put(this.url + '/restaurants/' + restaurant.id, body, httpOptions);
  }

  editMenu(menu: Menu) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem('token')
      })
    }
    let body = {
      "rest_id": menu.rest_id,
      "name": menu.name,
      "descr": menu.descr,
      "price": menu.price,
      "image": menu.image
    }
    return this.http.put(this.url + '/menus/' + menu.id, body, httpOptions);
  }

  getOrdersByCustomer(customer_id: string): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Authorization": localStorage.getItem('token')
      })
    }
    return this.http.get(this.url + '/orders/byCustomer/' + customer_id, httpOptions);
  }

  orderItem(order: Orders): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }

    let body = {
      "rest_id": order.rest_id,
      "menu_id": order.menu_id,
      "customer_id": order.customer_id,
      "quantity": order.quantity,
      "date_created": order.date_created,
    }
    return this.http.post(this.url + '/orders/', body, httpOptions);
  }

  deleteOrder(order: Orders): Observable<Object> {
    return this.http.delete(this.url + '/orders/' + order.id);
  }

  getOrdersByRestId(rest_id: string): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Authorization": localStorage.getItem('token')
      })
    }
    return this.http.get(this.url + '/orders/' + rest_id, httpOptions);
  }

  getRatingsByRest_Id(rest_id: string): Observable<Object> {
    return this.http.get(this.url + '/restRatig/' + rest_id);
    // return this.ratingList.filter((element) => element.rest_id == rest_id);
  }

  addRating(rate: RestaurantRating): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }

    let body = {
      "rest_id": rate.rest_id,
      "customer_id": rate.customer_id,
      "rating": rate.rating,
      "date_rated": rate.date_rated,
    }
    return this.http.post(this.url + '/restRatig/', body, httpOptions);
    // this.ratingList.push(rate);
  }






  // getLogInf(){
  //   return this.loggedIn;
  // }


  getAdminList(): string[] {
    return this.adminList;
  }



  // getRatings(): RestaurantRating[] {
  //   return this.ratingList;
  // }






  // getOrders(): Orders[] {
  //   return this.ordersList;
  // }


  // isOrdered(menu: Menu): boolean {

  //   for (let i = 0; i < this.ordersList.length; i++) {
  //     if ((menu.id == this.ordersList[i].menu_id) && (menu.rest_id == this.ordersList[i].rest_id)) {
  //       return true;
  //     }
  //   }
  //   return false;

  // }



  // getRestName(rest_id:string):string{
  //   return this.restaurants.filter((rest) => rest.id == rest_id)[0].name;
  // }


  // // getMenus(): Menu[] {
  // //   return this.menus.sort((a, b) => (a.name < b.name)?1:-1);
  // // }


  // rateRestaurant(rating:number, restaurant:Restaurant) {
  //   let index = this.restaurants.indexOf(restaurant);
  //   this.restaurants[index].rating = rating;
  //   console.log(this.restaurants[index].rating);
  // }

  // rateMenu(rating:number, menu:Menu) {
  //   let index = this.menus.indexOf(menu);
  //   this.menus[index].rating = rating;
  //   console.log(this.menus[index].rating);
  // }



  // filterRest(method:string):Restaurant[] {
  //   method = method.toLowerCase();
  //   if(method == 'rating') {
  //     return this.restaurants.sort((a, b) => (a.rating < b.rating) ? 1 : -1);
  //   }
  //   if (method == 'city') {
  //     return this.restaurants.sort((a, b) => (a.city > b.city) ? 1 : -1);

  //   }
  //   else {
  //     return this.restaurants.sort((a, b) => (a.name > b.name) ? 1 : -1);
  //   }
  // }

  // filterMenus(method:string):Menu[] {
  //   method = method.toLowerCase();
  //   if (method == 'rating') {
  //     return this.menus.sort((a, b) => (a.rating < b.rating) ? 1 : -1);
  //   }
  //   else {
  //     return this.menus.sort((a, b) => (a.name > b.name) ? 1 : -1);
  //   }

  // }

  // getMenuItem(rest_id: string, menu_id: string):Menu {
  //   return this.menus.filter((menu) => (menu.rest_id==rest_id) && (menu.id==menu_id))[0];
  // }

  // getMenuOfOrder(order:Orders) {
  //   return this.menus.filter((menu) => (menu.rest_id == order.rest_id) && (menu.id == order.menu_id))[0];
  // }

}