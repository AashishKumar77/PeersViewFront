import {
  Component
} from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
import { JobApiService } from '../../../services/api';
import { JobModel, UserModel } from '../../shared/models';
import { UserService } from '../../../services';
import { CryptoUtilities } from '../../shared/utilities';
import { events } from './event.data';

@Component({
  selector: 'job-events-component',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class JobEventsComponent {
  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private jobApiService: JobApiService
  ) {
    this.user = UserService.getUser();
  }

  protected user: UserModel = UserService.getUser();
  public eventData: any = events;
  
  public ngOnInit (): void {}

  public ngOnDestroy (): void {}
}
