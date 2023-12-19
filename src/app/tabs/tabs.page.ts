import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth/auth.service';
import { HelpersService } from '../core/services/helpers/helpers.service';
import { DataService } from '../core/services/data/data.service';
import { RefreshWatcherService } from '../core/services/refresh/refresh-watcher.service';
import { Subscription } from 'rxjs';
import { Page } from '../core/scripts/page';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit, OnDestroy {
suggCount!:number
refSub:Subscription |undefined
  constructor(
    private router:Router,
    private auth:AuthService,
    private helpers:HelpersService,
    private data:DataService,
    private refreshWatcher:RefreshWatcherService
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
 ngOnInit() {

    this.getCountSuggest();

    this.refSub = this.refreshWatcher.refreshObservable .subscribe(
      page=>{
        if(page===Page.Tabs){
          this.getCountSuggest()
        }
      }
    )
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
  getCountSuggest(){
    this.data.getData('/suggest/count?seen=false').subscribe(
      res=>{
          this.suggCount = res;
      }
    )

  }

  ngOnDestroy(): void {
      if (this.refSub){
        this.refSub.unsubscribe()
      }
  }

}
