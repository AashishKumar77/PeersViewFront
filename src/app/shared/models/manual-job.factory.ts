import {
  ManualJobModel
} from './manual-job';
import * as moment from 'moment';

export class ManualJobFactory {
  public static createJob (data: any): ManualJobModel {
    return <ManualJobModel> (new ManualJobModel ())
      .assimilate(data);
  }

  public static createManyJob (data: Array<ManualJobModel>): Array<ManualJobModel> {
    if (data !== undefined) {
      return data.map(
        instanceData => ManualJobFactory.createJob(instanceData),
      );
    } else {
      return null;
    }
  }
}
