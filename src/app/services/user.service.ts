import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUserURL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUser() {
    return this.http.get(`${baseUserURL}`);
  }

  getUserById(id) {
    return this.http.get(`${baseUserURL}`,id);
  }

  addUser(data) {
    return this.http.post(`${baseUserURL}register`, data);
  }

  deleteUser(id){
    return this.http.delete(`${baseUserURL}`+id);
  }
}
