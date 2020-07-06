import {
    Model
} from './model';

export class ManualJobModel extends Model {
    public id?: number;
    public title?: string;
    public company?: string;
    public company_logo?: string;
    public company_bio?: string;
    public country?: string;
    public city?: string;
    public contact?: string;
    public type?: number;
    public industry?: string;
    public industryId?: number;
    public experience?: string;
    public jobfunction?: string;
    public deadline?: Date;
    public userId?: number;
    public createAt?: Date;
    public updatedAt?: Date;
    public source_link?: string;
    public price?: number;
    public currency?: string;
    public isSelfCountry?: number;
    public isApplied?: boolean;
    public status?: string;

    public init (): void {
        this.setBlankDataStructure({
            id: undefined,
            title: undefined,
            userId: undefined,
            company: undefined,
            type: undefined,
            currency: '$',
            isApplied: false
        });
    }
}
