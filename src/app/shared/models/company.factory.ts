import {
  CompanyModel
} from './company';
import * as moment from 'moment';

export class CompanyFactory {
  public static createCompany (data: any): CompanyModel {
    return <CompanyModel> (new CompanyModel ())
      .assimilate(data);
  }

  public static createManyCompany (data: Array<CompanyModel>): Array<CompanyModel> {
    if (data !== undefined) {
      return data.map(
        instanceData => CompanyFactory.createCompany(instanceData),
      );
    } else {
      return null;
    }
  }
}
