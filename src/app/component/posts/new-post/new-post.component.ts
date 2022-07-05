
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
  newPostForm: FormGroup;
  constructor(private router: Router, private postService: PostService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.newPostForm = new FormGroup({
      title: new FormControl(null, [Validators.required ,Validators.pattern(/^[A-Za-z]+$/)]), //
      content: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(30)])
    });
  }

  onPostSubmit() {
    if (this.newPostForm.valid) {
      this.postService.editPost(this.newPostForm.value).subscribe(
        (result) => {
          this.router.navigate(['/post']);
        }, (error: any) => {
          //console.log(error);
          alert(error.error.Error);
        }
      );
    }
  }

  onCancel() {
    this.router.navigate(['/post']);
  }
}
