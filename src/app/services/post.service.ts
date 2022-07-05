import { basePostURL } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getPosts() {
    return this.http.get(`${basePostURL}`);
  }

  getPostById(id){
    return this.http.get(`${basePostURL}`+id);
  }

  editPost(data) {
    return this.http.put(`${basePostURL}`, data);
  }

  likeDislikeActions(data) {
    return this.http.post(`${basePostURL}`, data);
  }

  topActions(data){
    return this.http.get(`${basePostURL}topActions/`+data);
  }

  deletePost(id){
    return this.http.delete(`${basePostURL}`+id);
  }
}
