import {
  SavedJobModel
} from './saved-job';
import * as moment from 'moment';

export class SavedJobFactory {
  public static createJob (data: any): SavedJobModel {
    return <SavedJobModel> (new SavedJobModel ())
      .assimilate(data);
  }

  public static createManyJob (data: Array<SavedJobModel>): Array<SavedJobModel> {
    if (data !== undefined) {
      return data.map(
        instanceData => SavedJobFactory.createJob(instanceData),
      );
    } else {
      return null;
    }
  }
}
