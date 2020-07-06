import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserModel } from '../shared/models/user';

@Component({
  selector: 'account-settings-component',
  templateUrl: './account-settings.component.html',
  styleUrls: ['.//account-settings.component.scss'],
})
export class AccountSettingsComponent implements OnInit {
  constructor () {}

  protected user: UserModel = UserService.getUser();

  public ngOnInit (): void {}
}
