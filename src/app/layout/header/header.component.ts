import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/login.service';
import { getWithExpiry } from '../../shared/localstrorage';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  collapsed = true;
  token = '';
  logoutFlag = false;
  loginFlag = false;
  authFlag :string='';

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.token = getWithExpiry('AuthToken');

    // if (this.token) {
    //   this.logoutFlag = true;
    //   this.loginFlag = false;
    // } else {
    //   this.logoutFlag = false;
    //   this.loginFlag = true;
    // }

    this.authService.loginFlag.subscribe(
      (value: any) => {
        this.authFlag = value;
        this.loginFlag = true;
        console.log('flag',this.authFlag);
      });
  }

  onLogin() {
    // this.logoutFlag = true;
    // this.loginFlag = false;

    this.initForm();
    this.router.navigate(['/login']);
  }

  onLogout() {
    localStorage.removeItem('userData');
    localStorage.removeItem('AuthToken');
    localStorage.removeItem('loginUserId');
    this.authService.loginFlag.next('');
    this.loginFlag = false;
    // this.logoutFlag = false;
    // this.loginFlag = true;
    this.router.navigate(['/login']);
  }

  onSignin() {
    // this.logoutFlag = true;
    // this.loginFlag = false;
    this.initForm();
    this.router.navigate(['/signup']);
  }
}
