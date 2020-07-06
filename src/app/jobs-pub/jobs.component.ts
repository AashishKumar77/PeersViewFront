import {
  Component, HostListener
} from '@angular/core';
import {Meta} from '@angular/platform-browser';
import { JobModel } from '../shared/models';
import { JobApiService } from '../../services/api';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { Overlay } from '@angular/cdk/overlay';
import { JobFilterDialogComponent } from '../shared/modals';


@Component({
  selector: 'jobs-pub-component',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsPubComponent {
  constructor (
    private meta: Meta,
    private jobApiService: JobApiService,
    private route: ActivatedRoute,
    private router: Router,
    private overlay: Overlay,
    private dialog: MatDialog
  ) {
    this.meta.updateTag({
      name: 'description',
      content: 'Find student jobs, entry-level roles, internships, co-ops, talent programs, and more..'
    });
    this.jobTitle = this.route.snapshot.paramMap.get('title');
    this.filters.companyName = this.route.snapshot.paramMap.get('companyName');
    this.filters.country = this.route.snapshot.paramMap.get('country');
    this.filters.city = this.route.snapshot.paramMap.get('city');
    this.filters.jobType = this.route.snapshot.paramMap.get('jobType');
    this.filters.industries =
                      this.route.snapshot.paramMap.get('industries') ? this.route.snapshot.paramMap.get('industries').split(',') : [];
    this.filters.hiringCompanies = this.route.snapshot.paramMap.get('hiringCompanies');
    this.filters.workAuthoriztion = this.route.snapshot.paramMap.get('workAuthoriztion');
    this.getJobs();
  }

  private limit = 5;
  private offset = 0;
  protected jobs: JobModel[] = [];
  protected isLoadingMoreJobs: boolean = false;
  protected total = 0;
  protected jobTitle: string = '';
  protected filters: any = {};

  @HostListener('window:scroll', [])
  protected onScroll (): void {
    // let divElemHeight = document.getElementById("shared-post-component").offsetHeight;
    let homeElement = document.getElementById('jobs-pub-component');

    if (homeElement) {
      let elemBountRect = homeElement.getBoundingClientRect();

      if ((window.innerHeight + window.scrollY) >= elemBountRect.height - 100) {
              // you're at the bottom of the page
        if (this.jobs.length < this.total && !this.isLoadingMoreJobs) {
          this.onLoadMoreJob();
        }
      }
    }
  }

  protected onLoadMoreJob (): void {
    this.isLoadingMoreJobs = true;
    this.offset = this.jobs.length;

    this.jobApiService.promiseGetPublicJobs(
      this.limit,
      this.offset,
      this.jobTitle,
      this.filters.country,
      this.filters.city,
      this.filters.companyName,
      this.filters.jobType,
      this.filters.industries,
      this.filters.hiringCompanies,
      this.filters.workAuthoriztion
    )
      .then((data) => {
        this.jobs = this.jobs.concat(data.jobs);
        this.total = data.total;
        this.isLoadingMoreJobs = false;
      });
  }

  private getJobs (): void {
    this.jobApiService.promiseGetPublicJobs(
      30,
      0,
      this.jobTitle,
      this.filters.country,
      this.filters.city,
      this.filters.companyName,
      this.filters.jobType,
      this.filters.industries,
      this.filters.hiringCompanies,
      this.filters.workAuthoriztion
    )
      .then((data) => {
        this.jobs = data.jobs;
        this.total = data.total;
      });
  }

  public searchJob (): void {
    this.router.navigate(['/jobs'], {
      queryParams: {
        title: this.jobTitle,
        country: this.filters.country,
        city: this.filters.city,
        companyName: this.filters.companyName,
        jobType: this.filters.jobType ? this.filters.jobType.toString() : null,
        industries: this.filters.industries,
        hiringCompanies: this.filters.hiringCompanies ? 'true' : null,
        workAuthorization: this.filters.workAuthoriztion ? 'true' : null
      }
    });

    this.getJobs();
  }

  public onKey ( event: any ): void { // without type info
    this.jobTitle = event.target.value;
  }

  public onSearchJob (): void {
    this.searchJob();
  }

  public openFilterModal (): void {
    let that = this;
    const dialogConfig = new MatDialogConfig();

    dialogConfig.panelClass = 'job-filter-modal';
    dialogConfig.id = 'JobFilterModalDialogComponent';
    dialogConfig.disableClose = true;
    dialogConfig.scrollStrategy = this.overlay.scrollStrategies.block();
    dialogConfig.data = {};
    this.dialog.open(JobFilterDialogComponent, dialogConfig)
    .afterClosed()
    .subscribe(data => {
      if (data) {
        console.log(data);
        this.filters = data;
        this.searchJob();
      }
    });
  }
}
