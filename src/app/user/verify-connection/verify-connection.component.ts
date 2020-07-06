import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import {
  timer
} from 'rxjs';
import {
  UserApiService
} from '../../../services/api';
import {
  UserModel
} from '../../shared/models';
import {
  MessageNotificationService,
  NotificationTypes,
  TokenStore
} from '../../../services';

@Component({
  selector: 'verify-connection-component',
  templateUrl: './verify-connection.component.html',
  styleUrls: ['./verify-connection.component.scss']
})
export class VerifyConnectionComponent implements OnInit {
  constructor (
    private router: Router,
    private route: ActivatedRoute,
    private userApiService: UserApiService
  ) {
  }

  private user: UserModel = new UserModel();

  public ngOnInit (): void {
    const token = TokenStore.getAccessToken();

    if (!token) {
        this.router.navigate(['/sign-in']);
    }


    this.route.queryParams.subscribe((queryParams: {jotToken: string }) => {
      const token = this.route.snapshot.params.token;

      this.userApiService.promiseVerifyConnection(token)
      .then(() => {
        return MessageNotificationService.show({
            notification: {
              id: 'verify-success',
              message: 'Connection Verified.. Success!!!',
              instruction: 'Redirecting...'
            }
          },
          NotificationTypes.Success);
      })
      .then(notificationState => {
        if (notificationState) {
          notificationState.subscribe(() => {
            this.router.navigate(['/profile'], {relativeTo: this.route});
          });
        }
      }).catch(error => {});
    });
  }
}
