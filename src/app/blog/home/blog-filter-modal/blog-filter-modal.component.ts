import {
  Component,
  OnInit,
  Inject
} from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA
} from '@angular/material';
import {
  UserApiService
} from '../../../../services/api';
import {
  UserModel
} from '../../../shared/models';

@Component({
  selector: 'app-blog-filter-modal',
  templateUrl: './blog-filter-modal.component.html',
  styleUrls: ['./blog-filter-modal.component.scss']
})
export class BlogFilterDialogComponent implements OnInit {

  constructor (
    @Inject (MAT_DIALOG_DATA)
    private data: any,
    private dialog: MatDialog,
    private userApiService: UserApiService
  ) {
    console.log(data);
    this.isFulltimeFilter = data.filters[0];
    this.isParttimeFilter = data.filters[1];
    this.isIntershipFilter = data.filters[2];
  }

  private form: any = {};
  private isEdit: boolean = false;
  protected isFulltimeFilter = false;
  protected isParttimeFilter = false;
  protected isIntershipFilter = false;

  private user: UserModel = new UserModel();
  // private aboutMe: string;

  public ngOnInit (): void {
    console.log(this.data);
    if (this.data.experience) {
      this.form = this.data.experience;
      this.isEdit = true;
    }
  }

  public toggleFilterType (type: number): void {
    switch (type) {
      case 0:
        this.isFulltimeFilter = !this.isFulltimeFilter;
        break;
      case 1:
        this.isParttimeFilter = !this.isParttimeFilter;
        break;
      case 2:
        this.isIntershipFilter = !this.isIntershipFilter;
        break;
      default:
        break;
    }
  }

  protected onCancel (): void {
    this.dialog.closeAll();
  }

  protected onSave (): void {
    // if (this.form.name && this.form.role && this.form.from && this.form.to) {
      // this.userApiService.promiseUpdateWorkExperience(this.form)
      // .then((res) => {
        let addExperienceModelComponentRef = this.dialog.getDialogById('ScholarshipFilterModalDialogComponent');
        let filters = [this.isFulltimeFilter, this.isParttimeFilter, this.isIntershipFilter];
        addExperienceModelComponentRef.close(filters);
      // })
      // .catch(error => {

      // });
    // }
  }
}
