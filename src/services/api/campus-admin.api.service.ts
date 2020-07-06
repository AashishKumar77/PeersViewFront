import {
  Injectable
} from '@angular/core';
import {
  HttpParams
} from '@angular/common/http';
import {
  ApiService
} from '../api.service';
import { IResponse } from '../../app/shared/models';


@Injectable()
export class CampusAdminApiService extends ApiService {
  public options = {};
  public baseURI = 'campus-admin';
  public baseURIPlural = 'campus-admin';

  /**
   * Basically get the all the campuses
   */
  public getTodayOnlineStatus (): Promise<IResponse> {
    return this.promiseGetResponseData('online-user-status')
      .then((response: IResponse) => {
        return response;
      });
  }
}
