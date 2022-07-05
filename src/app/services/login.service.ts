import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from 'rxjs';
import { baseUserURL, jwtKey } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {

    loginFlag = new BehaviorSubject<string>('');
    
    constructor(private http: HttpClient) { }

    login(data): Observable<any> {
        return this.http.post(`${baseUserURL}login`, data);
    }

}