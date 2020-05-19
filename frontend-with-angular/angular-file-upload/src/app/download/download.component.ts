import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FileService} from '../file.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent implements OnInit {
  fileNames: string[];

  constructor(private http: HttpClient, private fileService: FileService, private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.fetchFileNames();
  }

  // Fetches the file names to display in list.
  fetchFileNames() {
    this.fileService.fetchFileNames().subscribe(filenames => {
      this.fileNames = filenames;
    });
  }

  // Downloads the selected fileName from backend server.
  downloadFile(fileName: string) {
    window.location.href = 'http://localhost:8080/downloadFile/' + fileName;
  }
}
