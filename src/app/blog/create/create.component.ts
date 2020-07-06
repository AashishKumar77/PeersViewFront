import {
  Component
} from '@angular/core';
import { BlogApiService, IndustryApiService } from '../../../services/api';
import { BlogModel, IndustryModel } from '../../shared/models';
import { ActivatedRoute, Router } from '@angular/router';
import { CryptoUtilities } from '../../shared/utilities';
import { CountriesService } from '../../../services';
import { AngularEditorConfig } from '../../shared/modules/text-editor';

@Component({
  selector: 'create-blog-component',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateBlogComponent {
  constructor (
    private blogApiService: BlogApiService,
    private industryApiService: IndustryApiService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    if (route.snapshot.params.id) {
      this.isEdit = true;
      const blogId = parseFloat(CryptoUtilities.decipher(route.snapshot.params.id));
      this.getBlog(blogId);
    }
    this.getIndustries();
  }

  private editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText'
      },
    ],
    uploadUrl: 'v1/image',
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['underline', 'strikeThrough'],
      ['heading', 'fontName', 'fontSize', 'color'],
      ['indent', 'outdent'],
      ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
      ['cut', 'copy', 'delete', 'removeFormat', 'undo', 'redo'],
      ['paragraph', 'blockquote', 'removeBlockquote', 'horizontalLine'],
      ['link', 'unlink', 'insertImage', 'insertVideo', 'insertHorizontalRule'],
      ['customClasses'],
      ['textColor', 'backgroundColor']
    ]
  };
  private form: BlogModel = new BlogModel;
  protected blog: BlogModel;
  private isEdit: boolean = false;
  protected countries: any[] = [];
  protected industries: IndustryModel[] = [];

  public ngOnInit (): void {
    this.countries = CountriesService.getCountries();
  }

  private getBlog (id: number): void {
    this.blogApiService.promiseGetBlog(id)
      .then((blog: BlogModel) => {
        this.form = blog;
      });
  }

  private getIndustries (): void {
    this.industryApiService.promiseGetAllIndustries()
      .then((industries: IndustryModel[]) => {
        // console.log(industries);
        this.industries = industries;
      });
  }

  protected checkDisable (): boolean {
    if (!this.form.title || this.form.title === '' || !this.form.content || this.form.content === '') {
      return true;
    } else {
      return false;
    }
  }

  protected onSave (isValid: boolean): void {
    if (!this.form.title || this.form.title === '' || !this.form.content || this.form.content === '') {
      return;
    }

    if (this.isEdit) {
      this.blogApiService.promiseUpdateBlog(this.form, this.form.id)
        .then((res) => {
          console.log(res);
          this.router.navigate([`/blog`], {relativeTo: this.route});
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      this.blogApiService.promisePostBlog(this.form)
        .then((res) => {
          console.log(res);
          this.router.navigate([`/blog`], {relativeTo: this.route});
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
}
