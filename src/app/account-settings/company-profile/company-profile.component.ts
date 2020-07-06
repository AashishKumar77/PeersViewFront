import { CompanyApiService } from './../../../services/api/company.api.service';
import { Component } from '@angular/core';
import { UserModel, CompanyModel } from '../../shared/models';
import { ActivatedRoute, Router } from '@angular/router';
import { UserApiService } from '../../../services/api';
import { CryptoUtilities } from '../../shared/utilities';

@Component({
  selector: 'company-profile-component',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss'],
})
export class CompanyProfileComponent {
  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private userApiService: UserApiService,
    private companyApiService: CompanyApiService
  ) {}

  protected userInfo: any = undefined;
  protected isAdmin: boolean = false;
  protected companies: any[] = [];
  public ngOnInit (): void {
    this.userApiService.promiseGetUser().then((userInfo: UserModel) => {
      this.userInfo = userInfo;

      this.companyApiService
        .promiseGetCompanyRight()
        .then((response) => {
          let result = response.result;
          if (result[0].admin !== 0) {
            this.isAdmin = true;
          } else if (result[1].admin !== 0) {
            this.isAdmin = false;
          }
          if (result[0].admin === 0 && result[1].admin === 0) {
            this.isAdmin = true;
          }

          if (this.isAdmin) {
            this.companyApiService.promiseGetCompanyAdmin().then((res) => {
              for (let c of res.result) {
                this.companies.push(c);
              }
            });
          } else {
            this.companyApiService.promiseGetCompanyUser().then((res) => {

              for (let c of res.result) {
                this.companies.push(c);
              }
            });
          }
        })
        .catch(() => {});
    });
  }

  public onComposeCompany (): Promise<boolean> {
    return this.router.navigate([`/companies/compose`]);
  }

  public editCompany (item: CompanyModel): Promise<boolean> {
    const companyId = CryptoUtilities.cipher(item.id);
    return this.router.navigate([`/companies/compose`, companyId]);
  }

  protected showCompanyDetail (company: CompanyModel): Promise<boolean> {
    let companyId = CryptoUtilities.cipher(company.id);
    return this.router.navigate([`/companies/${companyId}`]);
  }
}
