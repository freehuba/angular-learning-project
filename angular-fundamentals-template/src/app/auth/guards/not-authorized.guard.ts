import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class NotAuthorizedGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | UrlTree {
        if (!this.authService.isAuthorised) {
            return true; // User is not authorized
        }
        return this.router.createUrlTree(['/courses']); // Redirect to courses
    }
}
