import {
  Component
} from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
import { JobApiService } from '../../../services/api';
import { JobModel, UserModel } from '../../shared/models';
import { UserService } from '../../../services';
import { CryptoUtilities } from '../../shared/utilities';

@Component({
  selector: 'job-resume-review-component',
  templateUrl: './resume-review.component.html',
  styleUrls: ['./resume-review.component.scss']
})
export class JobResumeReviewComponent {
  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private jobApiService: JobApiService
  ) { }

  protected logoFile: any;
  protected url:any;
  public ngOnInit (): void {}

  protected onFileChange (event): void {
    this.logoFile = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]); // read file as data url
    reader.onload = (event) => { // called once readAsDataURL is completed
      this.url = event.target.result;
    console.log("this.logoFile",this.logoFile ,"ddf",this.url)
    }
  }

  public ngOnDestroy (): void {}
}
