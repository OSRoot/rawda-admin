import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Storage } from '@ionic/storage-angular';
import { Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private BASEAPI = environment.baseUrl as string;
  private body: any;
  private user: any = {};
  private Params:any;
  private id!:string;

  constructor(
    // private storage:Storage,
    private http: HttpClient
  ) {}

  get getId():string{
    return  this.id;
  }
  set setId(id:string){
    this.id = id;
  }

  set Body(body: any) {
    this.body = body;
  }

  get Body(): any {
    return this.body;
  }
  // set setUser(){}
  set setParams(data:any){
    this.Params = data
  }
  get getParams():any{
    return this.Params;
  }
  

  getData(endPoint: string): Observable<any> {
    return this.http.get(this.BASEAPI + endPoint).pipe(take(1));
  }

  postData(endPoing: string, body: any): Observable<any> {
    return this.http.post(this.BASEAPI + endPoing, body).pipe(take(1));
  }

  updateData(endPoing: string, body: any): Observable<any> {
    return this.http.put(this.BASEAPI + endPoing, body).pipe(take(1));
  }

  deleteData(endPoing: string): Observable<any> {
    return this.http.delete(this.BASEAPI + endPoing).pipe(take(1));
  }

  get baseApi(): string {
    return this.BASEAPI;
  }
}
// use this in search
// getEndpoint() {
//   let endPoint = `/students?=${this.skip}`;
//   if(this.searchText.trim() != '') endPoint +=`&name=${this.searchText}`;
//   if(this.teacher) endPoint += `&teacher=${this.teacher}`
//   return endPoint;
// }
