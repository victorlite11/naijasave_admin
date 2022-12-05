import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BasicContributorOverseerModel } from '../../interface/shared-interface';
import { ContributorsService } from '../../services/contributors/contributors.service';

@Component({
  selector: 'app-contributor-overseer-card',
  templateUrl: './contributor-overseer-card.component.html',
  styleUrls: ['./contributor-overseer-card.component.scss']
})
export class ContributorOverseerCardComponent implements OnInit, OnChanges {
  @Input() contributor_id?: string;
  overseer: BasicContributorOverseerModel = new BasicContributorOverseerModel();
  constructor(
    private contributorsService: ContributorsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.init();
  }

  ngOnInit(): void {
  }

  async init() {
    this.overseer = await this.contributorsService.getContributorOverseer(this.contributor_id!!);
  }

  navigateToChangeContributorOverseer() {
    this.router.navigate(['change-contributor-overseer'], {relativeTo: this.route.parent, queryParams: {
      contributor_id: this.contributor_id
    }});
  }


}
