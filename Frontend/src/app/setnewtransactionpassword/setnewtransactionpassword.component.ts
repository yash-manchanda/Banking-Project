import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Forgotpassword } from './../admin';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setnewtransactionpassword',
  templateUrl: './setnewtransactionpassword.component.html',
  styleUrls: ['./setnewtransactionpassword.component.css']
})
export class SetnewtransactionpasswordComponent implements OnInit {

  
  loginForm: FormGroup;
  user = new Forgotpassword();

  userId = sessionStorage.getItem('userId')
  view(){
    this.user.userId = this.userId;
    console.log(this.user)
    this.http.post<any>("http://localhost:8086/forgetTransactionPassword",this.user)
      .subscribe(data=>{
        if(data.status=='FAILURE'){
          alert(data.message+",Please register");
        }else{
          alert("Password Updated")
          this.router.navigate(['accountmainpage'])
        }
      })
  }
  

  error_messages = {

    'password': [
      { type: 'required', message: 'password is required.' },
      { type: 'minlength', message: 'password length should be 4.' },
      { type: 'maxlength', message: 'password length should be 4.' },
      { type: 'pattern', message:'password must consist of only number'}
    ],
    'confirmpassword': [
      { type: 'required', message: 'password is required.' },
      { type: 'minlength', message: 'password length should be 4.' },
      { type: 'maxlength', message: 'password length should be 4.'},
      {type: 'pattern', message:'password must consist of only number' }
    ],
  }

  constructor(
    private http : HttpClient,
    private router : Router,
    public formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(4),
        Validators.pattern(/^-?(0|[1-9]\d*)?$/)
      ])),
      confirmpassword: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(4),
        Validators.pattern(/^-?(0|[1-9]\d*)?$/)
      ])),
    }, { 
      validators: this.password.bind(this)
    });
  }

  ngOnInit() {
  }

  password(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: confirmPassword } = formGroup.get('confirmpassword');
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }

}
