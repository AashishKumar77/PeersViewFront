import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { Overlay } from '@angular/cdk/overlay';
import {
  CompanyApiService,
  CampusApiService,
  UserApiService,
} from '../../../services/api';
import { CryptoUtilities } from '../../shared/utilities';
import { CompanyModel, AttachmentModel } from '../../shared/models';

@Component({
  selector: 'company-card-component',
  templateUrl: './company-card.component.html',
  styleUrls: ['./company-card.component.scss'],
})
export class CompanyCardComponent {

  constructor (private router: Router) {}

  @Input() protected company: CompanyModel;
  protected logo: AttachmentModel;
  protected country: string = '';

  public ngOnInit (): void {
    let attachs = this.company.companyAttachments;
     for ( let attach of attachs) {
       if ( attach.usage === 'logo') {
            this.logo = attach;
       }
     }
     this.country = `${this.company.city}, ${this.company.country}`;
  }

  public ngOnChanges (changes: SimpleChanges): void {}

  protected trimStory (message, maxCharacters): string {
    if (message && message.length > maxCharacters) {
      let trimmedString = message.substr(0, maxCharacters);
      return (trimmedString = trimmedString + '...');
    } else {
      return message;
    }
  }

  protected showCompanyDetail (company: CompanyModel)  {
    let companyId = CryptoUtilities.cipher(company.id);
     this.router.navigate([`/companies/public/${companyId}`]).then(result => {  window.open(`/companies/public/${companyId}`, '_blank'); }) 
  
    
  }
}
