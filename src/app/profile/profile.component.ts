import {
  Component
} from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  CryptoUtilities
} from '../shared/utilities';
import {
  UserModel
} from '../shared/models';
import {
  UserService
} from '../../services';
import {
  UserApiService
} from '../../services/api';
import { Subscribable, Subscription } from 'rxjs';

@Component({
  selector: 'profile-component',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private userApiService: UserApiService
  ) {
    this.getUser();
    this.getUserFollowers();
    this.getUserFollowees();
    this.otherUserSubscriber = UserService.getOtherUserSubject().subscribe((user: UserModel) => {
      this.user = user;
      this.getUserFollowers();
      this.getUserFollowees();
    });
  }

  protected followers: Array<UserModel> = [];
  protected followees: Array<UserModel> = [];

  protected userId: number;
  private user: UserModel = UserService.getOtherUser() || UserService.getUser();
  private otherUserSubscriber: Subscription;
  protected mobileLinkSelected: string = this.user.userTypeId != 3?'accomplishments':'jobs';
  public onClickSelectMobileLink (type): void {
    this.mobileLinkSelected = type;
  }

  private getUser (): void {
    this.userApiService.promiseGetUser()
    .then((user: UserModel) => {
      UserService.setUser(user);
    }).then(()=>{
      if (UserService.getOtherUser()) {
        this.user = UserService.getOtherUser();
      } else {
        this.user = UserService.getUser();
      }
    }); 
 }

  private getUserFollowers (): void {
    this.userApiService.promiseGetFollowers(this.user.id)
      .then((followers: UserModel[]) => {
        this.followers = followers;
      })
      .catch(() => {});
  }

  private getUserFollowees (): void {
    this.userApiService.promiseGetFollowees(this.user.id)
      .then((followees: any[]) => {
       followees.forEach(followee => {
         if (followee.isVerified === true) {
            this.followees.push(followee);
         }
      });
      })
      .catch(() => {});
  }

  public ngOnDestroy (): void {
    this.otherUserSubscriber.unsubscribe();
  }
}
