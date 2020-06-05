import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/User-Service/user.service';
import { NgForm, FormControl, Validators, FormBuilder, AbstractControl, FormGroup } from '@angular/forms';
import { User } from 'src/app/shared/Models/user.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  user: User;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  // This object will hold the messages to be displayed to the user
  // Notice, each key in this object has the same name as the
  // corresponding form control
  formErrors = {
    'firstName': '',
    'lastName':'',
    'emailAddress': '',
    'password':'',
    'confirmPassword':'',
    'passwordGroup':'',
  };

  // This object contains all the validation messages for this form
  validationMessages = {
    'firstName': {
      'required': 'First name is required.',
      'minlength': 'First name must be greater than 2 characters.',
      'maxlength': 'First name must be less than 100 characters.'
    },
    'lastName':{
      'required': 'Last name is required.',
      'minlength': 'Last name must be greater than 2 characters.',
      'maxlength': 'Last name must be less than 100 characters.'
    },
    'emailAddress': {
      'required': 'Email is required.',
      'minlength': 'Email address must be greater than 11 characters.',
      'maxlength': 'Email address must be less than 150 characters.',
      'emailDomain': 'Email domian should be devine-tech.com'
    },
    'password':{
      'required': 'Password is required.',
      'minlength': 'Password must be greater than 5 characters.',
      'maxlength': 'Password must be less than 150 characters.',
    },
    'confirmPassword': {
      'required': 'Confirm Password is required.',
      'minlength': 'Confirm Password must be greater than 5 characters.',
      'maxlength': 'Confirm Password must be less than 150 characters.',
    },
    'passwordGroup': {
      'passwordMisMatch':'Password and confirm Password do not match'
    }
  };

  constructor(private userService: UserService, private toastr: ToastrService, private fb: FormBuilder) { }

  public SignUpForm: FormGroup;
  
  ngOnInit() {

    this.SignUpForm = this.fb.group({
      firstName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(60)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(60)]),
      initials: new FormControl('', [Validators.maxLength(60)]),
      emailAddress: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(150)]),

      passwordGroup: this.fb.group({
        password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(60)]),
        confirmPassword: new FormControl('', [ Validators.required, Validators.minLength(5), Validators.maxLength(60)]),
      }, { validators : matchPassword }),

    });

    this.SignUpForm.valueChanges.subscribe((data) =>{
      this.logValidationErrors(this.SignUpForm);
    });
  }

  // Logs validation error messages
  logValidationErrors(group: FormGroup = this.SignUpForm): void {
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
  
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      }
    });
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.SignUpForm.controls[controlName].hasError(errorName);
  }


  OnSubmit(form: NgForm) {    
    var formData = form.value;
    const userData: User = this.getUserInformation(formData)
    this.userService.registerUser(userData)
      .subscribe((data: any) => {
        if (data.Succeeded == true) {
          this.resetForm(form);
          this.toastr.success('User registration successful', "Success!");
        }
        else{
          data.errors.forEach(element => {
            switch (element.code) {
              case 'DuplicateUserName':
                this.toastr.error('Username is already taken','Registration failed.');
                break;

              default:
                this.toastr.error(element.description,'Registration failed.');
                break;
            }
          });
        };
      });
  }

  
  private getUserInformation(formData: any): User {
    return {
      UserName: formData.emailAddress,
      Password: formData.passwordGroup.password,
      Email: formData.emailAddress,
      Initials: formData.initials,
      FirstName: formData.firstName,
      LastName: formData.lastName
    };
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.user = {
      UserName: '',
      Password: '',
      Email: '',
      Initials:'',
      FirstName: '',
      LastName: ''
    }
  }
}

function matchPassword(group : AbstractControl) : {[key: string] : any } | null {
  const passwordControl =  group.get('password');
  const confirmPasswordControl = group.get('confirmPassword');

  console.log(`Value of password is : ${passwordControl.value} and confirm Password : ${confirmPasswordControl.value}`);
  
  if( passwordControl.value === confirmPasswordControl.value || confirmPasswordControl.pristine )
  {
    console.log("Matched");
    return null;
  }else{
    console.log("Mis-Matched");
    return {'passwordMisMatch': true};
  }
}