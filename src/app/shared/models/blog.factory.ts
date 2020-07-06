import * as moment from 'moment';
import { BlogModel } from '.';

export class BlogFactory {
  public static createBlog (data: any): BlogModel {
    return <BlogModel> (new BlogModel ())
      .assimilate(data);
  }

  public static createManyBlog (data: Array<BlogModel>): Array<BlogModel> {
    return data.map(
      instanceData => BlogFactory.createBlog(instanceData),
    );
  }
}
