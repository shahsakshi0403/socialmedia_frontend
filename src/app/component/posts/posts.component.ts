import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { getWithExpiry } from 'src/app/shared/localstrorage';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  postArr: [] = [];
  title: string = '';
  content: string = '';
  data: [] = [];
  loginUserId: string;
  myPostFlag = false;

  constructor(private postService: PostService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const decoded = getWithExpiry('loginUserId');
    this.loginUserId = decoded.id;
    this.getPost();
  }

  getPost() {
    this.postService.getPosts().subscribe(
      (result: any) => {
        console.log(result);
        this.postArr = result;
      }, (error: any) => {
        alert([error.error.status, 'Please Login!!']);
      }

    );
  }

  onNewPost() {
    this.router.navigate(['newPost'], { relativeTo: this.route });
  }

  onEdit(element) {
    this.router.navigate(['editPost', element._id], { relativeTo: this.route });
  }

  onLike(row) {
    const data = {
      _id: row._id,
      action: "like"
    }
    this.postService.likeDislikeActions(data).subscribe(
      (result) => {
        this.getPost();
      }, (error: any) => {
        alert(error.error.Error);
      }
    );
  }

  onDislike(row) {
    const data = {
      _id: row._id,
      action: "dislike"
    }
    this.postService.likeDislikeActions(data).subscribe(
      (result) => {
        this.getPost();
      }, (error: any) => {
        alert(error.error.Error);
      }
    );
  }

  onTopAction(action) {
    this.router.navigate(['topLikePost', action], { relativeTo: this.route });
  }

  onDelete(row) {
    if (confirm("Are you sure you want to delete?")) {
      this.postService.deletePost(row._id).subscribe(
        (result) => {
          //console.log(result);
          this.getPost();
        }
      );
    }
  }

  onMyPost() {
    this.myPostFlag = true;
  }

  onAllPost() {
    this.myPostFlag = false;
  }
}
