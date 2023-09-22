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
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  userRoute: string[] = []
  adminRoute: string[] = []
  isUser: boolean = false
  isAdmin: boolean = false
  /**
   * Constructor
   */
  constructor(
    private _router: Router
  ) { }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const redirectUrl = state.url;
    return this.isAuthenticated(redirectUrl)
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const redirectUrl = state.url;
    return this.isAuthenticated(redirectUrl)
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.isAuthenticated('/');
  }
  get role(): string {
    return localStorage.getItem('role') || ''
  }
  isAuthenticated(url: string) {
    this.authenticatedCheck().subscribe({
      next: (authenticated) => {
        if (!authenticated) {
          this._router.navigate(['/']);
          return of(false);
        }
        this.userRoute = ['/home']
        this.adminRoute = ['/users', '/category','/products']
        
        if (this.role === 'User') {
          this.isUser = this.userRoute.some((path) => url === path)
          if (this.isUser) {
            return of(true)
          } else {
            this._router.navigate(['/home'])
            return of(false)
          }
        }

        if (this.role === 'Admin') {
          this.isAdmin = this.adminRoute.some((path) => url === path)
          if (this.isAdmin) {
            return of(true)
          } else {
            this._router.navigate(['/users'])
            return of(false)
          }
        }

        return of(true);
      }
    })
    return of(true);
  }
  get token(): string {
    return localStorage.getItem('token') || ''
  }
  authenticatedCheck(): Observable<boolean> {
    if (!this.isAuthenticated) {
      return of(false)
    }
    if (!this.token) {
      return of(false)
    }
    return of(true)
  }
}
