import {
  Component
} from '@angular/core';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import {
  UserModel
} from '../shared/models';
import {
  MessageNotificationService,
  NotificationTypes,
  TokenStore
} from '../../services';
import {
  UserApiService
} from '../../services/api';
import { Meta} from '@angular/platform-browser';
import {
  timer
} from 'rxjs';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'reset-password-component',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  constructor (
    private userApiService: UserApiService,
    private router: Router,
    private route: ActivatedRoute,
    private meta: Meta
  ) {
    this.meta.updateTag({name: 'description', content: 'Reset your password'});
  }

  protected hasAgreed: boolean = false;
  protected user: UserModel = new UserModel();

  protected resetPassword (): void {
    MessageNotificationService.show({
        notification: {
          id: 'reset-password-please-wait',
          message: 'Reset Password',
          instruction: 'Please wait...'
        }
      },
      NotificationTypes.Info);

    this.route.queryParams.subscribe((queryParams: {jotToken: string, secret: string}) => {
      if (queryParams.jotToken && queryParams.secret) {
        let data = {
          password: this.user.password,
          confirmPassword: this.user.confirmPassword,
          secret: queryParams.secret
        };

        this.userApiService.promiseResetPassword(queryParams.jotToken, data)
          .then((user: UserModel) => {
            TokenStore.setAccessToken(user.token);
            timer(3000)
            .subscribe(() => {
              this.router.navigate(['/home']);
            });
          })
          .catch(error => {});
      }
    });
  }
}
