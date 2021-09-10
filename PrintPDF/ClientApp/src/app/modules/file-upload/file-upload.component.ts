import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  form: FormGroup;
  sanitizedImageList: string[] = [];


  //get imageList() { return this.form.get('imageList') as FormArray }

  constructor(
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private fileUploAdService: FileUploadService) {
    this.form = fb.group({
      'documentID': [0],
      'documentName': [null]
    })
  }

  ngOnInit() {
  }

  onChange(event) {
    if (event.target.files) {
      [...event.target.files].forEach(x => {
        const file = x;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const base64Img: string | ArrayBuffer = reader.result;
          this.sanitizedImageList.push(base64Img as string);
        };
      })
    }
  }

  setImageList(data: any) {
    const fg = this.fb.group({
      image: data
    })
    return fg;
  }

  public convertToPDF(event: any) {
    const value = this.form.value;
    value.sanitizedImageList = this.sanitizedImageList;
    debugger;
    this.fileUploAdService.getImagesAsPDF(value).subscribe(response => {

      let newPdfWindow = window.open('') as Window;

      newPdfWindow.document.write("<\iframe width='100%' height='100%' src='data:application/pdf;base64, " + encodeURIComponent(response) + "'><\/iframe>");
    });
  }

  deleteSelected(index: number) {
    this.sanitizedImageList.splice(index, 1);
  }

}
