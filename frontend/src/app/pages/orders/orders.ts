import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
import { TransportOrderService } from '../../services/transport-order-service';
import { TextareaModule } from 'primeng/textarea';
import { DriverService } from '../../services/driver-service';
import { Driver } from '../../interface/driver-intefaces';
import { OrderPost } from '../../interface/order-interfaces';

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
    FormsModule,
    TextareaModule,
    DatePipe,
    StatusTitlePipe,
  ],
  providers: [ConfirmationService, MessageService],
})
export class Orders {
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);
  protected readonly transportOrderService = inject(TransportOrderService);
  protected readonly driverService = inject(DriverService);

  isFormEdit = false;
  formDialogVisible = false;
  optionsOrder = [
    { label: '-', id: '' },
    { label: 'Pendente', id: 'pending' },
    { label: 'Em coleta', id: 'collecting' },
    { label: 'Coletando', id: 'collected' },
    { label: 'Em entrega', id: 'delivering' },
    { label: 'Entregue', id: 'delivered' },
  ];

  optionsDrivers: Driver[] = [];
  orderForm = new FormGroup({
    order_number: new FormControl('', [Validators.required, Validators.min(1)]),
    driver_id: new FormControl<number | null>(null, [Validators.required]),
    origin_address: new FormControl('', [Validators.required]),
    destination_address: new FormControl('', [Validators.required]),
    cargo_description: new FormControl('', [Validators.required]),
    weight_kg: new FormControl<number | null>(null, []),
    scheduled_date: new FormControl('', [Validators.required]),
    notes: new FormControl('', []),
  });

  openDialog() {
    this.formDialogVisible = true;
  }

  closeDialog() {
    this.orderForm.reset();
    this.formDialogVisible = false;
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

  reload() {
    this.transportOrderService.reload();
  }

  createOrder(order: OrderPost) {
    this.transportOrderService.create(order).subscribe({
      complete: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Cadastro concluído',
          detail: 'Motorista cadastrado com sucesso.',
        });
        this.reload();
        this.closeDialog();
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro ao cadastrar motorista',
          detail: 'Algum erro ocorreu.',
        });
        console.error(err);
      },
    });
  }

  onSubmit() {
    if (this.orderForm.valid && this.orderForm.value) {
      const driverId = this.orderForm.get('driver')!.value;
      if (!driverId) {
        this.messageService.add({
          severity: 'error',
          summary: 'Ordem sem motorista',
          detail: 'Favor preencher o motorista encarregado pela ordem de transporte.',
        });
        return;
      }
      const orderFormValues = this.orderForm.value;
      const scheduledDate = new Date(orderFormValues.scheduled_date!).toISOString().split('T')[0];

      const order: OrderPost = {
        order_number: orderFormValues.order_number!,
        driver_id: driverId!,
        cargo_description: orderFormValues.cargo_description!,
        origin_address: orderFormValues.origin_address!,
        destination_address: orderFormValues.destination_address!,
        scheduled_date: scheduledDate,
        status: 'pending',
        weight_kg: orderFormValues.weight_kg!,
        notes: orderFormValues.notes ?? null,
      };

      this.createOrder(order);
    }
  }
}
