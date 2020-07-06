import {
  Component, EventEmitter,
  Input, Output,
  SimpleChanges
} from '@angular/core';
import {
  Router, ActivatedRoute
} from '@angular/router';
import { CompanyModel } from '../../shared/models';
import { CompanyApiService } from '../../../services/api';
import { CryptoUtilities } from '../../shared/utilities';

@Component({
  selector: 'company-card-suggested-component',
  templateUrl: './company-card-suggested.component.html',
  styleUrls: ['./company-card-suggested.component.scss']
})
export class CompanyCardSuggestedComponent {
  constructor (private router: Router,
    private route: ActivatedRoute,
    private companyApiService: CompanyApiService
    ) {}

  @Input() protected companyId: number;
  protected companys: CompanyModel[] = [];


  public ngOnInit (): void {
    this.companyApiService.promiseGetSuggestedCompany(this.companyId).then(res => {
      this.companys = res.result;
    });

  }

  protected trimStory (message, maxCharacters): string {
    if (message && message.length > maxCharacters) {
      let trimmedString = message.substr(0, maxCharacters);
      return trimmedString = trimmedString + '...';
    } else {
      return message;
    }
  }

  protected showCompanyDetail (company: CompanyModel): Promise<boolean> {
    let companyId = CryptoUtilities.cipher(company.id);
    return this.router.navigate([`/companies/public/${companyId}`], {
      relativeTo: this.route,
    });
  }
}
