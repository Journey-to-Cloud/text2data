import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ModelapiService } from './modelapi.service';
import Handsontable from 'handsontable';
import * as XLSX from 'xlsx';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  prompt: any;
  data: any;
  loading: boolean = false;
  promptText: string = '';
  isMemoryOn: boolean = false;
  fileUploaded: boolean = false;
  successMsg: any
  ngOnInit(): void { }
  @ViewChild('fileInput') fileInput: any;
  constructor(private modelapiService: ModelapiService, private render: Renderer2) { }

  query(value: any) {
    return new Promise((resolve, reject) => {
      // this.modelapiService.query(value + ' dont use limit in sql server only query').subscribe({
      this.modelapiService.query(value).subscribe({
        next: (response: any) => {
          console.log(response);
          resolve(response);
        },
        error: (error: any) => {
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
      this.loading = false
      return alert('Enter Valid Text!');
    }
    await this.query(this.prompt).then((responce) => {
      this.data = responce;
      this.loading = false;
      this.prompt = '';
    });
    if (this.data == null) {
      alert("Something went wrong")
    }
    if (container) {
      new Handsontable(container, {
        data: this.data.body,

        //colHeaders: true,
        //rowHeaders: true,
        //height: 'auto',
        licenseKey: 'non-commercial-and-evaluation',
      });
    }
  }
  onFileSelect() {
    let file = this.fileInput.nativeElement.files[0];
    console.log("file uplaod: ", file)
    //const file = event.target.files[0];
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }
    if (file) {
      const formData = new FormData();
      formData.append("Data", file)
      this.modelapiService.uploadFile(formData).subscribe((res: any) => {
        this.successMsg = res.body
        this.fileUploaded = true
        console.log("file upload response", res);
      });
    }
  }

  onChangeToggle(event: any) {
    const value = event.target.checked ? 'ON' : 'OFF';
    if (value === 'ON') {
      console.log('Memory is ', value);
    } else {
      console.log('CSV is ', value);
    }
  }
}
