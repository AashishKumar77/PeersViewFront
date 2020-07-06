import {
    Injectable
} from '@angular/core';
import {
    ApiService
} from '../api.service';
import {
    CompanyModel, IResponse
} from '../../app/shared/models';
import {
    CompanyFactory, PostFactory
} from '../../app/shared/models/factory';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class CompanyApiService extends ApiService {
    public options = {};
    public baseURI = 'company';
    public baseURIPlural = 'companys';

    public promiseGetAllCompanys (
        limit?: number,
        offset?: number,
        company?: string,
        region?: string
    ): Promise<{companys: CompanyModel[], total: number}> {
        let params: HttpParams = new HttpParams();

        if (limit !== undefined && offset !== undefined) {
            params = params.append('limit', limit.toString());
            params = params.append('offset', offset.toString());
        }

        if (company) {
            params = params.append('company', company);
        }

        if (region) {
            params = params.append('region', region);
        }
        return this.promiseGetAllResponseData('', {params: params})
            .then((response: IResponse) => {
                return {
                    companys: CompanyFactory.createManyCompany(response.data.companys),
                    total: response.data.total
                };
            });
    }

    public promiseGetCompanys (): Promise<{companys: CompanyModel[], total: number}> {
        return this.promiseGetAllResponseData()
            .then((response: IResponse) => {
                return {
                    companys: CompanyFactory.createManyCompany(response.data.companys),
                    total: response.data.total
                };
            });
    }

    public promiseGetCompany (companyId?: number): Promise<CompanyModel> {
        return this.promiseGetResponseData(`${companyId}`)
            .then((response: IResponse) => {
                return CompanyFactory.createCompany(response.data);
            });
    }

    public promisePostCompany (company: CompanyModel): Promise<IResponse> {
        return this.promisePostModelData(``, company)
            .then((response: IResponse) => {
                return response;
            });
    }

    public promiseRemoveCompany (companyId: number): Promise<IResponse> {
        return this.promiseRemoveData(`${companyId}`)
            .then((response: IResponse) => {
                return response;
            });
    }

    public promiseUpdateCompany (company: CompanyModel, companyId: number): Promise<IResponse> {
        return this.promisePostModelData(`${companyId}`, company)
            .then((response: IResponse) => {
                return response;
            });
    }
    public promiseGetCompanyRight (): Promise<any> {
        return this.promiseGetResponseData('right/list')
            .then((response: IResponse) => {
                return {
                    result: CompanyFactory.createManyCompany(response.data),
                    total: response.data.total
                };
            });
    }
    public promiseGetCompanyAdmin (): Promise<any> {
        return this.promiseGetResponseData('admin/all')
            .then((response: IResponse) => {
                return {
                    result: CompanyFactory.createManyCompany(response.data),
                    total: response.data.total
                };
            });
    }
    public promiseGetCompanyUser (): Promise<any> {
        return this.promiseGetResponseData('user/all')
            .then((response: IResponse) => {
                return {
                    result: CompanyFactory.createManyCompany(response.data),
                    total: response.data.total
                };
            });
    }

    public promiseDeleteCompanyAttachment (id: number): Promise<IResponse> {
        return this.promiseRemoveData(`attachment/${id}`)
        .then((responseData: IResponse) => {
          return responseData;
        });
      }

      public promiseGetSuggestedCompany (id: number): Promise<any> {
        return this.promiseGetResponseData(`suggestion/list?companyId=${id}`)
            .then((response: IResponse) => {
                return {
                    result: CompanyFactory.createManyCompany(response.data),
                    total: response.data.total
                };
            });
    }
}
