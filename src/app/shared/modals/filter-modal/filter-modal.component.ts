import {
  Component,
  OnInit,
  Inject
} from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA
} from '@angular/material';
import {
  UserApiService, IndustryApiService
} from '../../../../services/api';
import {
  IndustryModel
} from '../../../shared/models';
import { CountriesService } from '../../../../services';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-job-filter-modal',
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.scss']
})
export class JobFilterDialogComponent implements OnInit {

  constructor (
    @Inject (MAT_DIALOG_DATA)
    private data: any,
    private dialog: MatDialog,
    private userApiService: UserApiService,
    private industryApiService: IndustryApiService
  ) {
    this.getIndustries();
  }

  private form: any = {};
  private isEdit: boolean = false;
  protected country: string = '';
  protected industry: string = '';

  private industries: IndustryModel[] = [];
  private selectedIndustries: IndustryModel[] = [];
  private countries: any[] = [];
  private provinces: any[] = [];
  private jobTypes: any[] = [
    {
      label: 'Full-time',
      id: 0
    },
    {
      label: 'Part-time',
      id: 1
    },
    {
      label: 'Internship',
      id: 2
    },
    {
      label: 'Graduate Roles',
      id: 3
    },
    {
      label: 'Co-op',
      id: 4
    }
  ];
  // private aboutMe: string;

  public ngOnInit (): void {
    if (this.data.experience) {
      this.form = this.data.experience;
      this.isEdit = true;
    }
    this.countries = CountriesService.getCountries();
    this.provinces = CountriesService.getProvinces();
  }

  private getIndustries (): void {
    this.industryApiService.promiseGetAllIndustries()
      .then((industries: IndustryModel[]) => {
        // console.log(industries);
        this.industries = industries;
      });
  }

  protected selectIndustry (industry): void {
    let index = this.selectedIndustries.indexOf(industry);

    if (index > -1 ) {
      this.selectedIndustries.splice(index, 1);
    } else {
      this.selectedIndustries.push(industry);
    }
  }

  protected onCancel (): void {
    this.dialog.closeAll();
  }

  protected onSave (): void {
    let jobFilterModalComponent = this.dialog.getDialogById('JobFilterModalDialogComponent');

    let filters: any = {};

    if (this.form.companyName || this.form.companyName !== '') {
      filters.companyName = this.form.companyName;
    }
    if (this.form.country || this.form.country !== '') {
      filters.country = this.form.country;
    }
    if (this.form.province || this.form.province !== '') {
      filters.province = this.form.province;
    }
    if (this.form.city || this.form.city !== '') {
      filters.city = this.form.city;
    }

    if (this.form.jobType !== undefined) {
      filters.jobType = this.form.jobType;
    }

    if (this.selectedIndustries.length > 0) {
      filters.industries = this.selectedIndustries.map(industry => industry.id);
    }

    if (this.form.hiringCompanies) {
      filters.hiringCompanies = true;
    }

    if (this.form.workAuthorization) {
      filters.workAuthorization = true;
    }

    jobFilterModalComponent.close(filters);
  }
}
