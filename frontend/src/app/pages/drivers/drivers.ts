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
import { DriverService } from '../../services/driver-service';

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
  protected readonly driverService = inject(DriverService);

  isFormEdit = false;
  formDialogVisible = false;
  optionsCNH = ['A', 'B', 'C', 'D', 'E'];
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

  closeDialog() {
    this.driverForm.reset();
    this.formDialogVisible = false;
  }

  confirmInactivation(event: Event, id: number) {
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
        this.driverService.inactivateDriver(id).subscribe({
          complete: () => {
            this.messageService.add({
              severity: 'info',
              summary: 'Inativado',
              detail: 'Motorista inativado com sucesso.',
            });
            this.reload();
          },
        });
      },
    });
  }

  editDialog(id: number) {
    this.driverService.getById(id).subscribe({
      next: (driver) => {
        this.driverForm.setValue({
          cnh_category: driver.cnh_category,
          name: driver.name,
          cnh_number: driver.cnh_number,
          phone: driver.phone,
          cpf: driver.cpf,
        });
      },
      complete: () => {
        this.formDialogVisible = true;
      },
    });
  }

  reload() {
    this.driverService.reload();
  }

  onSubmit() {
    if (this.driverForm.valid && this.driverForm.value) {
      const category = this.driverForm.get('cnh_category')!.value;
      if (!category) {
        this.messageService.add({
          severity: 'error',
          summary: 'CNH sem categoria',
          detail: 'Favor preencher a categoria da CNH do motorista.',
        });
        return;
      }
      const driver = this.driverForm.value ?? {};
      this.driverService
        .createDriver({
          name: driver.name!,
          cpf: driver.cpf!,
          cnh_number: driver.cnh_number!,
          cnh_category: category,
          phone: driver.phone ?? undefined,
        })
        .subscribe({
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
  }
}
