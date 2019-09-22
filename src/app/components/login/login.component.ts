import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../core/services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  returnUrl: string;
  loading: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.loading = false;
    document.body.style.backgroundColor = "#dadada";

    if (this.authenticationService.currentUserValue) { 
      this.router.navigate(['/dashboard']);
    }
  
  }

  ngOnInit() {
    
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }
  

  get f() { return this.loginForm.controls; }

  login() {
    this.loading = true;

    setTimeout( () =>{
      this.authenticationService.login(this.loginForm.value).pipe(first()).subscribe(
        data => {
          this.loading = false;
          console.log(data);
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.loading = false;
          this.snackBar.open('Kullanıcı adınız veya şifreniz yanlış.', 'Tamam');  
      });
    }, 2000);
    
    
  }


}
