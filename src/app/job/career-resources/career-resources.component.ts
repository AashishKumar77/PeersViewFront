import {
  Component
} from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
import { JobApiService } from '../../../services/api';
import { JobModel, UserModel } from '../../shared/models';
import { UserService } from '../../../services';
import { CryptoUtilities } from '../../shared/utilities';
import { resources } from './career-resources.data';

@Component({
  selector: 'job-career-resources-component',
  templateUrl: './career-resources.component.html',
  styleUrls: ['./career-resources.component.scss']
})
export class JobCareerResourcesComponent {
  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private jobApiService: JobApiService
  ) {
    this.user = UserService.getUser();
  }

  protected user: UserModel = UserService.getUser();
  public careerResources: any = resources;
  
  public ngOnInit (): void {}

  public ngOnDestroy (): void {}
}
