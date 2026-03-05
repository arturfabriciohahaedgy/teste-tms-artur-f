import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'tms-drivers',
  templateUrl: './drivers.html',
  styleUrls: ['./drivers.scss'],
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    TableModule,
    DialogModule,
    InputTextModule,
    SelectModule,
    DatePipe,
  ],
})
export class Drivers {
  formDialogVisible = false;
  optionsCNH = [{ id: 'A' }, { id: 'B' }, { id: 'C' }, { id: 'D' }, { id: 'E' }];
  drivers = [
    {
      name: 'AAA',
      cnh_category: 'A',
      created_at: new Date(),
      edited_at: null,
    },
  ];

  driverForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    cpf: new FormControl('', [Validators.required]),
    cnh_number: new FormControl('', [Validators.required]),
    cnh_category: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
  });

  openDialog() {
    this.formDialogVisible = true;
  }

  oSubmit() {}
}
