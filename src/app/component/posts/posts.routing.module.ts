import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PostsComponent } from "./posts.component";
import { NewPostComponent } from "../posts/new-post/new-post.component";
import { EditPostComponent } from "../posts/edit-post/edit-post.component";
import { TopActionPostComponent } from '../posts/top-action-post/top-action-post.component';
import { AuthguardService } from "src/app/shared/auth.gaurd";

const appRoutes: Routes = [
    {
        path: '', title: 'post', canActivate: [AuthguardService],
        children: [
            { path: '', component: PostsComponent },
            { path: 'newPost', component: NewPostComponent },
            { path: 'editPost/:id', component: EditPostComponent },
            { path: 'topLikePost/:action', component: TopActionPostComponent },
        ]
    }

    // { path: '', component: PostsComponent, canActivate: [AuthguardService] },
    // { path: 'newPost', component: NewPostComponent },
    // { path: 'editPost/:id', component: EditPostComponent },
    // { path: 'topLikePost/:action', component: TopActionPostComponent },
];

@NgModule({
    imports: [RouterModule.forChild(appRoutes)],
    exports: [RouterModule]
})

export class PostRoutingModule { }