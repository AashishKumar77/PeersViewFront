import {
  Component
} from '@angular/core';
import { ScholarshipApiService, IndustryApiService } from '../../../services/api';
import { ScholarshipModel, IndustryModel } from '../../shared/models';
import { ActivatedRoute, Router } from '@angular/router';
import { CryptoUtilities } from '../../shared/utilities';
import { CountriesService } from '../../../services';

@Component({
  selector: 'compose-scholarship-component',
  templateUrl: './compose-scholarship.component.html',
  styleUrls: ['./compose-scholarship.component.scss']
})
export class ComposeScholarshipComponent {
  constructor (
    private scholarshipApiService: ScholarshipApiService,
    private industryApiService: IndustryApiService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    if (route.snapshot.params.id) {
      this.isEdit = true;
      const scholarshipId = parseFloat(CryptoUtilities.decipher(route.snapshot.params.id));
      this.getScholarship(scholarshipId);
    }
    this.getIndustries();
  }

  private form: ScholarshipModel = new ScholarshipModel;
  protected scholarship: ScholarshipModel;
  private isEdit: boolean = false;
  protected countries: any[] = [];
  protected industries: IndustryModel[] = [];

  public ngOnInit (): void {
    this.countries = CountriesService.getCountries();
  }

  private getScholarship (id: number): void {
    this.scholarshipApiService.promiseGetScholarship(id)
      .then((scholarship: ScholarshipModel) => {
        this.form = scholarship;
      });
  }

  private getIndustries (): void {
    this.industryApiService.promiseGetAllIndustries()
      .then((industries: IndustryModel[]) => {
        // console.log(industries);
        this.industries = industries;
      });
  }

  protected onSave (isValid: boolean): void {
    if (!isValid) {
      return;
    }

    if (this.isEdit) {
      this.scholarshipApiService.promiseUpdateScholarship(this.form, this.form.id)
        .then((res) => {
          console.log(res);
          this.router.navigate([`/scholarship`], {relativeTo: this.route});
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      this.scholarshipApiService.promisePostScholarship(this.form)
        .then((res) => {
          console.log(res);
          this.router.navigate([`/scholarship`], {relativeTo: this.route});
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
}
