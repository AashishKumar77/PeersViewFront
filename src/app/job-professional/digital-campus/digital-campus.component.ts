import {
    Component
  } from '@angular/core';
  import { ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
  import { JobApiService } from '../../../services/api';
  import { JobModel, UserModel } from '../../shared/models';
  import { UserService } from '../../../services';
  import { CryptoUtilities } from '../../shared/utilities';
  import { userList } from './digital-campus.data';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Overlay } from '@angular/cdk/overlay';
import { AlumniProfileDialogComponent } from './profile/profile-modal.component';
  
  @Component({
    selector: 'job-premium-digital-campus-component',
    templateUrl: './digital-campus.component.html',
    styleUrls: ['./digital-campus.component.scss']
  })
  export class JobPreminumDigitalCampusComponent {
    constructor (
      private route: ActivatedRoute,
      private router: Router,
      private jobApiService: JobApiService,
      private dialog: MatDialog,
      private overlay: Overlay
    ) {
      this.user = UserService.getUser();
    }
  
    protected job: JobModel;
    protected user: UserModel = UserService.getUser();
    public users = userList;
    public selectedUser: any;

    public ngOnInit (): void {}
  
    public ngOnDestroy (): void {}

    public selectUser(user: any): void {
      this.selectedUser = user;
    }

    public openModal(): void {
      let that = this;
      const dialogConfig = new MatDialogConfig();

      dialogConfig.panelClass = 'alumni-profile-modal';
      dialogConfig.id = 'AlumniProfileDialogComponent';
      // dialogConfig.disableClose = false;
      // dialogConfig.scrollStrategy = this.overlay.scrollStrategies.block();
      dialogConfig.data = {};
      this.dialog.open(AlumniProfileDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe(data => {
        if (data) {
          console.log(data);
        }
      });
    }
}
  