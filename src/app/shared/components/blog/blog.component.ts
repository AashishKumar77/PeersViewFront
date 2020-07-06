import {
  Component, EventEmitter,
  Input, Output,
  SimpleChanges
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  MatDialog,
  MatDialogRef,
  MatDialogConfig
} from '@angular/material';
import {
  Overlay
} from '@angular/cdk/overlay';
import {
  BlogModel,
  UserModel
} from '../../models';
import {
  BlogApiService
} from '../../../../services/api';
import {
  JobEmitter
} from '../../emitter';
import {
  CryptoUtilities
} from '../../../shared/utilities';
import {
  UserService,
} from '../../../../services';
import {
  SharedImagePreviewComponent, SharedConfirmModalComponent,
} from '../../modals';

@Component({
  selector: 'shared-blog-component',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class SharedBlogComponent {
  // public currentUser = UserService.getUser();
  constructor (
    private blogApiService: BlogApiService,
    private router: Router,
    private dialog: MatDialog,
    private overlay: Overlay
  ) {}

  @Input() protected items: Array<BlogModel> = [];
  // @Input() protected currentUser = UserService.getUser();
  @Input() protected route: {
    name: string,
    campusId?: number,
    campusFreshersFeedId?: number,
    campusCourseFeedId?: number,
    campusClassId?: number,
    userId?: number
  } = {name: 'home'};
  @Input() protected user: UserModel;
  @Output() protected loadRecord = new EventEmitter();
  protected btnLoadMoreText = 'Load More';
  protected notBlogMessage: string = 'No Blogs Yet.';
  private dialogRef: MatDialogRef<SharedImagePreviewComponent>;
  private limit = 5;
  private offset = 0;
  protected userJustVoted: boolean = false;
  protected isLoadingMoreBlogs: boolean = false;

  public ngOnInit (): void {
    // this.jobSavedSubcribers();
    // console.log(this.currentUser.id)
  }

  public ngOnChanges (changes: SimpleChanges): void {
    if (this.items.length === 0 && changes.items.previousValue) {
      this.notBlogMessage = 'No Blogs Yet.';
    }
  }

  private blogSavedSubcribers (): void {
    JobEmitter.jobSave()
      .subscribe((blog: BlogModel) => {
        this.items.unshift(blog);
      });
  }

  protected onClickUserProfile (user): Promise<boolean> {
    let userId = CryptoUtilities.cipher(user.id);
    let currentLoginUser = UserService.getUser();

    if (user.id === currentLoginUser.id) {
      return this.router.navigate([`/profile`]);
    }

    return this.router.navigate([`/profile/${userId}`]);
  }

  protected onDeleteBlog (blogId: number): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.panelClass = 'blog-delete-confirm-modal';
    dialogConfig.id = 'SharedConfirmModalComponent';
    dialogConfig.disableClose = true;
    dialogConfig.scrollStrategy = this.overlay.scrollStrategies.block();
    dialogConfig.data = {
      description: 'Do you want to proceed?'
    };
    this.dialog.open(SharedConfirmModalComponent, dialogConfig)
    .afterClosed()
    .subscribe(data => {
      if (data) {
        // delete here the job
        this.blogApiService.promiseRemoveBlog(blogId)
          .then(() => {
            // console.log(jobId)
            let index = this.items.findIndex(filter => filter.id === blogId);
            this.items.splice(index, 1);
            // alert("success");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  }

  protected showBlogDetail (blog: BlogModel): Promise<boolean> {
    let blogId = CryptoUtilities.cipher(blog.id);

    return this.router.navigate([`/blog/${blogId}`]);
  }

  // protected onEditBlog (blogid: number): Promise<boolean> {
  //   let blogId = CryptoUtilities.cipher(blogid);

  //   return this.router.navigate([`/compose-job/${blogId}`]);
  // }

  protected onLoadMoreBlog (): void {
    this.isLoadingMoreBlogs = true;
    this.offset = this.items.length;
    let campusId: any;

    this.blogApiService.promiseGetAllBlogs(this.limit, this.offset)
      .then((items: BlogModel[]) => {
        this.items = this.items.concat(items);
        // this.checkIfThereAreStillJobAvailable(jobs);
        this.isLoadingMoreBlogs = false;
      });
  }

  protected onClickPhoto (jobAttachments, imageIndex): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.panelClass = 'image-preview-modal';
    dialogConfig.id = 'ImagePreviewModal';
    dialogConfig.disableClose = true;
    dialogConfig.scrollStrategy = this.overlay.scrollStrategies.block();
    dialogConfig.data = { images: jobAttachments, clickIndex: imageIndex, source: 'job' };
    this.dialogRef = this.dialog.open(SharedImagePreviewComponent, dialogConfig);
  }

  protected getPollPercentage (pollOptions): any {
    pollOptions.map(optionData => {
      optionData.sum = parseFloat(optionData.sum) + 1;
      optionData.average = (optionData.count / optionData.sum) * 100;
      optionData.average = optionData.average.toFixed(2);

      return optionData;
    });
  }

  private checkIfThereAreStillJobAvailable (jobs: BlogModel[]): void {
    if (jobs.length === 0) {
      this.btnLoadMoreText = 'No More Jobs To Show';
    }
  }

  protected trimStory (message, maxCharacters): string {
    let trimmedString = message.substr(0, maxCharacters);
    return trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(' '))) + '...';
  }

  public ngOnDestroy (): void {
    JobEmitter.removeSubscriber(JobEmitter.getJobSaveName());
    JobEmitter.removeSubscriber(JobEmitter.getJobSaveName());
  }
  protected loadJob (): void {
    this.loadRecord.emit();
  }

  protected updateJob (data: any): void {
    console.log(data);
    // let index = this.jobs.indexOf(data.originJob);
    for (let i = 0; i < this.items.length; i ++) {
      if (this.items[i].id === data.updatedJob.id) {
        this.items[i] = data.updatedJob;
      }
    }
    // this.jobs[index] = data.updatedJob;
  }
}
