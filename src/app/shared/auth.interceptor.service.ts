import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpParams, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getWithExpiry, setWithExpiry } from './localstrorage';
import jwt_decode from "jwt-decode";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //const token = localStorage.getItem('AuthToken');
        const token = getWithExpiry('AuthToken');
        
        if (token) {
            var decoded = jwt_decode(token);
            setWithExpiry('loginUserId',decoded);
            
            const modifiedReq = req.clone({
                // params: new HttpParams().set('Authorization', token)
                setHeaders: { Authorization: token }
            });
            return next.handle(modifiedReq);
        }
        return next.handle(req);
    }
}