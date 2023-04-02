import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { JwtAuthenticationService } from 'src/app/services/security/jwt-authentication.service';

@Component({
  selector: 'vex-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    fadeInUp400ms
  ]
})
export class LoginComponentComponent implements OnInit {
  form: UntypedFormGroup;
  inputType = 'password';
  visible = false;
  errorMessage = '';
  invalidLogin = false;
  map: any;
  password: any;
  email: any;
  loading: boolean;
  constructor(private router: Router, private snackbar: MatSnackBar, private fb: UntypedFormBuilder,
    private cd: ChangeDetectorRef,
    private jwtAuthenticationService:JwtAuthenticationService) { }

    ngOnInit() {
      this.form = this.fb.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
      });
      



    }
  send() {
    //console.log(this.form.value.email);
    this.email=this.form.value.email;
    this.password=this.form.value.password;
    if (!this.email) {
      const options = { closeButton: true, tapToDismiss: false, timeOut: 10000, opacity: 1 };
      this.snackbar.open('UserID is Required', '!!', {
        duration: 10000
      });
    } else if (!this.password) {
      const options = { closeButton: true, tapToDismiss: false, timeOut: 10000, opacity: 1 };
      this.snackbar.open('Password Required!');
    }
    else{
      this.loading = true;
      this.jwtAuthenticationService.executeJWTAuthenticationService(this.email, this.password).subscribe(
        (data: { token: any; info: any }) => {
          console.log("data.info.errorCode: " + data.info.errorCode);
          if (data.info.errorCode == '1') {
            this.invalidLogin = true;
            this.loading = false;
            const options = { closeButton: true, tapToDismiss: false, timeOut: 10000, opacity: 1 };
            this.snackbar.open(data.info.errorMsg, 'Sorry!' , {
              duration: 10000
            });
          } else if (data.info.errorCode == '0') {
           
            this.router.navigate(['/dashboard']);
            this.invalidLogin = false;
            this.loading = false;
        
          }
        },
        (error: any) => {
          // console.log(error);
          const options = { closeButton: true, tapToDismiss: false, timeOut: 10000, opacity: 1 };
          this.snackbar.open(error + ', Please contact with system administrator.', 'Sorry!');
          this.invalidLogin = true;
          this.loading = false;
        },
      )
    }
  }


  toggleVisibility() {
    if (this.visible) {
      this.inputType = 'password';
      this.visible = false;
      this.cd.markForCheck();
    } else {
      this.inputType = 'text';
      this.visible = true;
      this.cd.markForCheck();
    }
  }
}


