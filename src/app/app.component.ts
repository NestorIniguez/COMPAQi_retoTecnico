import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/services/api.service';
import { ITable } from './table.nodel';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  formulario: FormGroup;
  dataTable: Array<ITable>;
  showTable: boolean;
  showError: boolean;
  errorString: string;

  constructor(
    public service: ApiService,
    public formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.showTable = false;
    this.showError = false;
    this.formulario = new FormGroup({
      nombre: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      codigo: new FormControl('', Validators.compose([
        Validators.required
      ]))
    });
  }

  sendDataName(): void {
    const nombre = this.formulario.get('nombre').value;
    const codigo = this.formulario.get('codigo').value;
    console.log(`Informacion recuperada ::::::::::::: ${nombre} / ${codigo}`);
    this.service.data(nombre).subscribe(response => {
      console.log(response);
    }, error => {
      this.showError = true;
      this.errorString = JSON.stringify(error);
      console.log(error);
    });
  }

  getDataTable(): void {
    this.service.data().subscribe(response => {
      this.dataTable = response;
      this.showTable = true;
      console.log(`response table :::::: ${JSON.stringify(this.dataTable)}`)
    })
  }
}
