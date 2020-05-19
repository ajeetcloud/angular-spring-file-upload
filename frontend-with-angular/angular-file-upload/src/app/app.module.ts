import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {AppComponent} from './app.component';
import {SingleFileUploadComponent} from './single-file-upload/single-file-upload.component';
import {MultiFileUploadComponent} from './multi-file-upload/multi-file-upload.component';
import {DownloadComponent} from './download/download.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HeaderComponent} from './header/header.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatListModule} from '@angular/material/list';

const appRoutes: Routes = [
  {path: '', component: SingleFileUploadComponent, pathMatch: 'full'},
  {path: 'multi-upload', component: MultiFileUploadComponent},
  {path: 'download', component: DownloadComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    SingleFileUploadComponent,
    MultiFileUploadComponent,
    DownloadComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,
    FormsModule,
    MatCardModule,
    FlexLayoutModule,
    MatProgressBarModule,
    [RouterModule.forRoot(appRoutes)],
    MatListModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
