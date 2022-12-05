import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminModel } from 'src/app/shared/models/admin-model/admin-model';
import { ChatModel, IChatsPayload } from 'src/app/shared/models/chats/chats-model';
import { ContributorModel } from 'src/app/shared/models/contributor-model/contributor-model';
import { AdminService } from 'src/app/shared/services/admin/admin.service';
import { ChatsService } from 'src/app/shared/services/chats/chats.service';
import { ContributorsService } from 'src/app/shared/services/contributors/contributors.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit, OnDestroy {
  for_id = "";
  chats: ChatModel[] = [];
  admin = new AdminModel();
  intervalId?: any;
  contributor = new ContributorModel();

  chat = new ChatModel();

  constructor(
    private chatsService: ChatsService,
    private contributorsService: ContributorsService,
    private adminService: AdminService,
    private route: ActivatedRoute
  ) { }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  ngOnInit(): void {

    this.init();
  }

  async init() {
    this.route.queryParams.subscribe(async query => {
      this.contributor = await this.contributorsService.getContributor(query.for);
    })

    this.route.data.subscribe(async data => {
      this.admin = await this.adminService.getAdmin(data.admin_id);
      this.refresh();

      this.intervalId = setInterval(() => {
        this.refresh();
      }, 2000);
    })

  }

  async refresh() {
    this.route.queryParams.subscribe(async query => {
      this.for_id = query.for;

      let category: "admin" | "overseer" = "admin";
      if(this.admin.identity?.isHeadAdmin) {
        category = "admin"
      } else {
        category = "admin"
      }

      this.chats = await this.chatsService.retrieveChatsFor({
        for: query.for,
        category: category
      });

    })
  }

  async send() {
    let payload = new IChatsPayload();
    payload.for = this.contributor._id!!;

    this.chat.from = this.admin._id!!;
    this.chat.to = this.contributor._id!!;

    let category: "admin" | "overseer" = "admin";
    if(this.admin.identity?.isHeadAdmin) {
      category = "admin"
    } else {
      category = "admin"
    }

    payload.category = category; // determines where the chat will be stored

    payload.chat = this.chat;
    await this.chatsService.insertChat(payload);

    this.chat.message = "";

    this.refresh();
  }

}
