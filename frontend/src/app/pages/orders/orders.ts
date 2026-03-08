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
import { Driver } from '../../interfaces/driver-intefaces';
import { OrderPost } from '../../interfaces/order-interfaces';

interface Status {
  label: string;
  id: 'pending' | 'collecting' | 'collected' | 'delivering' | 'delivered' | undefined;
}

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

  editId = 0;
  formDialogVisible = false;
  selectedDriverFilter: Driver | undefined;
  selectedStatus: Status | undefined;
  optionsOrder: Status[] = [
    { label: 'Pendente', id: 'pending' },
    { label: 'Em coleta', id: 'collecting' },
    { label: 'Coletado', id: 'collected' },
    { label: 'Em entrega', id: 'delivering' },
    { label: 'Entregue', id: 'delivered' },
  ];

  optionsDrivers: Driver[] = [];
  orderForm = new FormGroup({
    order_number: new FormControl('', [Validators.required, Validators.min(1)]),
    driver_id: new FormControl<number | null>(null, [Validators.required]),
    origin_address: new FormControl('', [Validators.required]),
    status: new FormControl('pending', [Validators.required]),
    destination_address: new FormControl('', [Validators.required]),
    cargo_description: new FormControl('', [Validators.required]),
    weight_kg: new FormControl<number | null>(null, []),
    scheduled_date: new FormControl<Date | null>(null, [Validators.required]),
    notes: new FormControl('', []),
  });

  openDialog() {
    this.formDialogVisible = true;
  }

  closeDialog() {
    this.orderForm.reset({
      status: 'pending',
    });
    console.log(this.orderForm.value);
    this.formDialogVisible = false;
  }

  confirmRemoval(
    event: Event,
    status: 'pending' | 'collecting' | 'collected' | 'delivering' | 'delivered',
    id: number,
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
        label: 'Confirmar',
        severity: 'danger',
      },
      accept: () => {
        this.transportOrderService.delete(id).subscribe({
          complete: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Exclusão',
              detail: 'Ordem excluída com sucesso.',
            });
            this.reload();
          },
        });
      },
    });
  }

  confirmAdvancement(
    event: Event,
    status: 'pending' | 'collecting' | 'collected' | 'delivering' | 'delivered',
    id: number,
  ) {
    if (status === 'delivered') {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro ao avançar ordem',
        detail: 'A ordem já foi entregue.',
      });
      return;
    }
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Deseja avançar a ordem de transporte?',
      header: 'Avançar status',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancelar',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Avançar',
        severity: 'success',
      },
      accept: () => {
        this.transportOrderService.advanceOrder(id).subscribe({
          complete: () => {
            this.messageService.add({
              severity: 'info',
              summary: 'Exclusão',
              detail: 'Ordem excluída com sucesso.',
            });
            this.reload();
          },
        });
      },
    });
  }

  editDialog(id: number) {
    this.transportOrderService.getById(id).subscribe({
      next: (order) => {
        const date = order.scheduled_date;
        this.orderForm.setValue({
          order_number: order.order_number,
          cargo_description: order.cargo_description,
          origin_address: order.origin_address,
          destination_address: order.destination_address,
          driver_id: order.driver_id,
          notes: order.notes,
          status: order.status,
          scheduled_date: new Date(date),
          weight_kg: order.weight_kg,
        });
      },
      complete: () => {
        this.editId = id;
        this.formDialogVisible = true;
      },
    });
  }

  filterByDriverId() {
    if (!this.selectedDriverFilter || !this.selectedDriverFilter.id) {
      this.transportOrderService.setQuery('', 'clear');
      return;
    }
    this.transportOrderService.setQuery(this.selectedDriverFilter.id, 'driver');
  }

  filterByStatus() {
    if (!this.selectedStatus || !this.selectedStatus.id) {
      this.transportOrderService.setQuery('', 'clear');
      return;
    }
    this.transportOrderService.setQuery(this.selectedStatus.id, 'status');
  }

  clearFilters() {
    this.selectedDriverFilter = undefined;
    this.selectedStatus = undefined;
    this.transportOrderService.setQuery('', 'clear');
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

  editOrder(order: OrderPost) {
    this.transportOrderService.edit(order, this.editId).subscribe({
      complete: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Cadastro concluído',
          detail: 'Ordem cadastrada com sucesso.',
        });
        this.reload();
        this.closeDialog();
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro ao editar ordem',
          detail: 'Algum erro ocorreu.',
        });
        console.error(err);
      },
    });
  }

  onSubmit() {
    if (this.orderForm.valid && this.orderForm.value) {
      const driverId = this.orderForm.get('driver_id')!.value;
      if (!driverId) {
        this.messageService.add({
          severity: 'error',
          summary: 'Ordem sem motorista',
          detail: 'Favor preencher o motorista encarregado pela ordem de transporte.',
        });
        return;
      }
      const orderFormValues = this.orderForm.value;
      const scheduledDate = orderFormValues.scheduled_date!.toISOString().split('T')[0];

      const order: OrderPost = {
        order_number: orderFormValues.order_number!,
        driver_id: driverId!,
        cargo_description: orderFormValues.cargo_description!,
        origin_address: orderFormValues.origin_address!,
        destination_address: orderFormValues.destination_address!,
        scheduled_date: scheduledDate,
        status: this.editId ? orderFormValues.status! : 'pending',
        weight_kg: orderFormValues.weight_kg!,
        notes: orderFormValues.notes ?? null,
      };

      if (this.editId) this.editOrder(order);
      else this.createOrder(order);
    }
  }
}
