import {
  Component
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ScholarshipApiService } from '../../../services/api';
import { ScholarshipModel, UserModel } from '../../shared/models';
import { UserService } from '../../../services';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { Overlay } from '@angular/cdk/overlay';
import { ScholarshipFilterDialogComponent } from './scholarship-filter-modal/scholarship-filter-modal.component';

@Component({
  selector: 'scholarship-search-component',
  templateUrl: './scholarship-search.component.html',
  styleUrls: ['./scholarship-search.component.scss']
})
export class ScholarshipSearchComponent {
  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private overlay: Overlay,
    private scholarshipApiService: ScholarshipApiService
  ) {
    this.route.queryParams.subscribe(params => {
      this.scholarshipTitle = params['q'];
      this.region = params['region'];
    });

    if (this.scholarshipTitle && this.scholarshipTitle !== undefined || this.region && this.region !== undefined) {
      this.getSearchedScholarships();
    } else {
      this.getScholarships();
    }
    this.user = UserService.getUser();
  }

  protected scholarships: ScholarshipModel[] = [];
  protected oriScholarships: ScholarshipModel[] = [];
  protected user: UserModel = UserService.getUser();
  protected scholarshipTitle: string = '';
  protected region: string = '';
  protected isFulltimeFilter = false;
  protected isParttimeFilter = false;
  protected isIntershipFilter = false;
  protected isGraduaterolesFilter = false;

  private getScholarships (): void {
    this.scholarshipApiService.promiseGetScholarships()
      .then((scholarships: ScholarshipModel[]) => {
        let compare = function ( a, b ): number {
          if ( a.isSelfCountry < b.isSelfCountry ) {
            return 1;
          }
          if ( a.isSelfCountry > b.isSelfCountry ) {
            return -1;
          }
          return 0;
        };

        scholarships.sort( compare );
        this.scholarships = scholarships;
        this.oriScholarships = scholarships;
      });
  }

  public getSearchedScholarships (): void {
    this.scholarshipTitle = this.scholarshipTitle ? this.scholarshipTitle : '';
    this.region = this.region ? this.region : '';

    this.scholarshipApiService.promiseSearchScholarships(this.scholarshipTitle, this.region)
      .then((scholarships: ScholarshipModel[]) => {
        let compare = function ( a, b ): number {
          if ( a.isSelfCountry < b.isSelfCountry ) {
            return 1;
          }
          if ( a.isSelfCountry > b.isSelfCountry ) {
            return -1;
          }
          return 0;
        };

        scholarships.sort( compare );
        this.scholarships = scholarships;
        this.oriScholarships = scholarships;
      });
  }

  public searchScholarships (): void {
    this.router.navigate(['/scholarship'], { queryParams: { q: this.scholarshipTitle, region: this.region } });
    this.getSearchedScholarships();
  }

  public toggleFilterType (type: number): void {
    switch (type) {
      case 0:
        this.isFulltimeFilter = !this.isFulltimeFilter;
        break;
      case 1:
        this.isParttimeFilter = !this.isParttimeFilter;
        break;
      case 2:
        this.isIntershipFilter = !this.isIntershipFilter;
        break;
      case 3:
        this.isGraduaterolesFilter = !this.isGraduaterolesFilter;
        break;
      default:
        break;
    }

    this.filterScholarships();
  }

  private filterScholarships (): void {
    let scholarships: ScholarshipModel[] = [];

    if (this.isFulltimeFilter || this.isParttimeFilter || this.isIntershipFilter || this.isGraduaterolesFilter) {
      for (let i = 0; i < this.oriScholarships.length; i ++) {
        if (this.isFulltimeFilter && this.oriScholarships[i].type === 0) {
          scholarships.push(this.oriScholarships[i]);
        }
        if (this.isParttimeFilter && this.oriScholarships[i].type === 1) {
          scholarships.push(this.oriScholarships[i]);
        }
        if (this.isIntershipFilter && this.oriScholarships[i].type === 2) {
          scholarships.push(this.oriScholarships[i]);
        }
        if (this.isGraduaterolesFilter && this.oriScholarships[i].type === 3) {
          scholarships.push(this.oriScholarships[i]);
        }
      }

      this.scholarships = scholarships;
    } else {
      this.scholarships = this.oriScholarships;
    }
  }

  public openFilterModal (): void {
    let that = this;
    const dialogConfig = new MatDialogConfig();

    dialogConfig.panelClass = 'scholarship-filter-modal';
    dialogConfig.id = 'ScholarshipFilterModalDialogComponent';
    dialogConfig.disableClose = true;
    dialogConfig.scrollStrategy = this.overlay.scrollStrategies.block();
    dialogConfig.data = {
      filters: [this.isFulltimeFilter, this.isParttimeFilter, this.isIntershipFilter, this.isGraduaterolesFilter]
    };
    this.dialog.open(ScholarshipFilterDialogComponent, dialogConfig)
    .afterClosed()
    .subscribe(data => {
      if (data) {
        this.isGraduaterolesFilter = data[3];
        this.isIntershipFilter = data[2];
        this.isParttimeFilter = data[1];
        this.isFulltimeFilter = data[0];

        this.filterScholarships();
      }
    });
  }
}
