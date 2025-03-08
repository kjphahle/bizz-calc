import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  faE,
  faEye,
  faEyeSlash,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild('passwordInput') passwordInput: ElementRef;
  loginForm: UntypedFormGroup;
  errorMessage: string = '';
  loading: boolean = false;
  passwordPattern =
    '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,15}';
  faInfoCircle = faInfoCircle;
  passwordIcon = faEye;

  navigateTo(route: string) {
    this.router.navigateByUrl(route);
    if (route == '/auth/register') {
      sessionStorage.setItem(
        'loginDetails',
        JSON.stringify(this.loginForm.getRawValue())
      );
    }
  }

  showPassword() {
    this.passwordIcon = faEyeSlash;
    this.passwordInput.nativeElement.type = 'text';
  }

  hidePassword() {
    this.passwordIcon = faEye;
    this.passwordInput.nativeElement.type = 'password';
  }

  async login() {
    if (this.loginForm.valid) {
      this.loading = true;
      this.authService
        .login(this.loginForm.getRawValue())
        .then((data) => {
          this.loading = false;
          this.errorMessage = '';
          console.log("dddddddddddddddddddddddddd");
          console.dir(data);
        })
        .catch((err) => {
          this.errorMessage = err.message;
          this.loading = false;
        });
    } else {
      this.errorMessage = 'Please complete the form';
    }
  }

  constructor(
    private router: Router,
    private authService: AuthService,
    private fb: UntypedFormBuilder
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: new UntypedFormControl('', Validators.required),
      password: new UntypedFormControl('', [
        Validators.required,
        Validators.pattern(this.passwordPattern),
        Validators.minLength(8),
      ]),
    });
  }
}
