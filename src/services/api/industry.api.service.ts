import {
  Injectable
} from '@angular/core';
import {
  ApiService
} from '../api.service';
import {
  IndustryModel,
  IResponse
} from '../../app/shared/models';
import {
  IndustryFactory
} from '../../app/shared/models/factory';

@Injectable()
export class IndustryApiService extends ApiService {
  public options = {};
  public baseURI = 'industry';
  public baseURIPlural = 'industries';

  public promiseGetAllIndustries (): Promise<IndustryModel[]> {
    return this.promiseGetAllResponseData('')
      .then((response: IResponse) => {
        return IndustryFactory.createMany(response.data);
      });
  }
}
