import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import intlTelInput from 'intl-tel-input';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})

export class RegisterComponent implements OnInit {
  @ViewChild('passwordInput') passwordInput: ElementRef;
  @ViewChild('confirmPasswordInput') confirmPasswordInput: ElementRef;
  title = 'intlInputNew';

  loading: boolean = false;
  errorMessage: string = '';
  registerForm: FormGroup;
  confirmValid = true;
  passwordIcon = faEye;
  confirmPasswordIcon = faEye;
  countries = [
    { name: 'South Africa', code: '+27', flag: '🇿🇦' },
    { name: 'United States', code: '+1', flag: '🇺🇸' },
    // Add more countries with their flags and codes
  ];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const loginData = sessionStorage.getItem('loginDetails');
    sessionStorage.removeItem('loginDetails');
    //const loginDetails = JSON.parse(loginData);
    const loginDetails = loginData ? JSON.parse(loginData) : null;

    this.registerForm = this.fb.group({
      FirstName: new FormControl('', Validators.required),
      LastName: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      countryText: [{ value: '', disabled: true }], 
      province: new FormControl('', Validators.required),
      town: new FormControl('', Validators.required),
      MobileNo: new FormControl('', Validators.required),
      WhatsappNo: new FormControl('', Validators.required),
      EmailAddress: new FormControl(loginDetails ? loginDetails.username : '', [
        Validators.required,
        Validators.email,
      ]),
      Password: new FormControl(loginDetails ? loginDetails.password : '', [
        Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,15}'),
        Validators.minLength(8),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });

    this.registerForm.get('confirmPassword').valueChanges.subscribe((value) => {
      this.confirmValid = value === this.registerForm.get('Password').value;
    });

    
    const inputElements = document.querySelectorAll('#phone, #country, #province');

    inputElements.forEach(inputElement => {
      intlTelInput(inputElement, {
        initialCountry: 'za',
        separateDialCode: true,
        utilsScript: 'http://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.08.8/js/utils.js'
      });
    });
  }

  onCountryChange(event: any) {
    const selectedCountry = event.target.value;
    const country = this.countries.find(c => c.name === selectedCountry);
    
    if (country) {
      // Update the country text input with the selected country's name
      this.registerForm.patchValue({ countryText: country.name });
    } else {
      this.registerForm.patchValue({ countryText: '' });
    }
  }

  onCountrySelected(event: any) {
    console.log('Selected country:', event); // Event contains details about the selected country
  }

  navigateTo(route: string) {
    this.router.navigateByUrl(route);
  }

  showPassword() {
    this.passwordIcon = faEyeSlash;
    this.passwordInput.nativeElement.type = 'text';
  }

  hidePassword() {
    this.passwordIcon = faEye;
    this.passwordInput.nativeElement.type = 'password';
  }

  showConfirmPassword() {
    this.confirmPasswordIcon = faEyeSlash;
    this.confirmPasswordInput.nativeElement.type = 'text';
  }

  hideConfirmPassword() {
    this.confirmPasswordIcon = faEye;
    this.confirmPasswordInput.nativeElement.type = 'password';
  }

  async register() {
    if (this.registerForm.valid) {
      this.loading = true;
      try {
        await this.authService.register(this.registerForm.getRawValue());
      } catch (err) {
        this.errorMessage = err.message;
      } finally {
        this.loading = false;
      }
    } else {
      this.errorMessage = 'Please complete the form';
    }
  }
}
