import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-announcement-card',
  templateUrl: './announcement-card.component.html',
  styleUrls: ['./announcement-card.component.scss']
})
export class AnnouncementCardComponent implements OnInit {
  @Input() title?: string = '';
  @Input() body?: string = '';
  @Input() date?: string = '';
  @Input() _id?: string = '';
  @Output() delete = new EventEmitter<string>();
  constructor(
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {

  }

  editAnnouncement() {
    this.router.navigate(['create-announcement'], {relativeTo: this.route.parent, queryParams: {
      announcement_id: this._id
    }});
  }

  deleteAnnouncement() {
    this.delete.emit(this._id!!);
  }

  showContributors() { 
  }

}
