import {
  Component
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogApiService } from '../../../services/api';
import { BlogModel, UserModel } from '../../shared/models';
import { UserService } from '../../../services';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { Overlay } from '@angular/cdk/overlay';
import { BlogFilterDialogComponent } from './blog-filter-modal/blog-filter-modal.component';

@Component({
  selector: 'blog-home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class BlogHomeComponent {
  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private overlay: Overlay,
    private blogApiService: BlogApiService
  ) {
    this.route.queryParams.subscribe(params => {
      this.blogTitle = params['q'];
      this.region = params['region'];
    });

    if (this.blogTitle && this.blogTitle !== undefined || this.region && this.region !== undefined) {
      this.getSearchedBlogs();
    } else {
      this.getBlogs();
    }
    this.user = UserService.getUser();
  }

  protected blogs: BlogModel[] = [];
  protected oriBlogs: BlogModel[] = [];
  protected user: UserModel = UserService.getUser();
  protected blogTitle: string = '';
  protected region: string = '';
  protected isFulltimeFilter = false;
  protected isParttimeFilter = false;
  protected isIntershipFilter = false;
  protected isGraduaterolesFilter = false;

  private getBlogs (): void {
    this.blogApiService.promiseGetBlogs()
      .then((blogs: BlogModel[]) => {
        this.blogs = blogs;
        this.oriBlogs = blogs;
      });
  }

  public getSearchedBlogs (): void {
    this.blogTitle = this.blogTitle ? this.blogTitle : '';
    this.region = this.region ? this.region : '';

    this.blogApiService.promiseSearchBlogs(this.blogTitle)
      .then((blogs: BlogModel[]) => {
        this.blogs = blogs;
        this.oriBlogs = blogs;
      });
  }

  public searchBlogs (): void {
    this.router.navigate(['/blog'], { queryParams: { q: this.blogTitle } });
    this.getSearchedBlogs();
  }
}
