import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-role-options',
  templateUrl: './role-options.component.html',
  styleUrls: ['./role-options.component.scss']
})
export class RoleOptionsComponent implements OnInit {
  roleOptionsForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder) {
    this.roleOptionsForm = this.fb.group({
      EmailAddress: ['', [Validators.required, Validators.email]],
      option: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    const loginData = sessionStorage.getItem('loginDetails');
    if (loginData) {
      const loginDetails = JSON.parse(loginData);
      console.log(loginDetails);
    }
    sessionStorage.removeItem('loginDetails');
  }

  onSubmit() {
    if (this.roleOptionsForm.valid) {
      this.router.navigate(['/auth/register']); // Navigates to the register form
    }
  }
}