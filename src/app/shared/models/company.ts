import { Model } from './model';

export class CompanyModel extends Model {
  public id?: number;
  public company?: string;
  public company_type?: string;
  public company_size?: string;
  public company_contact?: string;
  public country?: string;
  public city?: string;
  public recruit?: number;
  public createAt?: Date;
  public updatedAt?: Date;
  public industry?: string;
  public company_bio?: string;
  public logo?: string;
  public companyAttachments: AttachmentModel[];
  public userId?: number;

  public init (): void {
    this.setBlankDataStructure({
      id: undefined,
      company: undefined,
      company_type: undefined,
      company_size: undefined,
      company_contact: undefined,
    });
  }
}

export class AttachmentModel extends Model {
  public id?: number;
  public cloudinaryPublicId: string;
  public usage: string;

  public init (): void {}
}
