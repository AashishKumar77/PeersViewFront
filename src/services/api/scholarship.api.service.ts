import {
    Injectable
} from '@angular/core';
import {
    ApiService
} from '../api.service';
import {
    ScholarshipModel, IResponse
} from '../../app/shared/models';
import {
    ScholarshipFactory, PostFactory
} from '../../app/shared/models/factory';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class ScholarshipApiService extends ApiService {
    public options = {};
    public baseURI = 'scholarship';
    public baseURIPlural = 'scholarships';

    public promiseGetUserScholarships (userId?: number, limit?: number, offset?: number): Promise<ScholarshipModel[]> {
        let params: HttpParams;

        if (userId) {
            params = new HttpParams()
            .set('limit', limit.toString())
            .set('offset', offset.toString())
            .set('userId', userId.toString());
        } else {
            params = new HttpParams()
            .set('limit', limit.toString())
            .set('offset', offset.toString());
        }
        this.options = {
            params: params
        };
        return this.promiseGetAllResponseData(`user-scholarships`)
            .then((response: IResponse) => {
                return ScholarshipFactory.createManyScholarship(response.data);
            });
    }

    public promiseGetAllScholarships (limit?: number, offset?: number): Promise<ScholarshipModel[]> {
        let params: HttpParams;
        params = new HttpParams()
            .set('limit', limit.toString())
            .set('offset', offset.toString());

        return this.promiseGetAllResponseData('', {params: params})
            .then((response: IResponse) => {
                return ScholarshipFactory.createManyScholarship(response.data);
            });
    }

    public promiseGetScholarships (): Promise<ScholarshipModel[]> {
        return this.promiseGetAllResponseData()
            .then((response: IResponse) => {
                return ScholarshipFactory.createManyScholarship(response.data);
            });
    }

    public promiseSearchScholarships (title: string, region: string): Promise<ScholarshipModel[]> {
        return this.promiseGetResponseData(`search?q=${title}&r=${region}`)
            .then((response: IResponse) => {
                return ScholarshipFactory.createManyScholarship(response.data);
            });
    }

    public promiseGetScholarship (scholarshipId?: number): Promise<ScholarshipModel> {
        return this.promiseGetResponseData(`${scholarshipId}`)
            .then((response: IResponse) => {
                return ScholarshipFactory.createScholarship(response.data);
            });
    }

    public promisePostScholarship (scholarship: ScholarshipModel): Promise<IResponse> {
        return this.promisePostModelData(``, scholarship)
            .then((response: IResponse) => {
                return response;
            });
    }

    public promiseRemoveScholarship (scholarshipId: number): Promise<IResponse> {
        return this.promiseRemoveData(`${scholarshipId}`)
            .then((response: IResponse) => {
                return response;
            });
    }

    public promiseUpdateScholarship (scholarship: ScholarshipModel, scholarshipId: number): Promise<IResponse> {
        return this.promisePostModelData(`${scholarshipId}`, scholarship)
            .then((response: IResponse) => {
                return response;
            });
    }
}
