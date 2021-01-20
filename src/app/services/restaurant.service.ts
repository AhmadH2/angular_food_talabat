import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { Menu } from '../models/menu';
import { Orders } from '../models/orders';
import { Restaurant } from '../models/restaurant';
import { RestaurantRating } from '../models/restaurant-rating';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  customer_id = localStorage.getItem('customer_id');
  
  url = this.authService.getUrl();


  constructor(private http: HttpClient, private authService: AuthService) { }

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
  }

}