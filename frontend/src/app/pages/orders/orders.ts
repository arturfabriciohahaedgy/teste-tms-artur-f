import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { DatePickerModule } from 'primeng/datepicker';
import { ConfirmationService, MessageService } from 'primeng/api';
import { StatusTitlePipe } from '../../shared/pipes/status-title-pipe';

@Component({
  selector: 'tms-orders',
  templateUrl: './orders.html',
  styleUrls: ['./orders.scss'],
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    TableModule,
    DialogModule,
    InputTextModule,
    SelectModule,
    ConfirmDialogModule,
    ToastModule,
    DatePickerModule,
    DatePipe,
    StatusTitlePipe,
  ],
  providers: [ConfirmationService, MessageService],
})
export class Orders {
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  formDialogVisible = false;
  optionsOrder = [
    { label: '-', id: '' },
    { label: 'Pendente', id: 'pending' },
    { label: 'Em coleta', id: 'collecting' },
    { label: 'Coletando', id: 'collected' },
    { label: 'Em entrega', id: 'delivering' },
    { label: 'Entregue', id: 'delivered' },
  ];
  optionsDrivers = [
    { label: '-', id: 50 },
    { label: 'Marco Rubião', id: 50 },
    { label: 'João Silva', id: 12 },
  ];
  orderForm = new FormGroup({
    number: new FormControl('', [Validators.required, Validators.min(1)]),
    driver: new FormControl('', [Validators.required]),
    driver_id: new FormControl('', [Validators.required]),
    origin_address: new FormControl('', [Validators.required]),
    destination_address: new FormControl('', [Validators.required]),
    cargo_description: new FormControl('', [Validators.required]),
    weight_kg: new FormControl('', []),
    status: new FormControl('', [Validators.required]),
    scheduled_date: new FormControl('', [Validators.required]),
    notes: new FormControl('', []),
  });
  orders = [
    {
      id: 20,
      number: 2020931,
      origin_address: 'Rua Beija-Flor',
      destination_address: 'Centro',
      weight_kg: 'A',
      status: 'collecting',
      scheduled_at: new Date(new Date().getMonth() - 3),
      created_at: new Date(),
      edited_at: null,
      active: true,
    },
  ];

  openDialog() {
    this.formDialogVisible = true;
  }

  confirmInactivation(
    event: Event,
    status: 'pending' | 'collecting' | 'collected' | 'delivering' | 'delivered',
  ) {
    if (status !== 'pending') {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro ao excluir',
        detail: 'Não é possível excluir ordens que não estejam pendentes.',
      });
      return;
    }
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Deseja excluir a ordem de transporte?',
      header: 'Excluir ordem',
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
          summary: 'Exclusão',
          detail: 'Ordem excluída com sucesso.',
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
