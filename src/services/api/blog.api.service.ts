import {
    Injectable
} from '@angular/core';
import {
    ApiService
} from '../api.service';
import {
    BlogModel, IResponse
} from '../../app/shared/models';
import {
    BlogFactory, PostFactory
} from '../../app/shared/models/factory';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class BlogApiService extends ApiService {
    public options = {};
    public baseURI = 'blog';
    public baseURIPlural = 'blogs';

    public promiseGetUserBlogs (userId?: number, limit?: number, offset?: number): Promise<BlogModel[]> {
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
        return this.promiseGetAllResponseData(`user-blogs`)
            .then((response: IResponse) => {
                return BlogFactory.createManyBlog(response.data);
            });
    }

    public promiseGetAllBlogs (limit?: number, offset?: number): Promise<BlogModel[]> {
        let params: HttpParams;
        params = new HttpParams()
            .set('limit', limit.toString())
            .set('offset', offset.toString());

        return this.promiseGetAllResponseData('', {params: params})
            .then((response: IResponse) => {
                return BlogFactory.createManyBlog(response.data);
            });
    }

    public promiseGetBlogs (): Promise<BlogModel[]> {
        return this.promiseGetAllResponseData()
            .then((response: IResponse) => {
                return BlogFactory.createManyBlog(response.data);
            });
    }

    public promiseSearchBlogs (title: string): Promise<BlogModel[]> {
        return this.promiseGetResponseData(`search?q=${title}`)
            .then((response: IResponse) => {
                return BlogFactory.createManyBlog(response.data);
            });
    }

    public promiseGetBlog (blogId?: number): Promise<BlogModel> {
        return this.promiseGetResponseData(`get/${blogId}`)
            .then((response: IResponse) => {
                return BlogFactory.createBlog(response.data);
            });
    }

    public promisePostBlog (blog: BlogModel): Promise<IResponse> {
        return this.promisePostModelData(``, blog)
            .then((response: IResponse) => {
                return response;
            });
    }

    public promiseRemoveBlog (blogId: number): Promise<IResponse> {
        return this.promiseRemoveData(`${blogId}`)
            .then((response: IResponse) => {
                return response;
            });
    }

    public promiseUpdateBlog (blog: BlogModel, blogId: number): Promise<IResponse> {
        return this.promisePostModelData(`${blogId}`, blog)
            .then((response: IResponse) => {
                return response;
            });
    }
}
