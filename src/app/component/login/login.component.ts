import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getWithExpiry, setWithExpiry } from '../../shared/localstrorage';
import { SharedModule } from '../../shared/shared.module';
import { AuthService } from '../../services/login.service';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [SharedModule]
})
export class AuthComponent implements OnInit {
  authForm: FormGroup;
  token: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.authForm = new FormGroup({
      email: new FormControl('saakshishah123@gmail.com', [Validators.required, Validators.email]),
      password: new FormControl('Test@123', [Validators.required, Validators.minLength(6)])
    });
  }

  onSubmit() {
    if (this.authForm.valid) {
      this.authService.login(this.authForm.value).subscribe(
        (result: any) => {
          if (result.token) {
            this.token = result.token;
            //localStorage.setItem("AuthToken", this.token);
            setWithExpiry("AuthToken", this.token);

            this.authService.loginFlag.next(this.token);
            this.router.navigate(['user']);
          }
        }, (error: any) => {
          alert(error.error.Error);
        });
    }
  }

  onSingUp(){
    this.router.navigate(['signup']);
  }

  
}
