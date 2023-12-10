import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/services/data/data.service';
import { HelpersService } from 'src/app/core/services/helpers/helpers.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  errorView: boolean = false;
  emptyView: boolean = false;
  isLoading: boolean=true;
  users:any[]=[]
  skip=0;
  searchText:string=''
  username:string=''
  constructor(
    private data:DataService,
    private helpers:HelpersService
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


getEndpoint() {
  let endPoint = `/users?skip=${this.skip}`;
  if (this.searchText.trim() != '') endPoint += `&phone=${this.searchText}`;
  if (this.username.trim() != '') endPoint += `&name=${this.username}`;
  return endPoint;
}
/////////////////////////////////////////////////////////////////////////
loadData(ev: any) {
  if (this.users.length != 0){
    this.skip = 20;
  }
  this.getData(ev);
}
trackByFn(index:number) {
  return index;
}


getData(ev?:any){
  this.data.getData(this.getEndpoint()).subscribe(
    (res:any)=>{
      this.users = this.skip ? this.users.concat(res) : res;
      this.users.length? this.showContentView(ev) : this.showEmptyView(ev);
    },
    (err:any)=>{
      this.showErrorView(ev)
    }
  )
}

  /////////////////////////////////////////////////////////////////////////
  HandleSearchInput(ev: any) {
    this.getData(ev);
  }
  /////////////////////////////////////////////////////////////////////////
  getDataAgain(ev:any ){
    if (ev.target.value===''){
      this.getData(ev)
    }
  }

  /////////////////////////////////////////////////////////////////////////
  // #############################################################
  doRefresh(ev: any): void {
    if (this.users.length){
      this.skip = 0;
    }
    this.getData(ev);
  }
  // #############################################################
  showContentView(ev: any): void {
    this.isLoading = false;
    this.errorView = false;
    this.emptyView = false;
    if (ev) ev.target.complete();
  }
  // #############################################################
  showErrorView(ev: any): void {
    this.isLoading = false;
    this.errorView = true;
    this.emptyView = false;
    if (ev) ev.target.complete();
  }
  // #############################################################
  showEmptyView(ev: any): void {
    this.isLoading = false;
    this.errorView = false;
    this.emptyView = true;
    if (ev) ev.target.complete();
  }
  //  #############################################################
}
