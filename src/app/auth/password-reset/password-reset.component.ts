import { Component } from '@angular/core';
import {RoutingConstants} from '../../core/constants/routing.constants';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {SessionProvider} from '../../database/providers/session.provider';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent {
  resetPasswordForm: FormGroup;
  email = new FormControl('', [Validators.required, Validators.email]);
  loading = false;
  loginUrl = RoutingConstants.AUTH.LOGIN;

  constructor(private translate: TranslateService, private formBuilder: FormBuilder,
              private readonly sessionProvider: SessionProvider, private toastr: ToastrService,
              private router: Router) {
    this.resetPasswordForm = this.formBuilder.group({
      email: this.email
    });
  }

  getErrorMessage(): string {
    if (this.email.hasError('required')) {
      return 'ERROR_MSG.NOT_EMPTY';
    }
    return this.email.hasError('email') ? 'ERROR_MSG.INVALID_EMAIL' : '';
  }

  onSubmit() {
    this.loading = true;
    const email = this.resetPasswordForm.value.email as string;
    if(email){
      this.sessionProvider.sendResetPasswordLink(email, RoutingConstants.AUTH.PASSWORD_RESET).then(() => {
        this.loading = false;
        this.toastr.info(this.translate.instant('AUTH.PW_RESET.SUCCESS_PW_RESET'), this.translate.instant('SUCCESS'));
      }, (error: any) => {
        this.loading = false;
        this.toastr.error(error.message, this.translate.instant('ERROR'));
      });
    } else {
      this.toastr.error(this.translate.instant('AUTH.PW_RESET.EMAIL_NOT_EMPTY'), this.translate.instant('ERROR'));
    }
  }
}
