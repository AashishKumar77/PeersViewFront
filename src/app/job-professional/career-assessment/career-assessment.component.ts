import {
  Component
} from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
import { JobApiService } from '../../../services/api';
import { JobModel, UserModel } from '../../shared/models';
import { UserService } from '../../../services';
import { CryptoUtilities } from '../../shared/utilities';

@Component({
  selector: 'job-career-assessment-component',
  templateUrl: './career-assessment.component.html',
  styleUrls: ['./career-assessment.component.scss']
})
export class JobCareerAssessmentComponent {
  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private jobApiService: JobApiService
  ) {
    this.user = UserService.getUser();
  }

  protected user: UserModel = UserService.getUser();

  public ngOnInit (): void {}

  public ngOnDestroy (): void {}
}
