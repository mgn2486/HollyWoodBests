import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/User-Service/user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder, FormControl, Validators, NgForm, AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/shared/Models/user.model';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  public SignInForm: FormGroup;
  public isLoginError:boolean = false;

  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  // This object will hold the messages to be displayed to the user
  // Notice, each key in this object has the same name as the
  // corresponding form control
  formErrors = {
    'username': '',
    'password':''
  };

  // This object contains all the validation messages for this form
  validationMessages = {
    'username': {
      'required': 'User-name is required.',
      'minlength': 'Please enter a valid username.',
      'maxlength': 'This is not realistic '
    },
    'password':{
      'required': 'Password is required.',
      'minlength': 'Please enter a valid password',
      'maxlength': 'This is not realistic '
    }
  };

  constructor(private userService: UserService, private toastr: ToastrService, private fb: FormBuilder, private router: Router) { }
  userClaims: any;

  ngOnInit() {

    if (localStorage.getItem('userToken') != null){
      this.router.navigateByUrl('/dashboard'); 
    }

    this.SignInForm = this.fb.group({
      username: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(60)]),
      password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(60)])
    });

    this.SignInForm.valueChanges.subscribe((data) =>{
      this.logValidationErrors(this.SignInForm);
    });
  }

    
  OnSubmit(form: NgForm){
    var formData = form.value;
    this.userService.userAuthentication(formData).subscribe((data : any)=>{     
      localStorage.setItem('userToken',data.access_token);
      localStorage.setItem('userRole',data.role);
      form.reset();
      this.router.navigateByUrl('/dashboard');
    },
    err =>{
      this.isLoginError = true;
      if(err.status == 400){
        this.toastr.error('Username or password is incorrect.','Authentication failed.');
      }else{        
        console.log("DATA"+ formData)
        form.reset();
      }
    });
 }

  private resetForm(form?: NgForm) {
    if (form != null)
    {
      form.reset();
    }
  }


  private logValidationErrors(group: FormGroup = this.SignInForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      this.formErrors[key] = '';
      if (abstractControl && !abstractControl.valid
        && (abstractControl.touched || abstractControl.dirty)) {
        const messages = this.validationMessages[key];
        for (const errorKey in abstractControl.errors) {
          if (errorKey) {
            this.formErrors[key] += messages[errorKey] + ' ';
          }
        }
      }
    });
  }  
}


