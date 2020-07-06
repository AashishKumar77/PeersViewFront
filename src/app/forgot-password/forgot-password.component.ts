import {
  Component
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  UserModel
} from '../shared/models';
import {
  MessageNotificationService,
  NotificationTypes
} from '../../services';
import {
  UserApiService
} from '../../services/api';
import {Meta} from '@angular/platform-browser';

import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'forgot-password-component',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  constructor (
    private userApiService: UserApiService,
    private router: Router,
    private meta: Meta
  ) {

    this.meta.updateTag({ name: 'description', content: 'Forgot password' });
  }

  protected user: UserModel = new UserModel();
  protected email: String;

  protected sendEmail (isValid: boolean): void {
    if (!isValid) {
      return;
    }

    MessageNotificationService.show({
        notification: {
          id: 'forgot-password-please-wait',
          message: 'Sending email',
          instruction: 'Please wait...'
        }
      },
      NotificationTypes.Info);

    let data = {
      email: this.email
    };

    this.userApiService.promiseForgotPassword(data)
      .then((response: any) => {
        MessageNotificationService.show({
          notification: {
            id: 'forgot-password-success',
            message: 'Sent reset password email',
            instruction: 'Please check your email'
          }
        },
        NotificationTypes.Info);
      })
      .catch(error => {
        if (error.status === 400) {
          MessageNotificationService.show({
              notification: {
                id: 'forgot-password-error',
                message: 'Unable to find user',
                reason: 'Email does not exist in our records, wrong email.',
                instruction: 'Please correct the errors and try again.'
              }
            },
            NotificationTypes.Error);
        } else {
          MessageNotificationService.show({
              notification: {
                id: 'forgot-password-error',
                message: 'Unable to reset password.',
                reason: 'Some unexpected happened with the application.',
                instruction: 'Please try again, if the issue persists, please try refreshing your browser.'
              }
            },
            NotificationTypes.Error);
        }
      });
  }
}
