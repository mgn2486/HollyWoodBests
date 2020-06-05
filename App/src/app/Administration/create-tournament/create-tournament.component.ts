import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/Models/user.model';
import { UserService } from 'src/app/shared/services/User-Service/user.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, Validators, NgForm, AbstractControl } from '@angular/forms';
import { TournamentService } from 'src/app/shared/services/tournament-service/tournament.service';
import { ITournamentModel } from 'src/app/shared/models/tournament.Model';

@Component({
  selector: 'app-create-tournament',
  templateUrl: './create-tournament.component.html',
  styleUrls: ['./create-tournament.component.css']
})
export class CreateTournamentComponent implements OnInit {

  user: User;
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

  public CreateTournamentForm: FormGroup;
  public tournamentList: ITournamentModel[];
  
  ngOnInit() {

    this.getTournamentsList();

    this.CreateTournamentForm = this.fb.group({
      tournamentName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]), 
    });

    this.CreateTournamentForm.valueChanges.subscribe((data) =>{
      this.logValidationErrors(this.CreateTournamentForm);
    });
  }

  // Logs validation error messages
  logValidationErrors(group: FormGroup = this.CreateTournamentForm): void {
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

  private getTournamentsList(){
    this.tournamentService.getAllTournamentsList().subscribe( tournamens => {
      this.tournamentList = tournamens;
   });
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.CreateTournamentForm.controls[controlName].hasError(errorName);
  }


  OnSubmit(form: NgForm) {    
    let currentUser = "SuperAdmin@gmail.com"; // User service to provide this
    var TourName = form.value.tournamentName;
    this.tournamentService.CreateTournamanet(TourName,currentUser)
    .subscribe((data: any) => {
      if (data.StatusCode == 200) {
        this.getTournamentsList();
        this.CreateTournamentForm.reset();
        this.toastr.success('Successfully created a new Tournament', "Success!");
      }
      else{
        data.errors.forEach(element => {
              this.toastr.error('Tournament could not be created','Capture failed.');              
      })}
    })
  };

  delete(id:number)
  {
    this.tournamentService.DeleteTournament(id).subscribe((data: any) => {
      if (data.StatusCode == 200) {
        this.getTournamentsList();
        this.CreateTournamentForm.reset();
        this.toastr.success('Successfully deleted the Tournament', "Success!");
      }
      else{
        data.errors.forEach(element => {
              this.toastr.error('Tournament does not exists','Delete failed.');              
          })
      }
    })
  }

  
}

