import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ModelapiService {
  constructor(private http:HttpClient) { }
  query(prompt:string){
    var modelApi = environment.get_response.replace("${query}",prompt)    
    return this.http.get(`${modelApi}`)
  }
  uploadFile(file:any) {
    var uploadApi = environment.upload_file;
    return this.http.post(`${uploadApi}`, file,{withCredentials: true })
  }
}
