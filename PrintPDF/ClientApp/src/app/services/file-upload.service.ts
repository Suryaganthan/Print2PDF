import { Injectable } from '@angular/core';
import { BaseService } from './base-service/base-service.service';
import { UploadFile } from '../models/upload-file.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(
    private http: HttpClient) {
  }

  getImagesAsPDF(value: any) {
    return this.http.post<any>('api/PDFConversion/getImagesAsPDF', value);
  }
}
