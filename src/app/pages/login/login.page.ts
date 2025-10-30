import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { HelpersService } from 'src/app/core/services/helpers/helpers.service';
import { Dir } from 'src/app/core/interfaces/directions';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  isLoading:boolean=false;
  login_form!:FormGroup;
  Dir = Dir;

  constructor(
    private helpers:HelpersService,
    private fb:FormBuilder,
    private auth:AuthService,
    // private loading:LoaderService
    // private storage:Storage
    ) { }

  ngOnInit() {

    this.login_form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  navigate(page:string,dir:string,path?:string){
    this.helpers.navigate(page,dir,path)
  }


  async login(){
    await this.helpers.StartLoading({});
    if (this.login_form.invalid) {
        this.helpers.StopLoading();
        this.helpers.PresentGenericToaster({message:'بيانات غير كاملة'});
        return;
    }
    this.auth.login('/auth/login-admin', this.login_form.value).subscribe(
      res=>{
        this.helpers.StopLoading()
      },
      err=>{
        this.helpers.StopLoading()
      }
    )
  }
}
