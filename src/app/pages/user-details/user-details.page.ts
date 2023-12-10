import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Page } from 'src/app/core/scripts/page';
import { DataService } from 'src/app/core/services/data/data.service';
import { HelpersService } from 'src/app/core/services/helpers/helpers.service';
import { RefreshWatcherService } from 'src/app/core/services/refresh/refresh-watcher.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.page.html',
  styleUrls: ['./user-details.page.scss'],
})
export class UserDetailsPage implements OnInit {
  studentId!:string;
  user:any;
  isChecked!:boolean
  constructor(
    private helpers:HelpersService,
    private actRoute:ActivatedRoute,
    private data:DataService,
    private refreshWatcher:RefreshWatcherService

  ) { }

  ngOnInit(
  ) {
    this.studentId  = this.actRoute.snapshot.paramMap.get('id') as string;
    this.getUser()
  }
  navigate(page:string,dir:string,path?:string){

    this.helpers.navigate(page,dir,path)
  }
  //////////////////////////////////////////////////////////////////
navBack(){
  this.helpers.navBack()
}
getUser(){
  this.data.getData('/users/'+this.studentId).subscribe(
    (res:any)=>{
      this.user = res;
      this.isChecked = this.user?.active
    },
    err=>{

    }
  )
}

async toggleAccoutState(ev:any){
  this.helpers.StartLoading({})
  this.isChecked = !this.isChecked;
  this.data.updateData('/users/'+this.studentId,{active:this.isChecked}).subscribe(
    res=>{
      this.refreshWatcher.refreshPage(Page.Users);
      this.helpers.StopLoading()
      this.user = res;
      this.isChecked = this.user?.active
    },
    err=>{
      this.helpers.StopLoading()

    }
  )
}
}
