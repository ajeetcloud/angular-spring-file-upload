import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpEventType, HttpResponse} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {FileService} from '../file.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-single-file-upload',
  templateUrl: './single-file-upload.component.html',
  styleUrls: ['./single-file-upload.component.css'],
})

export class SingleFileUploadComponent implements OnInit {
  loaded = 0;
  selectedFiles: FileList;
  currentFileUpload: File;

  ngOnInit(): void {
  }

  constructor(private http: HttpClient, private fileService: FileService, private snackBar: MatSnackBar) {
  }

  // Selected file is stored into selectedFiles.
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  // Uploads the file to backend server.
  upload() {
    this.currentFileUpload = this.selectedFiles.item(0);
    this.fileService.uploadSingleFile(this.currentFileUpload)
      .pipe(tap(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.loaded = Math.round(100 * event.loaded / event.total);
        }
      })).subscribe(event => {
      if (event instanceof HttpResponse) {
        this.snackBar.open('File uploaded successfully!', 'Close', {
          duration: 3000
        });
        this.fileService.fetchFileNames();
      }
    });
  }
}
