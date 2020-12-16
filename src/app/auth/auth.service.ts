import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { AuthData } from "./auth-data.model";

@Injectable({ providedIn: "root" })
export class AuthService {
    private isAuthenticated = false;
    private token: string;
    private tokenTimer: any;
    private userId: string;
    private authStatusListener = new Subject<boolean>();

    constructor(private http: HttpClient, private router: Router) { }

    getToken() {
        return this.token;
    }

    getIsAuth() {
        return this.isAuthenticated;
    }

    getAuthStatusListener() {
        return this.authStatusListener.asObservable();
    }

    getUserId() {
        return this.userId;
    }

    login(api: string) {

        const authData: AuthData = { apiKey:api };
        api='https://api.themoviedb.org/3/authentication/token/new?api_key='+api;

        this.http
      .get<{ success: string; expires_at: string; request_token: string}>(api)
            .subscribe(response => {

              console.log(response);


                if (response.success) {                    //token exists
                  console.log("postoji");
                    const expiresInDuration = response.expires_at;
                    this.setAuthTimer(1000);
                    this.isAuthenticated = true;
                    this.userId = 'User'+ response.request_token;
                    this.authStatusListener.next(true);
                    const now = new Date();
                    const expirationDate = new Date(now.getTime() + 100* 1000);
                    console.log(expirationDate);
                    this.saveAuthData(response.request_token, expirationDate, this.userId);
                    this.router.navigate(["/"]);
                }
            },
                error => {
                  console.log("hehe");
                    this.authStatusListener.next(false);
                });
    }

    autoAuthUser() {

        const authInformation = this.getAuthData();
        if (!authInformation) {
            return;
        }
        const now = new Date();
        const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
        if (expiresIn > 0) {
            this.token = authInformation.token;
            this.isAuthenticated = true;
            this.userId = authInformation.userId;
            this.setAuthTimer(expiresIn / 1000);
            this.authStatusListener.next(true);
        }
    }

    logout() {
        this.token = null;
        this.isAuthenticated = false;
        this.authStatusListener.next(false);
        this.userId = null;
        clearTimeout(this.tokenTimer);
        this.clearAuthData();
        this.router.navigate(["/"]);
    }

    private setAuthTimer(duration: number) {
        console.log("Setting timer: " + duration);
        this.tokenTimer = setTimeout(() => {
            this.logout();
        }, duration * 1000);
    }

    private saveAuthData(token: string, expirationDate: Date, userId: string) {
        localStorage.setItem("token", token);
        localStorage.setItem("expiration", expirationDate.toISOString());
        localStorage.setItem("userId", userId);
    }

    private clearAuthData() {
        localStorage.removeItem("token");
        localStorage.removeItem("expiration");
        localStorage.removeItem("userId");
    }

    private getAuthData() {
        const token = localStorage.getItem("token");
        const expirationDate = localStorage.getItem("expiration");
        const userId = localStorage.getItem("userId");

        if (!token || !expirationDate) {
            return;
        }

        return {
            token: token,
            expirationDate: new Date(expirationDate),
            userId: userId
        }
    }
}
