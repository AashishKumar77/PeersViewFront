import {
  Component, EventEmitter,
  Input, Output,
  SimpleChanges
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  MatDialog,
  MatDialogRef,
  MatDialogConfig
} from '@angular/material';
import {
  Overlay
} from '@angular/cdk/overlay';
import {
  ScholarshipModel,
  UserModel
} from '../../models';
import {
  ScholarshipApiService
} from '../../../../services/api';
import {
  JobEmitter
} from '../../emitter';
import {
  CryptoUtilities
} from '../../../shared/utilities';
import {
  UserService,
} from '../../../../services';
import {
  SharedImagePreviewComponent, SharedConfirmModalComponent,
} from '../../modals';

@Component({
  selector: 'shared-scholarship-component',
  templateUrl: './scholarship.component.html',
  styleUrls: ['./scholarship.component.scss']
})
export class SharedScholarshipComponent {
  // public currentUser = UserService.getUser();
  constructor (
    private scholarshipApiService: ScholarshipApiService,
    private router: Router,
    private dialog: MatDialog,
    private overlay: Overlay
  ) {}

  @Input() protected items: Array<ScholarshipModel> = [];
  @Input() protected currentUser = UserService.getUser();
  @Input() protected route: {
    name: string,
    campusId?: number,
    campusFreshersFeedId?: number,
    campusCourseFeedId?: number,
    campusClassId?: number,
    userId?: number
  } = {name: 'home'};
  @Input() protected user: UserModel;
  @Output() protected loadRecord = new EventEmitter();
  protected btnLoadMoreText = 'Load More';
  protected notJobMessage: string = 'Sorry, your search has returned no results.';
  private dialogRef: MatDialogRef<SharedImagePreviewComponent>;
  private limit = 5;
  private offset = 0;
  protected userJustVoted: boolean = false;
  protected isLoadingMoreScholarships: boolean = false;
  protected scholarshipTypes: any = [
    'Bachelor (Undergraduate)',
    'Master (Postgraduate)',
    'PhD (Doctorate)'
  ];

  public ngOnInit (): void {
    // this.jobSavedSubcribers();
    // console.log(this.currentUser.id)
  }

  public ngOnChanges (changes: SimpleChanges): void {
    if (this.items.length === 0 && changes.items.previousValue) {
      this.notJobMessage = 'Sorry, your search has returned no results.';
    }
  }

  private scholarshipSavedSubcribers (): void {
    JobEmitter.jobSave()
      .subscribe((scholarship: ScholarshipModel) => {
        this.items.unshift(scholarship);
      });
  }

  protected onClickUserProfile (user): Promise<boolean> {
    let userId = CryptoUtilities.cipher(user.id);
    let currentLoginUser = UserService.getUser();

    if (user.id === currentLoginUser.id) {
      return this.router.navigate([`/profile`]);
    }

    return this.router.navigate([`/profile/${userId}`]);
  }

  protected onDeleteScholarship (scholarshipId: number): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.panelClass = 'scholarship-delete-confirm-modal';
    dialogConfig.id = 'SharedConfirmModalComponent';
    dialogConfig.disableClose = true;
    dialogConfig.scrollStrategy = this.overlay.scrollStrategies.block();
    dialogConfig.data = {
      description: 'Do you want to proceed?'
    };
    this.dialog.open(SharedConfirmModalComponent, dialogConfig)
    .afterClosed()
    .subscribe(data => {
      if (data) {
        // delete here the job
        this.scholarshipApiService.promiseRemoveScholarship(scholarshipId)
          .then(() => {
            // console.log(jobId)
            let index = this.items.findIndex(filter => filter.id === scholarshipId);
            this.items.splice(index, 1);
            // alert("success");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  }

  protected showScholarshipDetail (scholarship: ScholarshipModel): Promise<boolean> {
    let scholarshipId = CryptoUtilities.cipher(scholarship.id);

    return this.router.navigate([`/scholarship/${scholarshipId}`]);
  }

  // protected onEditScholarship (scholarshipid: number): Promise<boolean> {
  //   let scholarshipId = CryptoUtilities.cipher(scholarshipid);

  //   return this.router.navigate([`/compose-job/${scholarshipId}`]);
  // }

  protected onLoadMoreScholarship (): void {
    this.isLoadingMoreScholarships = true;
    this.offset = this.items.length;
    let campusId: any;

    this.scholarshipApiService.promiseGetAllScholarships(this.limit, this.offset)
      .then((items: ScholarshipModel[]) => {
        this.items = this.items.concat(items);
        // this.checkIfThereAreStillJobAvailable(jobs);
        this.isLoadingMoreScholarships = false;
      });
  }

  protected onClickPhoto (jobAttachments, imageIndex): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.panelClass = 'image-preview-modal';
    dialogConfig.id = 'ImagePreviewModal';
    dialogConfig.disableClose = true;
    dialogConfig.scrollStrategy = this.overlay.scrollStrategies.block();
    dialogConfig.data = { images: jobAttachments, clickIndex: imageIndex, source: 'job' };
    this.dialogRef = this.dialog.open(SharedImagePreviewComponent, dialogConfig);
  }

  protected getPollPercentage (pollOptions): any {
    pollOptions.map(optionData => {
      optionData.sum = parseFloat(optionData.sum) + 1;
      optionData.average = (optionData.count / optionData.sum) * 100;
      optionData.average = optionData.average.toFixed(2);

      return optionData;
    });
  }

  private checkIfThereAreStillJobAvailable (jobs: ScholarshipModel[]): void {
    if (jobs.length === 0) {
      this.btnLoadMoreText = 'No More Jobs To Show';
    }
  }

  protected trimStory (message, maxCharacters): string {
    let trimmedString = message.substr(0, maxCharacters);
    return trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(' '))) + '...';
  }

  public ngOnDestroy (): void {
    JobEmitter.removeSubscriber(JobEmitter.getJobSaveName());
    JobEmitter.removeSubscriber(JobEmitter.getJobSaveName());
  }
  protected loadJob (): void {
    this.loadRecord.emit();
  }

  protected updateJob (data: any): void {
    console.log(data);
    // let index = this.jobs.indexOf(data.originJob);
    for (let i = 0; i < this.items.length; i ++) {
      if (this.items[i].id === data.updatedJob.id) {
        this.items[i] = data.updatedJob;
      }
    }
    // this.jobs[index] = data.updatedJob;
  }
}
