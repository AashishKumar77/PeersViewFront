import { Component } from '@angular/core';
import { UserModel } from '../../shared/models';
import { UserApiService } from '../../../services/api/user.api.service';

@Component({
  selector: 'user-management-component',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent {
  constructor (private userApiService: UserApiService) {}

  protected countries: any[] = [];
  protected users: UserModel[] = [];
  protected selectedUsers: UserModel[] = [];
  protected user: any = undefined;
  protected userInfo: any = undefined;

  public ngOnInit (): void {
    this.userApiService.promiseGetUser().then((userInfo: UserModel) => {
      this.userInfo = userInfo;

      this.userApiService
        .promiseGetAllCompanyUsers(this.userInfo.id)
        .then((users: UserModel[]) => {
          this.users = users;
        })
        .catch(() => {});

      this.userApiService
        .promiseGetSelectedUsersByCompany(this.userInfo.id)
        .then((users) => {
          this.selectedUsers = users;
        });
    });
  }

  public add (): void {
    this.userApiService
      .promisePostCompanyUser(this.userInfo.id, this.user)
      .then((res) => {
        this.userApiService
          .promiseGetSelectedUsersByCompany(this.userInfo.id)
          .then((users) => {
            this.selectedUsers = users;
          });
      })
      .catch((error) => {});
  }

  public deleteUser (user: any): void {
    this.userApiService
      .promiseDeleteCompanyUser(user.id)
      .then((res) => {
        this.userApiService
          .promiseGetSelectedUsersByCompany(this.userInfo.id)
          .then((users) => {
            this.selectedUsers = users;
          });

        this.userApiService
          .promiseGetAllCompanyUsers(this.userInfo.id)
          .then((users: UserModel[]) => {
            this.users = users;
          });
      })
      .catch((error) => {});
  }
}
