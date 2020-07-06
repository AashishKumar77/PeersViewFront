import {
  Component, HostListener, OnInit
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobApiService } from '../../../services/api';
import { JobModel, UserModel } from '../../shared/models';
import { UserService } from '../../../services';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { Overlay } from '@angular/cdk/overlay';
import { CryptoUtilities } from '../../shared/utilities';
import { JobFilterDialogComponent } from '../../shared/modals';

@Component({
  selector: 'jobs-premium-search-component',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class JobsSearchComponent {
  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private overlay: Overlay,
    private jobApiService: JobApiService
  ) {
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
    this.user = UserService.getUser();
    console.log(this.user);
  }
  protected jobs: JobModel[] = [];
  protected totalCount: number = 0;
  protected oriJobs: JobModel[] = [];
  protected user: UserModel = UserService.getUser();
  protected jobTitle: string = '';
  protected region: string = '';
  protected isMarketingFilter = false;
  protected isManagementFilter = false;
  protected isSecurityFilter = false;
  protected isAnalystFilter = false;
  protected isITFilter = false;
  protected isMiningFilter = false;
  protected isOilGasFilter = false;
  protected isTaxFilter = false;
  private limit = 15;
  private offset = 0;
  protected isLoadingMoreJobs: boolean = false;
  protected filters: any = {};

  @HostListener('window:scroll', [])
  protected onScroll (): void {
    // let divElemHeight = document.getElementById("shared-post-component").offsetHeight;
    let homeElement = document.getElementById('jobs-search-component');

    if (homeElement) {
      let elemBountRect = homeElement.getBoundingClientRect();

      if ((window.innerHeight + window.scrollY) >= elemBountRect.height - 100) {
              // you're at the bottom of the page
        if (this.jobs.length < this.totalCount && !this.isLoadingMoreJobs) {
          this.onLoadMoreJob();
        }
      }
    }
  }

  protected onLoadMoreJob (): void {
    this.isLoadingMoreJobs = true;
    this.offset = this.jobs.length;

    this.jobApiService.promiseGetAllJobs(
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
        this.totalCount = data.total;
        this.isLoadingMoreJobs = false;
      });
  }

  private getJobs (): void {

    this.jobApiService.promiseGetAllJobs(
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
        let compare = function ( a, b ): number {
          if ( a.isSelfCountry < b.isSelfCountry ) {
            return 1;
          }
          if ( a.isSelfCountry > b.isSelfCountry ) {
            return -1;
          }
          return 0;
        };

        data.jobs.sort( compare );
        this.jobs = data.jobs;
        this.oriJobs = data.jobs;
        console.log(this.oriJobs);
        this.totalCount = data.total;
      });
  }

  public searchJob (): void {
    this.router.navigate(['/job/search'], {
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
    dialogConfig.data = {
      filters: [this.isMarketingFilter, this.isManagementFilter, this.isSecurityFilter, this.isAnalystFilter,
        this.isITFilter, this.isMiningFilter, this.isOilGasFilter, this.isTaxFilter]
    };
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

  public onComposeJob (): Promise<boolean> {
    return this.router.navigate([`/job/compose`]);
  }
}
