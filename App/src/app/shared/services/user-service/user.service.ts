import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from '../../Models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly rootUrl = 'http://localhost:51618/';
  constructor(private http: HttpClient, private fb: FormBuilder) { }

  formModel = this.fb.group({
    FirstName :[''],
    LastName :[''],
    Initials :[''],
    UserName :[''],
    Passwords: this.fb.group({
      Password:[''],
      ConfirmPassword :['']
    })
  });

  public registerUser(user: User) {
    const body: User = {
      UserName: user.UserName,
      Password: user.Password,
      Email: user.Email,
      Initials: user.Initials,
      FirstName: user.FirstName,
      LastName: user.LastName
    }
    var reqHeader = new HttpHeaders({'No-Auth':'True'});
    return this.http.post(this.rootUrl + 'api/User/Register', body,{headers : reqHeader});
  }

  public userAuthentication({ username, password }: { username; password; })
  {
    let data = 'username='+username+'&password='+password+'&grant_type=password';
    let requestHeader = new HttpHeaders({'Content-Type':'application/x-www-urlencoded','No-Auth':'True' });
    return this.http.post(this.rootUrl+'/token',data,{headers: requestHeader})
  }

  getUserClaims() {
    return this.http.get(this.rootUrl+ 'api/GetUserClaims');
  }

  getAllRoles() {
    var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.get(this.rootUrl + '/api/GetAllRoles', { headers: reqHeader });
  }

  roleMatch(allowedRoles): boolean {
    var isMatch = false;
    var userRoles: string[] = JSON.parse(localStorage.getItem('userRole'));
    allowedRoles.forEach(element => {
      if (userRoles.indexOf(element) > -1) {
        isMatch = true;
        return false;
      }
    });
    return isMatch;
  }

}
