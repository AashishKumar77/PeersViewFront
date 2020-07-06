import {
  Component
} from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
import { ScholarshipApiService } from '../../../services/api';
import { UserModel, ScholarshipModel } from '../../shared/models';
import { UserService } from '../../../services';
import { CryptoUtilities } from '../../shared/utilities';

@Component({
  selector: 'scholarship-detail-component',
  templateUrl: './scholarship-detail.component.html',
  styleUrls: ['./scholarship-detail.component.scss']
})
export class ScholarshipDetailComponent {
  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private scholarshipApiService: ScholarshipApiService
  ) {
    this.user = UserService.getUser();
    const scholarshipId = parseFloat(CryptoUtilities.decipher(route.snapshot.params.id));
    this.getScholarship(scholarshipId);
  }

  protected scholarship: ScholarshipModel;
  protected user: UserModel = UserService.getUser();
  protected scholarshipTypes: any = [
    'Bachelor (Undergraduate)',
    'Master (Postgraduate)',
    'PhD (Doctorate)'
  ];

  public ngOnInit (): void {}

  private getScholarship (id: number): void {
    this.scholarshipApiService.promiseGetScholarship(id)
      .then((scholarship: ScholarshipModel) => {
        this.scholarship = scholarship;
      });
  }

  public ngOnDestroy (): void {}
}
