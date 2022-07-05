import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { getWithExpiry } from '../shared/localstrorage';

@Injectable({
    providedIn: 'root'
})
export class AuthguardService implements CanActivate {

    canActivate(_active: ActivatedRouteSnapshot, _state: RouterStateSnapshot): boolean {
        if (getWithExpiry('AuthToken') != null) {
            return true;
        }
        alert("You have to First Login!!");
        this._rout.navigate(["/"]);
        return false;
    }
    constructor(private _rout: Router) { }
}