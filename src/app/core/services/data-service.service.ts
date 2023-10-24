import { Injectable } from '@angular/core';
import { Paciente } from '../../core/@types/patient';

@Injectable({
  providedIn: 'root',
})
export class DataServiceService {
  private patient?: Paciente;

  setPaciente(paciente: Paciente) {
    this.patient = paciente;
  }
  getPaciente() {
    return this.patient;
  }
}
