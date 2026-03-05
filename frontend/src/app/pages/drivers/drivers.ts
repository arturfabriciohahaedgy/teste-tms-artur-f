import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

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
    ConfirmDialogModule,
    ToastModule,
  ],
  providers: [ConfirmationService, MessageService],
})
export class Drivers {
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  formDialogVisible = false;
  optionsCNH = [{ id: 'A' }, { id: 'B' }, { id: 'C' }, { id: 'D' }, { id: 'E' }];
  drivers = [
    {
      id: 20,
      name: 'AAA',
      cnh_category: 'A',
      created_at: new Date(),
      active: true,
    },
  ];
  driverForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    cpf: new FormControl('', [Validators.required]),
    cnh_number: new FormControl('', [Validators.required]),
    cnh_category: new FormControl('', [Validators.required]),
    phone: new FormControl('', []),
  });

  openDialog() {
    this.formDialogVisible = true;
  }

  confirmInactivation(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Deseja inativar o motorista?',
      header: 'Inativar motorista',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancelar',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Inativar',
        severity: 'danger',
      },
      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Inativado',
          detail: 'Motorista inativado com sucesso.',
        });
      },
    });
  }

  editDialog(id: number) {
    console.log('id:', id);
    this.formDialogVisible = true;
  }

  oSubmit() {}
}
