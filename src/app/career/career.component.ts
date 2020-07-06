import {
  Component
} from '@angular/core';
import {Meta} from '@angular/platform-browser';


@Component({
  selector: 'career-component',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.scss']
})
export class CareerComponent {
  constructor (private meta: Meta) {
    this.meta.updateTag({
      name: 'description',
      content: 'Career Center. Job Search. Employability Assessment. '
    });
  }
}
