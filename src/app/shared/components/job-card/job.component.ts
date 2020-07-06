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
  MatDialogConfig,
  MatSnackBar
} from '@angular/material';
import {
  Overlay
} from '@angular/cdk/overlay';
import {
  JobModel,
  UserModel,
  SavedJobModel
} from '../../models';
import {
  JobApiService,
  CampusApiService,
  UserApiService,
  SavedJobApiService
} from '../../../../services/api';
import { CryptoUtilities } from '../../utilities';

@Component({
  selector: 'shared-job-card-component',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class SharedJobCardComponent {
  // public currentUser = UserService.getUser();
  constructor (
    private router: Router,
    private snackBar: MatSnackBar,
    private savedJobApiService: SavedJobApiService
  ) {}

  @Input() protected job: JobModel;
  private jobTypes: string[] = [
    'Full-Time',
    'Part-Time',
    'Internship',
    'Graduate Role',
    'Co-op'
  ];

  public ngOnInit (): void {
    // this.jobSavedSubcribers();
    // console.log(this.currentUser.id)
  }

  public ngOnChanges (changes: SimpleChanges): void {
  }

  protected trimStory (message, maxCharacters): string {
    if (message && message.length > maxCharacters) {
      let trimmedString = message.substr(0, maxCharacters);
      return trimmedString = trimmedString + '...';
    } else {
      return message;
    }
  }

  protected showJobDetail (job: JobModel): Promise<boolean> {
    let jobId = CryptoUtilities.cipher(job.id);

    return this.router.navigate([`/job/${jobId}`]);
  }

  protected onSave (job: JobModel): void {
    let data: SavedJobModel = new SavedJobModel();
    data.jobId = job.id;

    this.savedJobApiService.promisePostSavedJob(data).then(res => {
      console.log(res);
      this.snackBar.open('Saved', '', {
        duration: 2000
      });
    });
  }
}
