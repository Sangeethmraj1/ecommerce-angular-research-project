import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,of } from 'rxjs';


import { SignInCredentials, SignUpCredentials } from './auth.type';

@Injectable()
export class AuthService {
    constructor(private httpClient: HttpClient) { }
    private isAuthenticated = false
    get token(): string {
        return localStorage.getItem('token') || ''
    }

    signup(user: SignUpCredentials) {
        console.log(user,'userrr');
        
        return this.httpClient.post('user/create', user)
    }

    signIn(user: SignInCredentials) {
        this.isAuthenticated=true
        return this.httpClient.post('auth/local/user', user)
    }

    authenticatedCheck():Observable<boolean> {
        console.log(this.isAuthenticated,this.token,'checkkkkkkkkkkkkkkkk');
        
        if(!this.isAuthenticated){
            return of(false)
        }
        if (!this.token) {
            return of(false)
        }

        return of(true)
    }
}
