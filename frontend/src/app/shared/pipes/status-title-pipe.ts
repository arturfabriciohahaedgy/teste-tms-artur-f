import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statustitle',
  standalone: true,
})
export class StatusTitlePipe implements PipeTransform {
  transform(value: string): string {
    switch (value) {
      case 'pending':
        return 'Pendente';
      case 'collecting':
        return 'Em coleta';
      case 'collected':
        return 'Coletado';
      case 'delivering':
        return 'Em entrega';
      case 'delivered':
        return 'Entregue';
      default:
        return value;
    }
  }
}
