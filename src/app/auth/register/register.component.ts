import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {StringConstants} from '../../core/constants/string.constants';
import {RoutingConstants} from '../../core/constants/routing.constants';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {SessionProvider} from '../../database/providers/session.provider';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  loading = false;
  loginUrl = RoutingConstants.AUTH.LOGIN;

  email = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required, Validators.minLength(3)]);
  confirmPassword = new FormControl('', [Validators.pattern(StringConstants.passwordConfirmRegex)]);
  registerForm: FormGroup;

  constructor(private translate: TranslateService, private readonly formBuilder: FormBuilder,
              private readonly sessionProvider: SessionProvider, private toastr: ToastrService) {
    this.registerForm = this.formBuilder.group({
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword
    });
  }


  ngOnInit(): void {
  }

  getErrorMessage(type: string): string {
    switch (type) {
      case 'email':
        if (this.email.hasError('required')) {
          return 'PAGES.LOGIN.NOT_EMPTY';
        }
        return this.email.hasError('email') ? 'PAGES.LOGIN.INVALID_EMAIL' : '';
      case 'password':
        if (this.password.hasError('required')) {
          return 'PAGES.LOGIN.NOT_EMPTY';
        }
        if (this.registerForm.errors?.['confirmPassword'] || this.password.value !== this.confirmPassword.value) {
          return 'PAGES.REGISTER.PW_NO_MATCH';
        }
        return this.password.hasError('password') ? 'PAGES.LOGIN.INVALID_PASSWORD' : '';
      case 'confirmPassword':
        if (this.password.hasError('required')) {
          return 'PAGES.LOGIN.NOT_EMPTY';
        }
        if (this.registerForm.errors?.['confirmPassword'] || this.password.value !== this.confirmPassword.value) {
          return 'PAGES.REGISTER.PW_NO_MATCH';
        }
        return this.password.hasError('confirmPassword') ? 'PAGES.LOGIN.INVALID_PASSWORD' : '';
      default:
        return '';
    }
  }

  validatePassworts(): void {
    if (this.password.value !== this.confirmPassword.value) {
      this.password.setValidators(Validators.minLength(20));
      this.confirmPassword.setValidators(Validators.minLength(20));
    } else {
      this.password.setValidators(Validators.pattern(StringConstants.passwordConfirmRegex));
      this.confirmPassword.setValidators(Validators.pattern(StringConstants.passwordConfirmRegex));
    }
    this.password.updateValueAndValidity();
    this.confirmPassword.updateValueAndValidity();
  }

  onSubmit() {
    this.validatePassworts();
    if (this.registerForm.valid && this.password.value === this.confirmPassword.value) {
      this.loading = true;
      this.sessionProvider.signupWPw(this.email.value ?? '', this.password.value ?? '').then((result: any) => {
        console.log(result);
        if(result.data) {
          this.toastr.success(this.translate.instant('REGISTER.SUCCESS'), this.translate.instant('SUCCESS'));

        }
      }).finally(() => {
        this.loading = false;
      });
    } else if (this.password.value !== this.confirmPassword.value) {
      this.confirmPassword.hasError(this.translate.instant('ERROR.PW_NO_MATCH'));
      this.toastr.error(this.translate.instant('ERROR.PW_NO_MATCH'), this.translate.instant('ERROR'));
    }
  }
}
