import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { DataService } from 'src/app/core/services/data/data.service';
import { HelpersService } from 'src/app/core/services/helpers/helpers.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  contacts:any;
  form!:FormGroup;
  constructor(
    private helpers:HelpersService,
    private fb:FormBuilder,
    private modalCtrl:ModalController,
    private data:DataService
  ) { }

  ngOnInit(
  ) {
    this.form = this.fb.group({
      phone:['', Validators.required],
      whatsapp:['', Validators.required],
      facebook:['', Validators.required],
    })
    this.getContacts()


  }
  navigate(page:string,dir:string,path?:string){

    this.helpers.navigate(page,dir,path)
  }
  //////////////////////////////////////////////////////////////////
navBack(){
  this.helpers.navBack()
}
doRefresh(ev:any){}
getContacts(){
  this.data.getData('/support').subscribe(
    res=>{
      this.contacts = res;
      if (this.contacts?._id){
        this.form.patchValue({
          phone:this.contacts.phone,
          whatsapp:this.contacts.whatsapp,
          facebook:this.contacts.facebook
        })
      }
    }
  )
}
async saveContacts(){
  await this.helpers.StartLoading({})
  if(this.form.invalid){
    return this.helpers.PresentGenericToaster({message:'بالبيانات غير صحيحة'})
  }
  if (this.contacts._id){
    this.data.updateData('/support/'+this.contacts?._id,this.form.value).subscribe(
      res=>{
        this.helpers.StopLoading()
        this.helpers.PresentGenericToaster({message:'تم تحديث بيانات الاتصال بنجاح'})
        this.dismiss()
      },
      err=>{
        this.helpers.StopLoading()

      }
    )
  }
  else{
    this.data.postData('/support',this.form.value).subscribe(
      res=>{
        this.helpers.StopLoading()
        this.helpers.PresentGenericToaster({message:'تم اضافة بيانات الاتصال بنجاح'})
        this.dismiss()
      },
      err=>{
        this.helpers.StopLoading()

      }
    )
  }
}

logger(){
  console.log(this.form.value);
  console.log(this.contacts);

}
dismiss(){
  this.modalCtrl.dismiss()
}
}
