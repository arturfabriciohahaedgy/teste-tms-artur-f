import { Component, inject, OnInit } from '@angular/core';
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
import { DriverPost } from '../../interfaces/driver-intefaces';
import { NgxMaskDirective } from 'ngx-mask';
import { MessageModule } from 'primeng/message';

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
    NgxMaskDirective,
    MessageModule,
  ],
  providers: [ConfirmationService, MessageService],
})
export class Drivers implements OnInit {
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);
  protected readonly driverService = inject(DriverService);

  editId = 0;
  formSubmitted = false;
  formDialogVisible = false;
  optionsCNH = ['A', 'B', 'C', 'D', 'E'];
  driverForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    cpf: new FormControl('', [Validators.required, Validators.maxLength(14)]),
    cnh_number: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    cnh_category: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.maxLength(20)]),
  });

  ngOnInit(): void {
    this.driverService.setQuery('', 'clear');
  }

  openDialog() {
    this.formDialogVisible = true;
  }

  closeDialog() {
    this.driverForm.reset();
    this.formDialogVisible = false;
    this.editId = 0;
    this.formSubmitted = false;
  }

  confirmInactivation(event: Event, id: number, is_active: boolean) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: is_active ? 'Deseja inativar o motorista?' : 'Deseja reativar o motorista?',
      header: `${is_active ? 'Inativar' : 'Reativar'} motorista`,
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancelar',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: is_active ? 'Inativar' : 'Reativar',
        severity: 'danger',
      },
      accept: () => {
        this.driverService.inactivateDriver(id).subscribe({
          complete: () => {
            this.messageService.add({
              severity: 'info',
              summary: 'Inativado',
              detail: `Motorista ${is_active ? 'inativado' : 'reativado'} com sucesso.`,
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
        this.editId = id;
        this.formDialogVisible = true;
      },
    });
  }

  reload() {
    this.driverService.reload();
  }

  createDriver(driver: DriverPost) {
    this.driverService.create(driver).subscribe({
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

  editDriver(driver: DriverPost) {
    this.driverService.edit(driver, this.editId).subscribe({
      complete: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Edição concluída',
          detail: 'Dados do motorista editados com sucesso.',
        });
        this.reload();
        this.closeDialog();
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro ao editar motorista',
          detail: 'Algum erro ocorreu.',
        });
        console.error(err);
      },
    });
  }

  onSubmit() {
    this.formSubmitted = true;
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
      const driverFormValues = this.driverForm.value;
      const driver: DriverPost = {
        name: driverFormValues.name!,
        cnh_number: driverFormValues.cnh_number!,
        cnh_category: driverFormValues.cnh_category!,
        cpf: driverFormValues.cpf!,
        phone: driverFormValues.phone ?? null,
      };

      if (this.editId) this.editDriver(driver);
      else this.createDriver(driver);
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Formulário inválido',
        detail: 'Verifique se preencheu os campos corretamente.',
      });
    }
  }

  isInvalid(controlName: string): boolean {
    const control = this.driverForm.get(controlName);
    if (!control) {
      return true;
    }
    return control?.invalid && (control.touched || this.formSubmitted);
  }
}
