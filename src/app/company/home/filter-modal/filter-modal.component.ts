import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { IndustryApiService } from '../../../../services/api';
import { IndustryModel } from '../../../shared/models';
import { CountriesService } from '../../../../services';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-job-filter-modal',
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.scss'],
})
export class CompanyFilterDialogComponent implements OnInit {
  constructor (
    @Inject(MAT_DIALOG_DATA)
    private data: any,
    private dialog: MatDialog,
    private industryApiService: IndustryApiService
  ) {
    this.isMarketingFilter = data.filters[0];
    this.isManagementFilter = data.filters[1];
    this.isSecurityFilter = data.filters[2];
    this.isAnalystFilter = data.filters[3];
    this.isITFilter = data.filters[4];
    this.isMiningFilter = data.filters[5];
    this.isOilGasFilter = data.filters[6];
    this.isTaxFilter = data.filters[7];
    this.getIndustries();
  }

  private form: any = {};
  private isEdit: boolean = false;
  protected isMarketingFilter = false;
  protected isManagementFilter = false;
  protected isSecurityFilter = false;
  protected isAnalystFilter = false;
  protected isITFilter = false;
  protected isMiningFilter = false;
  protected isOilGasFilter = false;
  protected isTaxFilter = false;
  protected country: string = '';
  protected industry: string = '';

  private industries: IndustryModel[] = [];
  private selectedIndustries: IndustryModel[] = [];
  private countries: any[] = [];

  public ngOnInit (): void {
    this.countries = CountriesService.getCountries();
  }

  private getIndustries (): void {
    this.industryApiService
      .promiseGetAllIndustries()
      .then((industries: IndustryModel[]) => {
        this.industries = industries;
      });
  }

  protected selectIndustry (industry): void {
    let index = this.selectedIndustries.indexOf(industry);

    if (index > -1) {
      this.selectedIndustries.splice(index, 1);
    } else {
      this.selectedIndustries.push(industry);
    }
  }

  protected onCancel (): void {
    this.dialog.closeAll();
  }

  protected onSave (): void {
    let companyFilterModalComponent = this.dialog.getDialogById(
      'CompanyFilterModalDialogComponent'
    );

    let filters: any = {};

    if (this.form.companyName || this.form.companyName !== '') {
      filters.companyName = this.form.companyName;
    }
    if (this.form.country || this.form.country !== '') {
      filters.country = this.form.country;
    }
    if (this.form.city || this.form.city !== '') {
      filters.city = this.form.city;
    }

    if (this.selectedIndustries.length > 0) {
      filters.industries = this.selectedIndustries.map(
        (industry) => industry.id
      );
    }

    if (this.form.hiringCompanies) {
      filters.hiringCompanies = true;
    }

    companyFilterModalComponent.close(filters);
  }
}
