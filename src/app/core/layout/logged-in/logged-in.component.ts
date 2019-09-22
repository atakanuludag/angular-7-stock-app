import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-logged-in',
  templateUrl: './logged-in.component.html',
  styleUrls: ['./logged-in.component.scss']
})
export class LoggedInComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {

    if (!this.authenticationService.currentUserValue) { 
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
  }

}
