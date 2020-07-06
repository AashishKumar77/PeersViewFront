import {
    Injectable
} from '@angular/core';
import {
    ApiService
} from '../api.service';
import {
    SavedJobModel, IResponse
} from '../../app/shared/models';
import {
    SavedJobFactory, PostFactory
} from '../../app/shared/models/factory';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class SavedJobApiService extends ApiService {
    public options = {};
    public baseURI = 'savedJob';
    public baseURIPlural = 'savedJobs';

    public promiseGetSavedJobs (userId?: number, limit?: number, offset?: number): Promise<SavedJobModel[]> {
        let params: HttpParams;

        if (userId) {
            params = new HttpParams()
            .set('userId', userId.toString());
        }
        this.options = {
            params: params
        };
        return this.promiseGetAllResponseData(``, {params: params})
            .then((response: IResponse) => {
                return SavedJobFactory.createManyJob(response.data);
            });
    }

    public promiseGetSavedJob (jobId?: number): Promise<SavedJobModel> {
        return this.promiseGetResponseData(`${jobId}`)
            .then((response: IResponse) => {
                return SavedJobFactory.createJob(response.data);
            });
    }

    public promisePostSavedJob (job: SavedJobModel): Promise<IResponse> {
        return this.promisePostModelData(``, job)
            .then((response: IResponse) => {
                return response;
            });
    }

    public promiseRemoveSavedJob (jobId: number): Promise<IResponse> {
        return this.promiseRemoveData(`${jobId}`)
            .then((response: IResponse) => {
                return response;
            });
    }

    public promiseUpdateSavedJob (job: SavedJobModel, jobId: number): Promise<IResponse> {
        return this.promisePostModelData(`${jobId}`, job)
            .then((response: IResponse) => {
                return response;
            });
    }
}
