import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
  } 

  login() {
    this.router.navigate(['../access'], {relativeTo: this.route});
  }

  signup() {
    this.router.navigate(['../access/signup'], {relativeTo: this.route});
  }

}
