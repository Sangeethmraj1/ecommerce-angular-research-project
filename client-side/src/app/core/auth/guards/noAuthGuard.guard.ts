import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanActivateChild,
    CanLoad,
    Route,
    Router,
    RouterStateSnapshot,
    UrlSegment,
    UrlTree
} from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NoAuthGuard implements CanActivate, CanActivateChild, CanLoad {

    constructor(private _router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        return this.isAuthenticated();
    }


    canActivateChild(
        childRoute: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        return this.isAuthenticated();
    }


    canLoad(
        route: Route,
        segments: UrlSegment[]
    ): Observable<boolean> | Promise<boolean> | boolean {
        return this.isAuthenticated();
    }

    get token(): string {
        return localStorage.getItem('token') || ''
    }
    isAuthenticated() {
        return this.authenticatedCheck().pipe(
            switchMap((authenticated) => {
                if (authenticated) {
                    this._router.navigateByUrl('home')
                    return of(false);
                }
                return of(true);
            })
        )
    }
    authenticatedCheck(): Observable<boolean> {

        if (!this.token) {
            console.log(this.token);

            return of(false)
        }
        return of(true)
    }


}
