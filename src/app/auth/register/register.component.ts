import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {StringConstants} from '../../core/constants/string.constants';
import {RoutingConstants} from '../../core/constants/routing.constants';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {SessionProvider} from '../../database/providers/session.provider';
import {Router} from '@angular/router';

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

  constructor(private translate: TranslateService,
              private readonly formBuilder: FormBuilder,
              private readonly sessionProvider: SessionProvider,
              private toastr: ToastrService,
              private readonly router: Router) {
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
          return 'AUTH.LOGIN.NOT_EMPTY';
        }
        return this.email.hasError('email') ? 'AUTH.LOGIN.INVALID_EMAIL' : '';
      case 'password':
        if (this.password.hasError('required')) {
          return 'AUTH.LOGIN.NOT_EMPTY';
        }
        if (this.registerForm.errors?.['confirmPassword'] || this.password.value !== this.confirmPassword.value) {
          return 'AUTH.REGISTER.PW_NO_MATCH';
        }
        return this.password.hasError('password') ? 'AUTH.LOGIN.INVALID_PASSWORD' : '';
      case 'confirmPassword':
        if (this.password.hasError('required')) {
          return 'AUTH.LOGIN.NOT_EMPTY';
        }
        if (this.registerForm.errors?.['confirmPassword'] || this.password.value !== this.confirmPassword.value) {
          return 'AUTH.REGISTER.PW_NO_MATCH';
        }
        return this.password.hasError('confirmPassword') ? 'AUTH.LOGIN.INVALID_PASSWORD' : '';
      default:
        return '';
    }
  }


  onSubmit() {
    this.sessionProvider.validatePassworts(this.password, this.confirmPassword);
    if (this.registerForm.valid && this.password.value === this.confirmPassword.value) {
      this.loading = true;
      this.sessionProvider.signupWPw(this.email.value ?? '', this.password.value ?? '').then((result: any) => {
        console.log(result);
        if(result.error) {
          this.toastr.error(result.error.message, this.translate.instant('ERROR'));
          this.loading = false;
        }
        else if(result.data) {
          this.toastr.success(this.translate.instant('AUTH.REGISTER.SUCCESS'), this.translate.instant('SUCCESS'));
          this.router.navigate([RoutingConstants.AUTH.BASE + '/' + RoutingConstants.AUTH.LOGIN], {replaceUrl: true});
        }
      }, (error: any) => {
        this.toastr.error(error.message, this.translate.instant('ERROR'));
        this.loading = false;
      });
    } else if (this.password.value !== this.confirmPassword.value) {
      this.confirmPassword.hasError(this.translate.instant('ERROR_MSG.PW_NO_MATCH'));
      this.toastr.error(this.translate.instant('ERROR_MSG.PW_NO_MATCH'), this.translate.instant('ERROR'));
    }
  }
}
