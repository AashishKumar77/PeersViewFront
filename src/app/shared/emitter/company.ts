import { EventEmitter } from '@angular/core';
import { EmitterService } from './emitter.component';

export class CompanyEmitter {
  constructor () {}

  public static getUploadImagesName (): string {
    return 'getUploadImages';
  }

  public static getUploadCompleteName (): string {
    return 'onUploadComplete';
  }

  public static uploadImages (): any {
    return EmitterService.get('getUploadImages');
  }

  public static uploadComplete (): any {
    return EmitterService.get('onUploadComplete');
  }

  public static removeSubscriber (channel): void {
    EmitterService.remove(channel);
  }
}
