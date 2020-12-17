import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantService } from '../restaurant.service';



@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})

export class LoginComponent implements OnInit {

  isAdmin:boolean;
  body:any;
  message:string ='init';

  constructor(private restaurantService: RestaurantService, private router: Router) { }

  ngOnInit() {
    this.isAdmin = this.restaurantService.isAdmin;
  }


  onSubmit() {
    // this.restaurantService.login(f.value.username, f.value.password).subscribe(
    //   response => {
    //     this.body = response
    //     if (this.body.name) {
    //       localStorage.setItem("token", this.body.token)
    //       this.router.navigate(['/students'])
    //     }
    //     else {
    //       this.message = "Access Denide, Invalid username or password"
    //     }

    //   }
    // )
  }

  login(username:string, password:string) {
    this.restaurantService.login(username, password).subscribe(
      response => {
        console.log('this is the response' + response);
        this.body = response
        if (this.body.username) {
          localStorage.setItem("token", this.body.token)
          console.log('tokents ' + localStorage.getItem('token'));
          this.restaurantService.isAdmin = this.body.isAdmin;
          localStorage.setItem('isAdmin', this.body.isAdmin);
          localStorage.setItem('customer_id', this.body._id);
          console.log('customer id' + localStorage.getItem('customer_id'));
          this.router.navigate(['/restaurants'])
        }
        else {
          this.message = "Access Denide, Invalid username or password";
          localStorage.setItem('token', 'invalid token');
        }

      }
    )

    // let login = false;

    // let cust = this.restaurantService.getCustomers().filter((custmer) => custmer.first_name == username);
    
    // login = cust.length > 0;
    // if (login || true) {
    //   if (true || this.restaurantService.getAdminList().filter((admin)=>admin==username).length > 0) {
    //     this.restaurantService.isAdmin = true;
    //     this.isAdmin = true;
    //   }
    //   this.loggedIn = true;
    //   this.restaurantService.loggedIn = true;
    //   this.restaurantService.customer_id = cust[0].id;
    // }

    

  }


  
}