import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ModelapiService {
  constructor(private http:HttpClient) { }
  query(prompt:string){
    var modelApi = environment.model_api.replace("${query}",prompt)
    return this.http.get(`${modelApi}`)
  }
}
