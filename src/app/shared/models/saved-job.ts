import {
    Model
} from './model';

export class SavedJobModel extends Model {
    public id?: number;
    public jobId?: number;
    public userId?: number;
    public createAt?: Date;
    public updatedAt?: Date;
    public job?: any;
    public status?: string;

    public init (): void {
        this.setBlankDataStructure({
            id: undefined,
            userId: undefined,
            jobId: undefined,
            job: undefined
        });
    }
}
