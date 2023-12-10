export interface Image{
    name?:string;
    // size?:number|string;
    path?:string;
    data?:string
    progress?:number;
}

export interface ImageDownlad{
    url:string;
    destination:string;
    extractedFilename?:boolean;
}