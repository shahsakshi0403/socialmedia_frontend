
import { CommonModule } from '@angular/common';
import { PostRoutingModule } from './posts.routing.module';
import { NgModule } from '@angular/core';

import { PostsComponent } from './posts.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { NewPostComponent } from './new-post/new-post.component';

import { TopActionPostComponent } from './top-action-post/top-action-post.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
    declarations: [
        PostsComponent,
        EditPostComponent,
        NewPostComponent,
        TopActionPostComponent
    ],
    imports: [
        SharedModule,
        CommonModule,
        PostRoutingModule
    ]
})

export class PostModule { }
