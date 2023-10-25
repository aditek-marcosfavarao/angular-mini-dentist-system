import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'cpf' })
export class CpfPipe implements PipeTransform {
  transform(value: string | number, hideValues = false): string {
    const stringfyValue = String(value);
    const padValue = stringfyValue.padStart(11, '0');
    const subStringValue = padValue.substring(0, 11);
    const regexNumber = subStringValue.replace(/[^0-9]/, '');
    const defineSeparators = regexNumber.replace(
      /(\d{3})(\d{3})(\d{3})(\d{2})/,
      '$1.$2.$3-$4'
    );

    const cpfValue = defineSeparators;
    const hiddedCpfValue = `xxx.${cpfValue.substring(4, 7)}-xx`;

    return hideValues ? hiddedCpfValue : cpfValue;
  }
}
