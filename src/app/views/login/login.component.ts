import { Component } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../_services/authentication.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent { 
  angForm: FormGroup;
  isLoading = false;
  submitted = false;
  returnUrl: string;
  error = false;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
    ) { }
   ngOnInit() {
    this.angForm = this.fb.group({
       username: ['', Validators.required ],
       password: ['', Validators.required ],
    });
// reset login status
this.authenticationService.logout();

// get return url from route parameters or default to '/'
this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return this.angForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.angForm.invalid) {
        return;
    }

    this.isLoading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
        .pipe(first())
        .subscribe(
            data => {
              this.router.navigate([this.returnUrl]);
            },
            error => {
              this.error = true;
              this.isLoading = false;
            });
    }
}
