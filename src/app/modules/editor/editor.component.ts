import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import { State } from 'src/app/core/@types/state';
import { Treatment } from 'src/app/core/@types/treatment';

import { states } from 'src/app/data/state';
import { treatments } from 'src/app/data/treatment';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})
export class EditorComponent {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  readonly dateFormat = {
    simple: "dd'/'MM'/'yyyy",
    complete: "dd 'de' MMMM 'de' yyyy",
  } as const;

  avatarLetter = 'Marcos'.substring(0, 1);
  treatments: Treatment[] = treatments;
  states: State[] = states;
  isFormFieldsDisabled = true; //se está editando
  isModalVisible = false;

  profileForm = this.formBuilder.group({
    lastAppointment: [
      { value: new Date(''), disabled: true },
      [Validators.required],
    ],
    nextAppointment: [{ value: new Date(''), disabled: true }],
    treatmentType: [
      { value: '', disabled: true },
      [Validators.required, Validators.minLength(3)],
    ],
    treatmentStartedAt: [
      { value: new Date(''), disabled: true },
      [Validators.required],
    ],
    treatmentFinishedAt: [{ value: new Date(''), disabled: true }],
    name: [
      { value: '', disabled: true },
      [Validators.required, Validators.minLength(3)],
    ],
    cpf: [
      { value: '', disabled: true },
      [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11),
        Validators.pattern('^[0-9]*$'),
      ],
    ],
    rg: [
      { value: '', disabled: true },
      [
        Validators.required,
        Validators.minLength(9),
        Validators.pattern('^[0-9]*$'),
      ],
    ],
    birthdate: [{ value: new Date(''), disabled: true }, [Validators.required]],
    age: [
      { value: '', disabled: true },
      [Validators.required, Validators.min(0), Validators.max(150)],
    ],
    phone: [
      { value: '', disabled: true },
      [Validators.required, Validators.pattern('^[0-9]*$')],
    ],
    email: [
      { value: '', disabled: true },
      [Validators.required, Validators.email],
    ],
    address: this.formBuilder.group({
      street: [
        { value: '', disabled: true },
        [Validators.required, Validators.minLength(3)],
      ],
      number: [{ value: '', disabled: true }, [Validators.required]],
      adjunct: [{ value: '', disabled: true }],
      city: [
        { value: '', disabled: true },
        [Validators.required, Validators.minLength(3)],
      ],
      state: [
        { value: '', disabled: true },
        [Validators.required, Validators.minLength(2), Validators.maxLength(2)],
      ],
      cep: [
        { value: '', disabled: true },
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(8),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
    }),
    pharmacy: [{ value: '', disabled: true }],
    observations: [{ value: '', disabled: true }],
  });

  fieldControl = this.profileForm.controls;

  // functions
  onFormSubmit() {
    if (!this.profileForm.valid) {
      console.error('-> please check form validation');
      return;
    }

    // +chamar (fake-)api para enviar valores modo assíncrono
    // +chamar (fake-)api para obter os novos valores do banco de dados
    // console.log(this.profileForm.value);
    this.onDisableFormFields();
  }

  handleEnableFormFields() {
    this.isFormFieldsDisabled = false;
    this.profileForm.enable();
  }

  onDisableFormFields() {
    this.isFormFieldsDisabled = true;
    this.profileForm.disable();
  }

  handleBackToPage() {
    this.router.navigate(['dashboard']);
  }

  handleClickAction() {
    if (!this.isFormFieldsDisabled) {
      this.handleOpenModal();
      return;
    }
    this.handleBackToPage();
  }

  handleOpenModal() {
    this.isModalVisible = true;
  }

  onCloseModal() {
    this.isModalVisible = false;
  }
}
