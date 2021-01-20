import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RestaurantService } from '../../services/restaurant.service';



@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})

export class LoginComponent implements OnInit {

  isAdmin:boolean;
  body:any;
  errMessage:string ='';
  usern: string = '';
  pswrd: string = '';
  loginForm: any;

  constructor(private restaurantService: RestaurantService, private router: Router,
    private authService:AuthService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
    this.isAdmin = this.authService.isAdmin();
  }

  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }


  login(username:string, password:string) {
    this.authService.login(username, password).subscribe(
      response => {
        this.body = response;
        if (this.body.username) {
          localStorage.setItem("token", this.body.token)
          localStorage.setItem('isAdmin', this.body.isAdmin);
          localStorage.setItem('customer_id', this.body._id);
          localStorage.setItem('isLoggedin', 'true');
          this.errMessage = '';
          this.router.navigate(['/restaurants']).then(() => window.location.reload());
        }
        else {
          this.errMessage = "Access Denide, Invalid username or password";
          localStorage.setItem('token', 'invalid token');
          localStorage.setItem('isLoggedin', 'false');
          localStorage.setItem('isAdmin', 'false');
        }

      }
    )
    

  }


  
}