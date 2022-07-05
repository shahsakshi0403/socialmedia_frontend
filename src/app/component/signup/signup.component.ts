import { RouterModule } from '@angular/router';
import { userData } from '../user/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SharedModule } from '../../shared/shared.module';

@Component({
  standalone: true,
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports: [SharedModule]
})
export class SignUpComponent implements OnInit {
  userForm: FormGroup;
  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.userForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]),
      lastName: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,}$/)]),
      userName: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Za-z0-9]+$/)]),
      dob: new FormControl(null, [Validators.required])
    })
  }

  onUserSubmit() {
    if (this.userForm.valid) {
      this.userService.addUser(this.userForm.value).subscribe(
        (result: userData) => {
          //console.log(result);
          this.router.navigate(['login']);
        }, (error: any) => {
          alert(error.error.errors);
        }
      );
    }
  }

  onCancel() {
    this.router.navigate(['user']);
  }
}
