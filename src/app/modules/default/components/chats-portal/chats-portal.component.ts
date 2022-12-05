import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchComponent } from 'src/app/shared/dialogs/search/search.component';
import { ConcernedChatsResponse } from 'src/app/shared/models/chats/chats-model';
import { ContributorModel } from 'src/app/shared/models/contributor-model/contributor-model';
import { AdminService } from 'src/app/shared/services/admin/admin.service';
import { ChatsService } from 'src/app/shared/services/chats/chats.service';

@Component({
  selector: 'app-chats-portal',
  templateUrl: './chats-portal.component.html',
  styleUrls: ['./chats-portal.component.scss']
})
export class ChatsPortalComponent implements OnInit {
  concernedChats = new ConcernedChatsResponse();
  name = "Total Unread Messages";
  title = "All Chats"
  fetchingChats = true;
  constructor(
    private chatsService: ChatsService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.init();
  }

  private async init() {
    this.fetchingChats = true;
    this.route.data.subscribe(async data => {
      let admin = await this.adminService.getAdmin(data.admin_id);
      let category: "admin" | "overseer" = "overseer";
      if(admin.identity?.isHeadAdmin) {
        category = "admin"
      } else {
        category = "admin"
      }
      this.concernedChats = await this.chatsService.retrieveConcernedChats(category, data.admin_id) // change to admin_id
      })
    this.fetchingChats = false;
  }

  startNewChat() {
    this.route.data.subscribe(async data => {
      let config = new MatDialogConfig();
      config.minWidth = "100vw"
      config.minHeight = "100vh";
      config.width = "100%";
      config.height = "100%";
      config.data = {
        overseer_id: data.admin_id,
        selection: "single",
        title: "Search and Select Contributor"
      }
  
      let searchDialog = this.dialog.open(SearchComponent, config);

      searchDialog.afterClosed().subscribe((data: ContributorModel) => {
        this.router.navigate(['chats'], {relativeTo: this.route.parent, queryParams: {
          for: data._id
        }});
      })
    });
  }

  openSearchPortal() {
    this.router.navigate(['search-portal'],{relativeTo: this.route.parent, queryParams : {
      destination : "conversation"
    }});
  }

}
