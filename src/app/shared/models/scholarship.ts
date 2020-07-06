import {
    Model
} from './model';

export class ScholarshipModel extends Model {
    public id?: number;
    public title?: string;
    public details?: string;
    public country?: string;
    public city?: string;
    public type?: number;
    public eligibility_requirements?: string;
    public benefits?: string;
    public deadline?: Date;
    public userId?: number;
    public createAt?: Date;
    public updatedAt?: Date;
    public source_link?: string;
    public price?: number;
    public currency?: string;
    public isSelfCountry?: number;

    public init (): void {
        this.setBlankDataStructure({
            id: undefined,
            title: undefined,
            userId: undefined,
            details: undefined,
            type: undefined,
            currency: '$'
        });
    }
}
