import {
  Component
} from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
import { JobApiService } from '../../../../services/api';
import { JobModel, UserModel } from '../../../shared/models';
import { UserService } from '../../../../services';
import { CryptoUtilities } from '../../../shared/utilities';
import { resources } from '../career-resources.data';

@Component({
  selector: 'job-career-resources-course-component',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class JobCareerResourcesCourseComponent {
  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private jobApiService: JobApiService
  ) {
    this.user = UserService.getUser();
    const courseId = route.snapshot.params.id;
    this.course = resources.find(item => item.id == courseId);
  }

  protected user: UserModel = UserService.getUser();
  public course: any;

  public ngOnInit (): void {}

  public ngOnDestroy (): void {}
}
