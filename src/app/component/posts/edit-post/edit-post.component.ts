import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';


@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  _id: string = '';
  title: string = '';
  content: string = '';

  editPostForm: FormGroup;

  constructor(private act_route: ActivatedRoute, private postService: PostService, private router: Router) { }
  
  ngOnInit(): void {
    this._id = this.act_route.snapshot.params.id;

    this.postService.getPostById(this._id).subscribe(
      (result: any) => {
        this.editPostForm = new FormGroup({
          _id: new FormControl(this._id),
          title: new FormControl(result.title, [Validators.required]),
          content: new FormControl(result.content, [Validators.required, Validators.minLength(4), Validators.maxLength(30)])
        })
      }, (error: any) => {
        alert(error.error.Error);
      }
    );

    // this._id = this.data._id;
    // this.title = this.data.title;
    // this.content = this.data.content;

    this.initForm();
  }

  initForm() {

    this.editPostForm = new FormGroup({
      _id: new FormControl(this._id),
      title: new FormControl(this.title,[Validators.required]),
      content: new FormControl(this.content, [Validators.required, Validators.minLength(4), Validators.maxLength(30)])
    });
  }

  onUserSubmit() {
    if (this.editPostForm.valid) {
      this.postService.editPost(this.editPostForm.value).subscribe(
        (result) => {
          this.router.navigate(['post']);
        }, (error: any) => {
          alert(error.error.Error);
        });
    }
  }

  onClose() {
    this.router.navigate(['/post']);
  }
}
