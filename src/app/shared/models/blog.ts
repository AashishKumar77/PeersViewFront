import {
    Model
} from './model';

export class BlogModel extends Model {
    public id?: number;
    public title?: string;
    public content?: string;
    public userId?: number;
    public createAt?: Date;
    public updatedAt?: Date;

    public init (): void {
        this.setBlankDataStructure({
            id: undefined,
            title: undefined,
            userId: undefined,
            content: undefined
        });
    }
}
