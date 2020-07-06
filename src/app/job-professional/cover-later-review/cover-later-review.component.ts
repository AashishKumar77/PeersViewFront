import {
  Component
} from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
import { JobApiService } from '../../../services/api';
import { JobModel, UserModel } from '../../shared/models';
import { UserService } from '../../../services';
import { CryptoUtilities } from '../../shared/utilities';

@Component({
  selector: 'job-cover-later-review-component',
  templateUrl: './cover-later-review.component.html',
  styleUrls: ['./cover-later-review.component.scss']
})
export class JobCoverLaterReviewComponent {
  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private jobApiService: JobApiService
  ) { }

  protected logoFile: any;
  public ngOnInit (): void {}

  protected onFileChange (event): void {
    this.logoFile = event.target.files[0];
    console.log("this.logoFile",this.logoFile)
  }

  public ngOnDestroy (): void {}
}
