import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from '../../services/admin/admin.service';

@Injectable({
  providedIn: 'root'
})
export class IsHeadAdminGuard implements CanActivate {
  constructor(private adminService: AdminService, private router: Router, private route: ActivatedRoute) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.checkIfItIsAdmin(route);
  }

  async checkIfItIsAdmin(route: ActivatedRouteSnapshot): Promise<boolean> {
    let admin = await this.adminService.getAdmin(sessionStorage.getItem('admin_id') as string);
    sessionStorage.removeItem('admin_id'); // remove this item
    if(admin && admin.identity?.isHeadAdmin) {
      return true;
    } else {
      this.router.navigate([""], {relativeTo: this.route});
      return false;
    }
  }
  
}
