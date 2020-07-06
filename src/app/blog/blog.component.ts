import {
  Component,
  OnInit
} from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
   selector: 'blog-component',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  constructor (private meta: Meta) {
    this.meta.updateTag({
      name: 'description',
      content: 'Learn more about how you can use Peersview as a student.'
    });
  }

  public ngOnInit (): void {}
}
