import {Component, OnInit} from '@angular/core';
import {tap} from 'rxjs/operators';
import {HttpClient, HttpEventType, HttpResponse} from '@angular/common/http';
import {FileService} from '../file.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FileDetails} from '../file.model';

@Component({
  selector: 'app-multi-file-upload',
  templateUrl: './multi-file-upload.component.html',
  styleUrls: ['./multi-file-upload.component.css']
})
export class MultiFileUploadComponent implements OnInit {
  loaded = 0;
  selectedFiles: FileList;
  uploadedFiles: FileDetails[] = [];
  showProgress = false;

  constructor(private http: HttpClient, private fileService: FileService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    this.showProgress = true;
    this.uploadedFiles = [];
    Array.from(this.selectedFiles).forEach(file => {
      const fileDetails = new FileDetails();
      fileDetails.name = file.name;
      this.uploadedFiles.push(fileDetails);
      this.fileService.uploadSingleFile(file)
        .pipe(tap(event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.loaded = Math.round(100 * event.loaded / event.total);
            fileDetails.progress = this.loaded;
          }
        })).subscribe(event => {
        if (event instanceof HttpResponse) {
          if (this.selectedFiles.item(this.selectedFiles.length - 1) === file) {
            // Invokes fetchFileNames() when last file in the list is uploaded.
            this.fileService.fetchFileNames();
          }
        }
      });
    });
  }

}
