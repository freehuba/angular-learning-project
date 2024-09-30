import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, map } from 'rxjs';
import { SessionStorageService } from './session-storage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly apiUrl = 'http://localhost:4000'; // Replace with your API base URL
    private isAuthorized$$ = new BehaviorSubject<boolean>(this.hasToken());
    public isAuthorized$ = this.isAuthorized$$.asObservable();

    constructor(private http: HttpClient, private sessionStorageService: SessionStorageService) {}

    login(user: { email: string; password: string }): Observable<string> { 
        return this.http.post<{ token: string, user: { name: string } }>(`${this.apiUrl}/login`, user).pipe(
            tap(response => { 
                if (response.token) {
                    this.sessionStorageService.setToken(response.token);
                    this.isAuthorized$$.next(true);
                }
            }),
            // Return the user's name
            map(response => response.user.name)
        );
    }

    logout(): void {
        this.sessionStorageService.deleteToken();
        this.isAuthorized$$.next(false);
    }

    register(user: { name: string; email: string; password: string }): Observable<any> { 
        return this.http.post(`${this.apiUrl}/register`, user);
    }    

    get isAuthorised(): boolean {
        return this.isAuthorized$$.value;
    }

    private hasToken(): boolean {
        return this.sessionStorageService.getToken() !== null;
    }
}
