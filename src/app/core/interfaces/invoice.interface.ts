export interface Invoice{
  _id?:string;
  debit?:number;
  credit?:number;
  student?:string;
  service?:string;
  notes?:string;
  createdAt?:Date|string;
}
