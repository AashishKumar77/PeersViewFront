import {
  Component,
  OnInit,
  Input,
  Output,
  NgZone,
  EventEmitter,
  ElementRef,
} from '@angular/core';
import {
  FileUploader,
  FileUploaderOptions,
  ParsedResponseHeaders,
  FileItem,
} from 'ng2-file-upload';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { UserService } from '../../../../services';
import { EmitterService } from '../../emitter/emitter.component';
import { CompanyEmitter } from '../../emitter';
import { UserModel } from '../../models';

@Component({
  selector: 'shared-company-upload-image-component',
  templateUrl: './company-upload-image.component.html',
  styleUrls: ['./company-upload-image.component.scss'],
})
export class SharedCompanyUploadImageComponent {
  constructor (
    private cloudinary: Cloudinary,
    private zone: NgZone,
    private elRef: ElementRef
  ) {}

  protected imagesToUpload: Array<string> = [];
  protected imagesToUpload1: Array<string> = [];
  protected responses: Array<any> = [];
  protected responses1: Array<any> = [];
  protected queuedImageOrientation: Array<string> = [];
  private uploader: FileUploader;
  private uploader1: FileUploader;
  private hasBaseDropZoneOver: boolean = false;
  private user: UserModel = UserService.getUser();
  private uploadCompleteEmitterService = EmitterService.get(
    'uploadCompleteEmitter'
  );
  @Output() private uploadComplete = new EventEmitter();
  @Output() private imageIsSelected = new EventEmitter();
  protected isUploadStarted: boolean = false;
  protected isUploadComplete: boolean = false;

  @Output() private uploadComplete1 = new EventEmitter();
  @Output() private imageIsSelected1 = new EventEmitter();

  private firstImage: boolean = false;
  private secondImage: boolean = false;

  @Input() private uploadOptions: any;
  protected postAttachments = [];

  public ngOnInit (): void {
    this.uploadImagesSubscriber();

    // Create the file uploader, wire it to upload to your account
    const uploaderOptions: FileUploaderOptions = {
      // cloud_name must be added on the cloudinary configuration in the shared module
      url: `https://api.cloudinary.com/v1_1/${
        this.cloudinary.config().cloud_name
      }/upload`,
      // url: 'https://api.cloudinary.com/v1_1/renchtolens/upload',
      autoUpload: false,
      isHTML5: true,
      queueLimit: 1,
      headers: [
        {
          name: 'X-Requested-With',
          value: 'XMLHttpRequest',
        },
      ],
    };

    const uploaderOptions1: FileUploaderOptions = {
      // cloud_name must be added on the cloudinary configuration in the shared module
      url: `https://api.cloudinary.com/v1_1/${
        this.cloudinary.config().cloud_name
      }/upload`,
      // url: 'https://api.cloudinary.com/v1_1/renchtolens/upload',
      autoUpload: false,
      isHTML5: true,
      queueLimit: 5,
      headers: [
        {
          name: 'X-Requested-With',
          value: 'XMLHttpRequest',
        },
      ],
    };
    this.uploader = new FileUploader(uploaderOptions);
    this.uploader1 = new FileUploader(uploaderOptions1);

    this.uploader.onAfterAddingFile = (item: any) => {
      this.imageIsSelected.emit(true);
      this.firstImage = true;
      let reader = new FileReader();
      reader.readAsDataURL(item.file.rawFile);
      reader.onload = (ev) => {
        this.imagesToUpload.push(ev.target['result']);
        this.getImageOrientation(ev.target['result']);
      };
      return item;
    };

    this.uploader1.onAfterAddingFile = (item: any) => {
      this.imageIsSelected1.emit(true);
      this.secondImage = true;
      let reader = new FileReader();
      reader.readAsDataURL(item.file.rawFile);
      reader.onload = (ev) => {
        this.imagesToUpload1.push(ev.target['result']);
        this.getImageOrientation(ev.target['result']);
      };
      return item;
    };

    this.uploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
      // upload_preset must be added on the cloudinary configuration in the shared module
      // form.append('upload_preset', this.cloudinary.config().upload_preset);
      form.append('upload_preset', 'peersview');
      form.append('folder', 'company');
      form.append('file', fileItem);

      fileItem.withCredentials = false;
      return { fileItem, form };
    };

    this.uploader1.onBuildItemForm = (fileItem: any, form: FormData): any => {
      // upload_preset must be added on the cloudinary configuration in the shared module
      // form.append('upload_preset', this.cloudinary.config().upload_preset);
      form.append('upload_preset', 'peersview');
      form.append('folder', 'company');
      form.append('file', fileItem);

      fileItem.withCredentials = false;
      return { fileItem, form };
    };

    // Insert or update an entry in the responses array
    const upsertResponse = (fileItem) => {
      this.zone.run(() => {
        const existingId = this.responses.reduce((prev, current, index) => {
          if (current.file.name === fileItem.file.name && !current.status) {
            return index;
          }
          return prev;
        }, -1);
        if (existingId > -1) {
          this.responses[existingId] = Object.assign(
            this.responses[existingId],
            fileItem
          );
        } else {
          this.responses.push(fileItem);
        }
      });
    };

    // Insert or update an entry in the responses array
    const upsertResponse1 = (fileItem) => {
      this.zone.run(() => {
        const existingId = this.responses1.reduce((prev, current, index) => {
          if (current.file.name === fileItem.file.name && !current.status) {
            return index;
          }
          return prev;
        }, -1);
        if (existingId > -1) {
          this.responses1[existingId] = Object.assign(
            this.responses1[existingId],
            fileItem
          );
        } else {
          this.responses1.push(fileItem);
        }
      });
    };

    // Update model on completion of uploading a file
    this.uploader.onCompleteItem = (
      item: any,
      response: string,
      status: number,
      headers: ParsedResponseHeaders
    ) => {
      upsertResponse({
        file: item.file,
        status,
        data: JSON.parse(response),
      });
    };

    // Update model on completion of uploading a file
    this.uploader1.onCompleteItem = (
      item: any,
      response: string,
      status: number,
      headers: ParsedResponseHeaders
    ) => {
      upsertResponse1({
        file: item.file,
        status,
        data: JSON.parse(response),
      });
    };

    this.uploader.onCompleteAll = () => {
      this.isUploadComplete = true;
      for (let i = 0; i < this.responses.length; i++) {
        this.postAttachments.push({
          cloudinaryPublicId: this.responses[i].data.public_id,
          usage: 'logo',
        });
      }
      if (!this.secondImage) {
        this.uploadComplete.emit(this.postAttachments);
      }
      this.imagesToUpload = [];
    };

    this.uploader1.onCompleteAll = () => {
      this.isUploadComplete = true;
      for (let i = 0; i < this.responses1.length; i++) {
        this.postAttachments.push({
          cloudinaryPublicId: this.responses1[i].data.public_id,
          usage: this.responses1[i].data.resource_type,
        });
      }
      this.uploadComplete.emit(this.postAttachments);
      this.imagesToUpload1 = [];
    };
  }

  public uploadImagesSubscriber (): void {
    CompanyEmitter.uploadImages().subscribe((response) => {
      let flag = false;
      if (this.imagesToUpload.length !== 0) {
        this.isUploadStarted = true;
        this.uploader.uploadAll();
        flag = true;
      }
      if (this.imagesToUpload1.length !== 0) {
        this.isUploadStarted = true;
        this.uploader1.uploadAll();
        flag = true;
      }
      if (!flag) {
        this.uploadComplete.emit([]);

      }
    });
  }

  protected onFileOverBase (e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  protected onRemoveFromQueue (i): void {
    this.imagesToUpload.splice(i, 1);
    this.uploader.queue.splice(i, 1);
    this.queuedImageOrientation.splice(i, 1);
    if (this.imagesToUpload.length === 0) {
      this.imageIsSelected.emit(false);
    }
  }

  protected onRemoveFromQueue1 (i): void {
    this.imagesToUpload1.splice(i, 1);
    this.uploader1.queue.splice(i, 1);
    this.queuedImageOrientation.splice(i, 1);
    if (this.imagesToUpload1.length === 0) {
      this.imageIsSelected1.emit(false);
    }
  }

  private getImageOrientation (img): void {
    let self = this;
    let orientation;
    let image = new Image();
    image.src = img;

    image.onload = function (): void {
      if (this['width'] > this['height']) {
        orientation = 'landscape';
      } else {
        orientation = 'portrait';
      }
      self.queuedImageOrientation.push(orientation);
    };
  }

  /*Destroy subscriber*/
  public ngOnDestroy (): void {
    CompanyEmitter.removeSubscriber(CompanyEmitter.getUploadImagesName());
  }
}