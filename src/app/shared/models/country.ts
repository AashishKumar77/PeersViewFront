import {
    Model
} from './model';

export class CountryModel extends Model {
    public code: string;
    public name: string;

    public init (): void {}
}
