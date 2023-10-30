import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { State } from 'src/app/core/@types/state';
import { Treatment } from 'src/app/core/@types/treatment';
import { Profile } from 'src/app/core/@types/profile';

import { ProfileService } from 'src/app/core/services/profile.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

import { states } from 'src/app/data/state';
import { treatments } from 'src/app/data/treatment';
import { profileStorage } from 'src/app/data/storage';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})
export class EditorComponent implements OnInit, OnDestroy {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private profileService: ProfileService,
    private localStorageService: LocalStorageService,
    private authService: AuthService
  ) {
    const isUserLogged = this.authService.getIsUserLoggedIn();

    if (!isUserLogged) {
      this.router.navigate(['notAuthorized']);
      return;
    }
  }

  ngOnInit() {
    const storedProfileId =
      this.localStorageService.getData(profileStorage.id) ?? '';

    if (!storedProfileId.length) return;

    this.profileSubscription = this.profileService
      .fetchProfile(storedProfileId)
      .subscribe({
        next: (response) => {
          this.profile = response;
          this.fillFormFields(response);
        },
        error: (error) => console.error(error),
      });
  }

  ngOnDestroy() {
    this.profileSubscription.unsubscribe();
  }

  readonly dateFormat = {
    simple: "dd'/'MM'/'yyyy",
    complete: "dd 'de' MMMM 'de' yyyy",
  } as const;

  profileSubscription = new Subscription();

  profile: Profile = {} as Profile;
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
  private fillFormFields(profile: Profile) {
    this.profileForm.patchValue({
      lastAppointment: profile.lastAppointment,
      nextAppointment: profile.nextAppointment,
      treatmentType: profile.treatmentType,
      treatmentStartedAt: profile.treatmentStartedAt,
      treatmentFinishedAt: profile.treatmentFinishedAt,
      name: profile.name,
      cpf: profile.cpf,
      rg: profile.rg,
      birthdate: profile.birthdate,
      age: profile.age,
      phone: profile.phone,
      email: profile.email,
      pharmacy: profile.pharmacy,
      observations: profile.observations,
      address: {
        street: profile.address.street,
        number: profile.address.number,
        adjunct: profile.address.adjunct,
        city: profile.address.city,
        state: profile.address.state,
        cep: profile.address.cep,
      },
    });
  }

  onFormSubmit() {
    if (!this.profileForm.valid) {
      console.error('-> please check form validation');
      return;
    }

    console.log(this.profileForm.value);
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
