import { HttpClient } from '@angular/common/http';
import {
  Component,
  OnInit,
  ElementRef,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from '../LoginModel';
import { respond } from '../respond';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { MyserviceService } from 'src/app/services/myservice.service';

const baseUrl = environment.baseUrl;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  data: LoginModel;
  check: boolean;
  altermessage: string;
  resp: respond = new respond();
  settoken: string;
  headername: string;
  constructor(
    private router: Router,
    private http: HttpClient,
    private elementRef: ElementRef,
    private cookieService: CookieService,
    private myservice: MyserviceService
  ) {}
  Onsubmit() {
    console.log('here at submit');
    this.data = {
      email: this.email,
      password: this.password,
    };

    console.log(this.data);
    this.http
      .post(`${baseUrl}/signin`, this.data, {
        withCredentials: true,
      })
      .subscribe(
        (res) => {
          {
            console.log(res);
            console.log(res['message']);
            if (res['message'] === 'loggin succesfully') {
              console.log('here at iff condition');
              console.log(res['token']);
              const dateNow = new Date();
              dateNow.setMinutes(dateNow.getMinutes() + 1);
              this.cookieService.set('Book', res['token'], dateNow);
              this.settoken = res['token'];
              this.login();
            } else {
              this.check = false;
              this.altermessage = res['message'];
            }
          }
        },
        (err) => {
          console.log(err);
          console.log(err['message']);
        }
      );
  }

  ngOnInit(): void {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor =
      '#141c2e';
  }
  register() {
    this.router.navigateByUrl('register');
  }
  login() {
    this.router.navigateByUrl('dashboard');
  }
}
