import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/services/data/data.service';
import { HelpersService } from 'src/app/core/services/helpers/helpers.service';

@Component({
  selector: 'app-send-notifications',
  templateUrl: './send-notifications.page.html',
  styleUrls: ['./send-notifications.page.scss'],
})
export class SendNotificationsPage implements OnInit {  errorView: boolean=false;
  emptyView: boolean=false;
  stopLoading:boolean = true;
  isLoading:boolean=true;
  skip: number=0;
  searchText:string='';
  users:any[]=[]
   constructor(
    private helpers:HelpersService,
    private data:DataService

  ) { }

  ngOnInit(
  ) {
    this.getData()
  }
  navigate(page:string,dir:string,path?:string){

    this.helpers.navigate(page,dir,path)
  }
  //////////////////////////////////////////////////////////////////
navBack(){
  this.helpers.navBack()
}
sendNotificationModal(student:any){}
getEndpointAttend() {
  let endPoint = `/users?skip=${this.skip}`;
  if(this.searchText.trim() != '') endPoint +=`&phone=${this.searchText}`;

  return endPoint;
}
  /////////////////////////////////////////////////////////////////////////
  handleSearchText(ev: any) {
    this.getData(ev);
  }
  /////////////////////////////////////////////////////////////////////////
  getDataAgain(ev:any ){
    if (ev.target.value===''){
      this.getData(ev)
    }
  }

  getData(ev?:any){
    this.data.getData(this.getEndpointAttend()).subscribe(
      (res:any)=>{
        this.users = this.skip ? this.users.concat(res) : res;
        this.users.length? this.showContentView(ev) : this.showEmptyView(ev);
        this.stopLoading = res?.length != 20;
      },
      (err:any)=>{
        this.showErrorView(ev)
      }
    )
  }
  /////////////////////////////////////////////////////////////////////////


  // #############################################################
  doRefresh(ev: any): void {
    this.skip = 0;
    this.getData(ev)
  }
//////////////////////////////////////////////////////////////////

loadData(ev:any){
    this.skip +=20;
    this.getData(ev)
}

// #############################################################
   showContentView(ev: any): void {
    this.isLoading = false;
    this.errorView = false;
    this.emptyView = false;
    this.stopLoading = true;
    if (ev) ev.target.complete();
  }
// #############################################################
  showErrorView(ev: any): void {
    this.isLoading = false;
    this.errorView = true;
    this.emptyView = false;
    this.stopLoading = true;
    if (ev) ev.target.complete();
  }
// #############################################################
  showEmptyView(ev: any): void {
    this.isLoading = false;
    this.errorView = false;
    this.emptyView = true;
    this.stopLoading = true;
    if (ev) ev.target.complete();
  }
  //  #############################################################;
}
