import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { TournamentService } from 'src/app/shared/services/tournament-service/tournament.service';
import { ITournamentModel } from 'src/app/shared/models/tournament.Model';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {

  formErrors = {
    'tournamentName': '',
    'eventName':''
  };

  // This object contains all the validation messages for this form
  validationMessages = {
    'tournamentName': {
      'required': 'Tournament name is required.',
    },
    'eventName': {
      'required': 'Event name is required.',
      'minlength': 'Event name must be greater than 2 characters.',
      'maxlength': 'Event name must be less than 100 characters.'
    },     
  };

  constructor( private toastr: ToastrService, private fb: FormBuilder, private tournamentService :TournamentService) { }

  public CreateEventForm: FormGroup;
  public tournamentList: ITournamentModel[];
  
  ngOnInit() {

    this.getTournamentsList();

    this.CreateEventForm = this.fb.group({
      tournamentName: new FormControl('', [Validators.required]),
      eventName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]), 
    });

    this.CreateEventForm.valueChanges.subscribe((data) =>{
      this.logValidationErrors(this.CreateEventForm);
    });
  }

  private getTournamentsList(){
    this.tournamentService.getAllTournamentsList().subscribe( tournamens => {
      this.tournamentList = tournamens;
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

}
