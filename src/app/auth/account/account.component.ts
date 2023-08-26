import { Component } from '@angular/core';
import {SubscriptionDestroyComponent} from '../../core/subscription-destroy.component';
import {SessionProvider} from '../../database/providers/session.provider';
import {Session} from '@supabase/supabase-js';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {StringConstants} from '../../core/constants/string.constants';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {RoutingConstants} from '../../core/constants/routing.constants';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent extends SubscriptionDestroyComponent {
  session: Session | null = null;
  password = new FormControl('', [Validators.required, Validators.minLength(3)]);
  confirmPassword = new FormControl('', [Validators.pattern(StringConstants.passwordConfirmRegex)]);
  pwChangeForm: FormGroup;
  loading = false;

  constructor(private sessionService: SessionProvider,
              private translate: TranslateService,
              private readonly formBuilder: FormBuilder,
              private readonly sessionProvider: SessionProvider,
              private toastr: ToastrService,
              private readonly router: Router) {
    super();
    this.setNewSubscription = this.sessionService.session$.subscribe(session => {
      this.session = session;
    })
    this.pwChangeForm = this.formBuilder.group({
      password: this.password,
      confirmPassword: this.confirmPassword
    });
  }



  onSubmit() {
    this.sessionService.validatePassworts(this.password, this.confirmPassword);
    if (this.pwChangeForm.valid && this.password.value === this.confirmPassword.value) {
      this.loading = true;
      this.sessionProvider.setPassword(this.password.value ?? '').then((result: any) => {
        console.log(result);
        if(result.data && result.data.user !== null) {
          this.toastr.success(this.translate.instant('AUTH.PW_RESET.SUCCESS_PW_CHANGE'), this.translate.instant('SUCCESS'));
        } else if(result.error.message) {
          this.toastr.error(result.error.message, this.translate.instant('ERROR'));
        } else {
          this.toastr.error(this.translate.instant('ERROR_MSG.UNKNOWN'), this.translate.instant('ERROR'));
        }
        this.loading = false;
      }, (error: any) => {
        this.toastr.error(error.message, this.translate.instant('ERROR'));
        this.loading = false;
      });
    } else if (this.password.value !== this.confirmPassword.value) {
      this.confirmPassword.hasError(this.translate.instant('ERROR_MSG.PW_NO_MATCH'));
      this.toastr.error(this.translate.instant('ERROR_MSG.PW_NO_MATCH'), this.translate.instant('ERROR'));
    }
  }

  getErrorMessage(type: string): string {
    switch (type) {
      case 'password':
        if (this.password.hasError('required')) {
          return 'AUTH.LOGIN.NOT_EMPTY';
        }
        if (this.pwChangeForm.errors?.['confirmPassword'] || this.password.value !== this.confirmPassword.value) {
          return 'AUTH.REGISTER.PW_NO_MATCH';
        }
        return this.password.hasError('password') ? 'AUTH.LOGIN.INVALID_PASSWORD' : '';
      case 'confirmPassword':
        if (this.password.hasError('required')) {
          return 'AUTH.LOGIN.NOT_EMPTY';
        }
        if (this.pwChangeForm.errors?.['confirmPassword'] || this.password.value !== this.confirmPassword.value) {
          return 'AUTH.REGISTER.PW_NO_MATCH';
        }
        return this.password.hasError('confirmPassword') ? 'AUTH.LOGIN.INVALID_PASSWORD' : '';
      default:
        return '';
    }
  }

  onBlur() {
    this.sessionService.validatePassworts(this.password, this.confirmPassword);
  }
}
