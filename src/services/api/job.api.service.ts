import {
    Injectable
} from '@angular/core';
import {
    ApiService
} from '../api.service';
import {
    JobModel, IResponse
} from '../../app/shared/models';
import {
    JobFactory, PostFactory
} from '../../app/shared/models/factory';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class JobApiService extends ApiService {
    public options = {};
    public baseURI = 'job';
    public baseURIPlural = 'jobs';

    public promiseGetUserJobs (userId?: number, limit?: number, offset?: number): Promise<JobModel[]> {
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
        return this.promiseGetAllResponseData(`user-jobs`)
            .then((response: IResponse) => {
                return JobFactory.createManyJob(response.data);
            });
    }

    public promiseGetAllJobs (
        limit?: number,
        offset?: number,
        title?: string,
        country?: string,
        province?: string,
        city?: string,
        companyName?: string,
        jobType?: number,
        industries?: Array<number>,
        hiringCompanies?: boolean,
        workAuthorization?: boolean
    ): Promise<{jobs: JobModel[], total: number}> {
        let params: HttpParams = new HttpParams();

        if (limit !== undefined && offset !== undefined) {
            params = params.append('limit', limit.toString());
            params = params.append('offset', offset.toString());
        }

        if (title) {
            params = params.append('title', title);
        }

        if (country && country !== '') {
            params = params.append('country', country);
        }
        if (province && province !== '') {
            params = params.append('province', province);
        }
        if (industries && industries.length > 0) {
            params = params.append('industries', industries.toString());
        }
        if (city && city !== '') {
            params = params.append('city', city);
        }
        if (companyName && companyName !== '') {
            params = params.append('companyName', companyName);
        }
        if (jobType) {
            params = params.append('jobType', jobType.toString());
        }
        if (hiringCompanies) {
            params = params.append('hiringCompanies', 'true');
        }
        if (workAuthorization) {
            params = params.append('workAuthorization', 'true');
        }

        return this.promiseGetAllResponseData('', {params: params})
            .then((response: IResponse) => {
                return {
                    jobs: JobFactory.createManyJob(response.data.jobs),
                    total: response.data.total
                };
            });
    }

    public promiseGetJobs (): Promise<{jobs: JobModel[], total: number}> {
        return this.promiseGetAllResponseData()
            .then((response: IResponse) => {
                return {
                    jobs: JobFactory.createManyJob(response.data.jobs),
                    total: response.data.total
                };
            });
    }

    public promiseGetPublicJobs (
        limit?: number,
        offset?: number,
        title?: string,
        country?: string,
        city?: string,
        companyName?: string,
        jobType?: number,
        industries?: Array<number>,
        hiringCompanies?: boolean,
        workAuthorization?: boolean
    ): Promise<{jobs: JobModel[], total: number}> {
        let params: HttpParams = new HttpParams();

        if (limit !== undefined && offset !== undefined) {
            params = params.append('limit', limit.toString());
            params = params.append('offset', offset.toString());
        }

        if (title) {
            params = params.append('title', title);
        }

        if (country) {
            params = params.append('country', country);
        }
        if (industries && industries.length > 0) {
            params = params.append('industries', industries.toString());
        }
        if (city) {
            params = params.append('city', city);
        }
        if (companyName && companyName !== '') {
            params = params.append('companyName', companyName);
        }
        if (jobType) {
            params = params.append('jobType', jobType.toString());
        }
        if (hiringCompanies) {
            params = params.append('hiringCompanies', 'true');
        }
        if (workAuthorization) {
            params = params.append('workAuthorization', 'true');
        }

        return this.promiseGetAllResponseData(`p-jobs`, {params: params})
            .then((response: IResponse) => {
                return {
                    jobs: JobFactory.createManyJob(response.data.jobs),
                    total: response.data.total
                };
            });
    }

    public promiseSearchJobs (title: string, region: string): Promise<JobModel[]> {
        return this.promiseGetResponseData(`search?q=${title}&r=${region}`)
            .then((response: IResponse) => {
                return JobFactory.createManyJob(response.data);
            });
    }

    public promiseGetJob (jobId?: number): Promise<JobModel> {
        return this.promiseGetResponseData(`${jobId}`)
            .then((response: IResponse) => {
                return JobFactory.createJob(response.data);
            });
    }

    public promisePostJob (job: JobModel): Promise<IResponse> {
        return this.promisePostModelData(``, job)
            .then((response: IResponse) => {
                return response;
            });
    }

    public promiseRemoveJob (jobId: number): Promise<IResponse> {
        return this.promiseRemoveData(`${jobId}`)
            .then((response: IResponse) => {
                return response;
            });
    }

    public promiseUpdateJob (job: JobModel, jobId: number): Promise<IResponse> {
        return this.promisePostModelData(`${jobId}`, job)
            .then((response: IResponse) => {
                return response;
            });
    }
}
