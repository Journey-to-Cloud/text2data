import { Component, OnInit,Renderer2 } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ModelapiService } from './modelapi.service';
import Handsontable from 'handsontable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  prompt: any;
  data: any;
  loading:boolean = false;
  ngOnInit(): void {}
  constructor(private modelapiService: ModelapiService,private render: Renderer2) {}

  query(value: any) {
    return new Promise((resolve, reject) => {
      this.modelapiService.query(value + ' dont use limit in sql server only query').subscribe({
        next: (response) => {
          console.log(response);
          resolve(response);
        },
        error: (error) => {
          reject(error);
        },
      });
    });
  }

  async bindingData() {
    this.loading = true
    const container = document.querySelector('#summaryData');
    this.render.setProperty(container, 'innerHTML', '');
    this.data = null
    console.log('Prompt', this.prompt);
    if (!this.prompt) {
      this.loading  = false
      return alert('Enter Valid Text!');
    }
    await this.query(this.prompt).then((responce) => {
      this.data = responce;
      this.loading  = false
      this.prompt = ''
    });
    if(this.data.summaryDataArray==null){
      alert("Something went wrong")
    }
    if (container) {
      new Handsontable(container, {
        data: this.data.summaryDataArray,
        
        //colHeaders: true,
        //rowHeaders: true,
        //height: 'auto',
        licenseKey: 'non-commercial-and-evaluation',
      });
    }
  }
}
