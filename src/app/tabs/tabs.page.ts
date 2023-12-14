import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth/auth.service';
import { HelpersService } from '../core/services/helpers/helpers.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  constructor(
    private router:Router,
    private auth:AuthService,
    private helpers:HelpersService
  ) {

   }

async logout(){
  const confirm = await this.helpers.GenericAlertConfirm({});
  if (confirm.role=== 'confirm') {
    this.auth.logOut();
  }
  else{
    return
  }
}
/////////////////////////////////////////////////////////////
async  ngOnInit() {
  return
}
/////////////////////////////////////////////////////////
////// WE WILL USE JOIN FORK TO GET BOTH USERS AND POSTS
/////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////
  //// Many things will be loaded here, please pay attention
  // ======================================================


  async ionViewWillEnter(){

  }
  ///////////// Method to help Activate the Tab ////////////
  isActive(route:string):boolean{
  return this.router.isActive(route, false)
  }
  /////////////////// Refresh Method ///////////////
  RefreshTabsContent(event:any):void{
    // refreshes all tabs
    setTimeout(() => {
      event.target.complete()
    }, 1500);
    console.log(event.target.value);

  }


}
