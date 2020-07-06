import {
    Injectable
} from '@angular/core';
import {
    ApiService
} from '../api.service';
import {
    ManualJobModel, IResponse
} from '../../app/shared/models';
import {
    ManualJobFactory, PostFactory
} from '../../app/shared/models/factory';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class ManualJobApiService extends ApiService {
    public options = {};
    public baseURI = 'manualJob';
    public baseURIPlural = 'manualJobs';

    public promiseGetManualJobs (userId?: number, limit?: number, offset?: number): Promise<ManualJobModel[]> {
        let params: HttpParams;

        if (userId) {
            params = new HttpParams()
            .set('userId', userId.toString());
        }

        return this.promiseGetAllResponseData(``, {params: params})
            .then((response: IResponse) => {
                return ManualJobFactory.createManyJob(response.data);
            });
    }

    public promiseGetManualJob (jobId?: number): Promise<ManualJobModel> {
        return this.promiseGetResponseData(`${jobId}`)
            .then((response: IResponse) => {
                return ManualJobFactory.createJob(response.data);
            });
    }

    public promisePostManualJob (job: ManualJobModel): Promise<IResponse> {
        return this.promisePostModelData(``, job)
            .then((response: IResponse) => {
                return response;
            });
    }

    public promiseRemoveManualJob (jobId: number): Promise<IResponse> {
        return this.promiseRemoveData(`${jobId}`)
            .then((response: IResponse) => {
                return response;
            });
    }

    public promiseUpdateManualJob (job: ManualJobModel, jobId: number): Promise<IResponse> {
        return this.promisePostModelData(`${jobId}`, job)
            .then((response: IResponse) => {
                return response;
            });
    }
}
