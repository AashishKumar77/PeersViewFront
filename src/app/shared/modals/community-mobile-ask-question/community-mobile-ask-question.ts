import {
	Component,
	Inject
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogConfig
} from '@angular/material';
import {
  CommunityPostModel,
  UserModel
} from '../../models';
import {
  CommunityApiService
} from '../../../../services/api';
import {
  PostEmitter
} from '../../emitter';
import {
  SharedImagePreviewComponent
} from '..';
import {
  Overlay
} from '@angular/cdk/overlay';
import { AngularEditorConfig } from '../../modules/text-editor';

@Component({
	selector: 'community-mobile-ask-question-component',
	templateUrl: './community-mobile-ask-question.html',
	styleUrls: ['./community-mobile-ask-question.scss']
})
export class ComunityMobileAskQuestionMobileComponent {
	constructor (
		@Inject(MAT_DIALOG_DATA) protected confirmActionData: any,
    private dialog: MatDialog,
    private communityApiService: CommunityApiService,
    private overlay: Overlay
	) {}

	protected user: UserModel = this.confirmActionData.user;
  protected communityPost: CommunityPostModel = this.confirmActionData.communityPost;
  protected isToggleUploadComponentVisible: boolean = false;
  private hasImageSelected: boolean = false;

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

  protected onUploadComplete (attachments): void {
    this.communityPost.attachments = attachments;
    this.createQuestion();
  }

  protected onImageIsSelected (value): void {
    this.hasImageSelected = value;
  }

  protected onAskQuestion (): void {
    if (this.hasImageSelected) {
      PostEmitter.uploadImages().emit();
    } else {
      this.createQuestion();
    }
  }

  private createQuestion (): void {
    this.communityPost.area = 'community';
    this.communityPost.type = 'post';

    this.communityApiService.promiseCreateStudentCommunityPosts(this.communityPost)
      .then(() => {
        this.communityPost.init();
        let sharedCommunityMobileAskQuestionMobileComponent = this.dialog.getDialogById('SharedCommunityMobileAskQuestionMobileComponent');
        sharedCommunityMobileAskQuestionMobileComponent.close(this.communityPost);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  protected onOpenShowImageDialogComponent (user): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.panelClass = 'image-preview-modal';
    dialogConfig.id = 'ImagePreviewModal';
    dialogConfig.disableClose = true;
    dialogConfig.scrollStrategy = this.overlay.scrollStrategies.block();
    dialogConfig.data = {
      image: user.socialImage
        ? (user.profilePicture === 'avatar' ? user.socialImage : user.profilePicture)
        : user.profilePicture,
      source: 'profile-picture'
    };
    this.dialog.open(SharedImagePreviewComponent, dialogConfig);
  }
}
