import { Component, OnInit } from '@angular/core';
import { ForgotType } from 'src/app/interfaces/forgot.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  email: string;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService) {}

  async resetPassword() {
    if (this.email != undefined) {
      const resetObject: ForgotType = {
        username: this.email,
        email: this.email,
      };
      this.authService
        .forgotPasswrod(resetObject)
        .then(() => {
          this.successMessage =
            'Password reset email was sent to ' + this.email;
          this.errorMessage = '';
        })
        .catch((err) => {
          this.errorMessage = 'Something went wrong';
          this.successMessage = '';
        });
    } else {
      this.errorMessage = 'Please enter email address';
    }
  }

  ngOnInit(): void {}
}
