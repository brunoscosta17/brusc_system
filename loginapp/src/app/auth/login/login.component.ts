import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = this.formBuilder.group({
    'email': ['', [Validators.required, Validators.email]],
    'password': ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  onSubmit() {
    const credentials = this.loginForm.value;
    this.authService.login(credentials)
      .subscribe(
        (user) => {
          console.log(user);
          this.snackBar.open('Logged in successfuly. Welcome ' + user.firstname + '!', 'OK', { duration: 2000 });
          this.router.navigateByUrl('/');
        },
        (error) => {
          console.log(error);
          this.snackBar.open('Login error!', 'OK', { duration: 2000 });
        }
      );
  }

}
