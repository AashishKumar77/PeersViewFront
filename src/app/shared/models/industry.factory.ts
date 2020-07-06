import {
  IndustryModel
} from './industry';

export class IndustryFactory {
  public static create (data: any): IndustryModel {
    return <IndustryModel> (new IndustryModel ())
      .assimilate(data);
  }

  public static createMany (data: Array<IndustryModel>): Array<IndustryModel> {
    return data.map(
      instanceData => IndustryFactory.create(instanceData),
    );
  }
}
