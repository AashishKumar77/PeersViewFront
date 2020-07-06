import { AttachmentModel } from './../../shared/models/company';
import { Component } from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { CompanyApiService } from '../../../services/api';
import { CompanyModel } from '../../shared/models';
import { CryptoUtilities } from '../../shared/utilities';

@Component({
  selector: 'company-detail-component',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.scss'],
})
export class CompanyDetailComponent {
  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private companyApiService: CompanyApiService
  ) {
    }

  protected company: CompanyModel;
  protected logo: AttachmentModel;
  protected images: AttachmentModel[] = [];
  protected videos: AttachmentModel[] = [];
  protected companyId: number;

  public ngOnInit (): void {
    this.route.params.subscribe(routeParams => {
      const companyId = parseFloat(
        CryptoUtilities.decipher(routeParams.id)
      );
      this.companyId = companyId;
      this.getCompany(companyId);

    });
  }

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
          } else if ( attach.usage === 'video') {
            this.videos.push(attach);
          }
        }
      });
  }

  public ngOnDestroy (): void {}
}
