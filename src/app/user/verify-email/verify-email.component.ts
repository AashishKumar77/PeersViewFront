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
  TokenStore, UserService
} from '../../../services';

@Component({
  selector: 'user-verify-email-component',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class UserVerifyEmailComponent implements OnInit {
  constructor (
    private router: Router,
    private route: ActivatedRoute,
    private userApiService: UserApiService
  ) {}

  private user: UserModel = new UserModel();

  public ngOnInit (): void {
      const jotToken = this.route.snapshot.params.jotToken;
      const token = this.route.snapshot.params.token;
      this.user.assimilate({
        token: token
      });

      this.userApiService.promiseVerifyEmail(jotToken, this.user)
        .then((user: UserModel) => {
          UserService.setUser(user);
          TokenStore.setAccessToken(user.token);
          timer(3000)
          .subscribe(() => {
            this.router.navigate(['/user/on-boarding/status']);
          });
        })
        .catch(error => {});
  }
}
