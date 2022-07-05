import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';


@Component({
  selector: 'app-top-action-post',
  templateUrl: './top-action-post.component.html',
  styleUrls: ['./top-action-post.component.css']
})
export class TopActionPostComponent implements OnInit {

  constructor(private act_route: ActivatedRoute, private postService: PostService, private router: Router) { }

  action: string = '';
  postArrTopActions: [] = [];

  ngOnInit(): void {

    this.action = this.act_route.snapshot.params.action;
    this.postService.topActions(this.action).subscribe(
      (result: any) => {
        this.postArrTopActions = result;
      }, (error: any) => {
        alert(error.error.Error);
      }
    );
  }

  onBack() {
    this.router.navigate(['post']);
  }

  getPost() {
    this.postService.getPosts().subscribe(
      (result: any) => {
        console.log('Top Most Action',result);
        this.postArrTopActions = result;
      }, (error: any) => {
        alert([error.error.status, 'Please Login!!']);
      }
    );
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
}
