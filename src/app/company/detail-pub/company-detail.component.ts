import { Component } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { CompanyApiService } from '../../../services/api';
import { CompanyModel, AttachmentModel } from '../../shared/models';
import { CryptoUtilities } from '../../shared/utilities';

@Component({
  selector: 'company-detail-component',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.scss'],
})
export class PublicCompanyDetailComponent {
  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private companyApiService: CompanyApiService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    const companyId = parseFloat(
      CryptoUtilities.decipher(route.snapshot.params.id)
    );
    this.companyId = companyId;
    this.getCompany(companyId);
  }

  protected company: CompanyModel;
  protected logo: AttachmentModel;
  protected images: AttachmentModel[] = [];
  protected companyId: number;

  public ngOnInit (): void {}

  private getCompany (id: number): void {
    this.companyApiService
      .promiseGetCompany(id)
      .then((company: CompanyModel) => {
        this.company = company;
        let attachs = this.company.companyAttachments;
        for ( let attach of attachs) {
          if ( attach.usage === 'logo') {
               this.logo = attach;
          } else if ( attach.usage === 'image') {
            this.images.push(attach);
          }
        }
      });
  }

  public ngOnDestroy (): void {}
}
