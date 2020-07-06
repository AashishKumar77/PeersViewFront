import {
  Component
} from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
import { BlogApiService } from '../../../services/api';
import { UserModel, BlogModel } from '../../shared/models';
import { UserService } from '../../../services';
import { CryptoUtilities } from '../../shared/utilities';

@Component({
  selector: 'blog-detail-component',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class BlogDetailComponent {
  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private blogApiService: BlogApiService
  ) {
    this.user = UserService.getUser();
    const blogId = parseFloat(CryptoUtilities.decipher(route.snapshot.params.id));
    this.getBlog(blogId);
  }

  protected blog: BlogModel;
  protected user: UserModel = UserService.getUser();
  protected blogTypes: any = [
    'Bachelor (Undergraduate)',
    'Master (Postgraduate)',
    'PhD (Doctorate)'
  ];

  public ngOnInit (): void {}

  private getBlog (id: number): void {
    this.blogApiService.promiseGetBlog(id)
      .then((blog: BlogModel) => {
        this.blog = blog;
      });
  }

  public ngOnDestroy (): void {}
}
