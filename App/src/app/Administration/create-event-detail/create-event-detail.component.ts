import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { TournamentService } from 'src/app/shared/services/tournament-service/tournament.service';

@Component({
  selector: 'app-create-event-detail',
  templateUrl: './create-event-detail.component.html',
  styleUrls: ['./create-event-detail.component.css']
})
export class CreateEventDetailComponent implements OnInit {

  formErrors = {
    'tournamentName': '',
  };

  // This object contains all the validation messages for this form
  validationMessages = {
    'tournamentName': {
      'required': 'Tournament name is required.',
      'minlength': 'Tournament name must be greater than 2 characters.',
      'maxlength': 'Tournament name must be less than 100 characters.'
    },    
  };

  constructor( private toastr: ToastrService, private fb: FormBuilder, private tournamentService :TournamentService) { }

  public CreateEventForm: FormGroup;
  
  ngOnInit() {

    this.CreateEventForm = this.fb.group({
      tournamentName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]), 
    });

    this.CreateEventForm.valueChanges.subscribe((data) =>{
      this.logValidationErrors(this.CreateEventForm);
    });
  }

  // Logs validation error messages
  logValidationErrors(group: FormGroup = this.CreateEventForm): void {
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
    return this.CreateEventForm.controls[controlName].hasError(errorName);
  }


  OnSubmit(form: NgForm) {    
    let currentUser = "SuperAdmin@gmail.com"; // User service to provide this
    var TournamentEvent = form.value;
    this.tournamentService.CreateEvent(TournamentEvent,currentUser)
    .subscribe((data: any) => {
      if (data.StatusCode == 200) {
        this.CreateEventForm.reset();
        this.toastr.success('Successfully created a new event', "Success!");
      }
      else{
        data.errors.forEach(element => {
          switch (element.code) {
            case 'DuplicateEventName':
              this.toastr.error('Event Name is already exists','Capture failed.');
              break;
            default:
              this.toastr.error(element.description,'Capture failed.');
              break;
          }
      })}
    })
  };

  
}
