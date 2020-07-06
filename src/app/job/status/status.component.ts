import {
    Component, HostListener, OnInit
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobApiService, ManualJobApiService, SavedJobApiService } from '../../../services/api';
import { JobModel, UserModel } from '../../shared/models';
import { UserService } from '../../../services';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { Overlay } from '@angular/cdk/overlay';
import { CryptoUtilities } from '../../shared/utilities';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SavedJobFactory } from '../../shared/models/factory';

@Component({
  selector: 'jobs-status-component',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class JobsStatusComponent {
  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private overlay: Overlay,
    private manualJobApiService: ManualJobApiService,
    private savedJobApiService: SavedJobApiService,
    private fb: FormBuilder
  ) {
    this.getSavedJobs();
    this.getManualJobs();
    this.user = UserService.getUser();
    console.log(this.user);
  }
  private jobComposeForm: FormGroup;
  protected jobs: any[] = [];
  protected totalCount: number = 0;
  protected user: UserModel = UserService.getUser();
  protected isJobStatus: boolean = true;
  protected isSubmitted: boolean = false;

  public ngOnInit (): void {
    this.jobComposeForm = this.fb.group({
      title: ['', Validators.required],
      company:  ['', Validators.required],
      jobfunction:  ['', Validators.required],
      deadline:  ['', Validators.required],
      source_link:  ['', Validators.required],
      isApplied: [false]
    });
  }

  get f (): any { return this.jobComposeForm.controls; }

  private getSavedJobs (): void {

    this.savedJobApiService.promiseGetSavedJobs()
      .then((data) => {
        this.jobs = this.jobs.concat(data);
      });
  }

  private getManualJobs (): void {

    this.manualJobApiService.promiseGetManualJobs()
      .then((data) => {
        this.jobs = this.jobs.concat(data);
      });
  }

  private markFormGroupTouched (form: FormGroup): void {
    Object.values(form.controls).forEach(control => {
      control.markAsTouched();

      if ((control as any).controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }

  protected onSave (): void {
    this.markFormGroupTouched(this.jobComposeForm);
    this.isSubmitted = true;
    let data = SavedJobFactory.createJob(this.jobComposeForm.value);

    if (this.jobComposeForm.valid) {
      this.manualJobApiService.promisePostManualJob(data)
        .then((res) => {
          // console.log(res);
          // this.router.navigate([`/job/search`], {relativeTo: this.route});
          this.jobs.unshift(res.data);
          this.isJobStatus = true;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  protected deleteJobEvent (job): void {
    let index = this.jobs.indexOf(job);
    this.jobs.splice(index, 1);
  }
}
