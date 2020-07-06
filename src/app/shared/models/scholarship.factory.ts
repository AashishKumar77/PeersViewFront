import * as moment from 'moment';
import { ScholarshipModel } from '.';

export class ScholarshipFactory {
  public static createScholarship (data: any): ScholarshipModel {
    return <ScholarshipModel> (new ScholarshipModel ())
      .assimilate(data);
  }

  public static createManyScholarship (data: Array<ScholarshipModel>): Array<ScholarshipModel> {
    return data.map(
      instanceData => ScholarshipFactory.createScholarship(instanceData),
    );
  }
}
