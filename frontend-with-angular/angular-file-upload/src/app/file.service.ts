import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) {
  }

  uploadSingleFile(file: File): Observable<HttpEvent<{}>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    console.log(formData);
    return this.http.post<any>(
      'http://localhost:8080/uploadFile',
      formData,
      {
        reportProgress: true,
        observe: 'events'
      });
  }

  // Fetches the names of files to be displayed in the downloads list.
  fetchFileNames() {
    return this.http
      .get<string[]>('http://localhost:8080/getFiles');
  }
}
