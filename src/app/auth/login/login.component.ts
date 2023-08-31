import {Component, OnInit} from '@angular/core';
import {RoutingConstants} from '../../core/constants/routing.constants';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {SessionProvider} from '../../database/providers/session.provider';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loading = false;
  registerUrl = RoutingConstants.AUTH.REGISTER;
  pwResetLink = RoutingConstants.AUTH.PASSWORD_RESET;

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(3)]);
  signInForm: FormGroup;
  hide = true;


  constructor(private translate: TranslateService, private formBuilder: FormBuilder,
              private readonly sessionProvider: SessionProvider, private toastr: ToastrService,
              private router: Router) {
    this.signInForm = this.formBuilder.group({
      email: this.email,
      password: this.password
    });
  }

  ngOnInit(): void {
  }

  async onSubmit(): Promise<void> {
    try {
      this.loading = true;
      const email = this.signInForm.value.email as string;
      const password = this.signInForm.value.password as string;
      const { error } = await this.sessionProvider.signInWPw(email, password);
      if (error) {
        this.toastr.error(error, this.translate.instant('ERROR_MSG.INFO'));
        this.loading = false;
      } else {
        // this.toastr.info(this.translate.instant('LOGIN.SUCCESS'), this.translate.instant('SUCCESS'));
        this.router.navigate(['/']);
      }
      
    } catch (error) {
      this.loading = false;
      if (error instanceof Error) {
        this.toastr.error(error.message, this.translate.instant('SUCCESS'));
      }
    } finally {
      this.signInForm.reset();
      this.loading = false;
    }

  }

  getErrorMessage(type: string): string {
    switch (type) {
      case 'email':
        if (this.email.hasError('required')) {
          return 'ERROR_MSG.NOT_EMPTY';
        }
        return this.email.hasError('email') ? 'ERROR_MSG.INVALID_EMAIL' : '';
      case 'password':
        if (this.password.hasError('required')) {
          return 'ERROR_MSG.NOT_EMPTY';
        }
        return this.password.hasError('password') ? 'ERROR_MSG.INVALID_PASSWORD' : '';
      default:
        return '';
    }
  }
}
