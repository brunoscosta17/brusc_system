import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { User } from '../user';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formRegister = this.formBuilder.group({
    'firstname': ['', Validators.required],
    'lastname': ['', Validators.required],
    'address': ['', Validators.required],
    'city': ['', Validators.required],
    'state': ['', Validators.required],
    'phone': ['', Validators.required],
    'mobilephone': ['', Validators.required],
    'email': ['', [Validators.required, Validators.email]],
    'password1': ['', [Validators.required, Validators.minLength(6)]],
    'password2': ['', [Validators.required, Validators.minLength(6)]],
  }, { validator: this.matchingPasswords });

  states = [
    'MG',
    'SP',
    'RJ',
    'PR',
    'RS',
    'SC',
  ];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit() {
  }

  matchingPasswords(group: FormGroup) {
    if (group) {
      const password1 = group.controls['password1'].value;
      const password2 = group.controls['password2'].value;
      if (password1 == password2) {
        return null;
      }
    }
    return { matching: false }
  }

  onSubmit() {
    console.log(this.formRegister.value)
    let user: User = { ...this.formRegister.value, password: this.formRegister.value.password1 };
    this.authService.register(user)
      .subscribe((user) => {
        this.snackBar.open('Successfuly registered! Use yours credentials to log in', 'OK', { duration: 1500 });
        this.router.navigateByUrl('/auth/login');
      }, (error) => {
        this.snackBar.open(error.error.message, 'OK', { duration: 1500 });
        console.error(error);
      });
  }

}
