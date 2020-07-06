import {
    Component, HostListener, OnInit, Input, Output, EventEmitter
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobApiService, SavedJobApiService, ManualJobApiService } from '../../../../services/api';
import { JobModel, UserModel } from '../../../shared/models';
// import { UserService } from '../../../services';
// import { MatDialogConfig, MatDialog } from '@angular/material';
import { Overlay } from '@angular/cdk/overlay';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { SharedConfirmModalComponent } from '../../../shared/modals';

@Component({
  selector: 'jobs-status-item-component',
  templateUrl: './status-item.component.html',
  styleUrls: ['./status-item.component.scss']
})
export class JobsStatusItemComponent {
  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private overlay: Overlay,
    private jobApiService: JobApiService,
    private savedJobApiService: SavedJobApiService,
    private manualJobApiService: ManualJobApiService
  ) {
  }

  @Input() public job: JobModel;
  @Output() public deleteJob: EventEmitter<object> = new EventEmitter<object>();

  public deleteApplication(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.panelClass = 'cancel-saving-ad-modal';
    dialogConfig.disableClose = true;
    dialogConfig.scrollStrategy = this.overlay.scrollStrategies.block();
    dialogConfig.id = 'SharedConfirmModalComponent';
    dialogConfig.data = {
     description : 'Are you sure you want to delete?'
    };
    this.dialog.open(SharedConfirmModalComponent, dialogConfig)
    .beforeClose()
    .subscribe(response => {
      if (response) {
        console.log(typeof this.job);
        if (this.job.jobId) {
          this.savedJobApiService.promiseRemoveSavedJob(this.job.id).then(res => {
            this.deleteJob.emit(this.job);
          });
        } else {
          this.manualJobApiService.promiseRemoveManualJob(this.job.id).then(res => {
            this.deleteJob.emit(this.job);
          });
        }
      }
    });
  }
}
