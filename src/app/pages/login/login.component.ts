import {Component} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {LoginService} from "../../shared/commonService/login.service";
import {JwtService} from "../../shared/PublicService/JwtService";
import {UserService} from "../../shared/commonService/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {

  public form:FormGroup;
  public workerNo:AbstractControl;
  public password:AbstractControl;
  public submitted:boolean = false;

  constructor(fb:FormBuilder,
              private loginService:LoginService,
              private JwtService:JwtService,
              public userService: UserService,
              public router: Router
              ) {
    this.form = fb.group({
      'workerNo': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.workerNo = this.form.controls['workerNo'];
    this.password = this.form.controls['password'];
  }

  public onSubmit(values:Object):void {
    this.submitted = true;
    if (this.form.valid) {
      // your code goes here
      // console.log(values);
      this.loginService.Login(this.workerNo.value,this.password.value).subscribe(data=>{
        if(data.success){
          this.JwtService.saveToken(data.content);
          this.userService.fetchCurrentUsrInfo().subscribe(d=>{
            this.userService.setUserInfo(d.content);
            this.router.navigate(['/pages/storage/handDevice']);
          })
        }
      },error=>{
        this.submitted=false;
        alert(error.error.message);
        }
      );
    }
  }
}
