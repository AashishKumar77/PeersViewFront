/* angular components */
import {
    NgModule
} from '@angular/core';
import {
    blogRouting
} from './blog-routing.component';
import { SharedModule } from '../shared/components/shared.module';
import { BlogComponent } from './blog.component';
import { BlogHomeComponent } from './home/home.component';
import { BlogDetailComponent } from './detail/detail.component';
import { CreateBlogComponent } from './create/create.component';
import { BlogFilterDialogComponent } from './home/blog-filter-modal/blog-filter-modal.component';
import { SharedPipeModule } from '../shared/pipe/pipe.module';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        SharedModule,
        SharedPipeModule,
        blogRouting
    ],
    declarations: [
        BlogComponent,
        BlogHomeComponent,
        BlogDetailComponent,
        CreateBlogComponent,
        BlogFilterDialogComponent
    ],
    exports: [
    ],
    entryComponents: [
        BlogFilterDialogComponent
    ],
    providers: []
})
export class BlogModule { }
