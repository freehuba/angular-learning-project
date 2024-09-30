import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {
    constructor(private authService: AuthService) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | UrlTree {
        if (this.authService.isAuthorised && this.authService['isAdmin']) { 
            return true; // User is admin
        }
        return this.authService['router'].createUrlTree(['/courses']); // Redirect to courses
    }
}
