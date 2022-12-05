import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminModel } from 'src/app/shared/models/admin-model/admin-model';
import { AdminService } from 'src/app/shared/services/admin/admin.service';

@Component({
  selector: 'app-admins-portal',
  templateUrl: './admins-portal.component.html',
  styleUrls: ['./admins-portal.component.scss']
})
export class AdminsPortalComponent implements OnInit {

  // fetch subordinates
  fetchingAdmins = true;
  admins: AdminModel[] = [];

  addButtonText: string = "Create New Admin";
  title: string = "Admins";
  name = `Total Admins`;

  constructor(
              private router: Router,
              private route: ActivatedRoute,
              private adminService: AdminService
            ) { } 

   ngOnInit(): void {
    this.init();
  }
  
  async init() {
    this.fetchingAdmins = true;
    this.route.data.subscribe(data => {
      this.adminService.getAdmins().then(admins => {
        this.admins = admins.filter(admin => admin._id !== data.admin_id);
        this.fetchingAdmins = false;
      })
    })
  }

  ngAfterViewInit() {
  }

  createNewAdmin() {
    this.router.navigate(['new-admin'], {relativeTo: this.route.parent});
  }

}

