/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

type ProfileClass = 'pcenter' | 'pspace';

interface Paciente {
  id: number;
  nome: string;
}
export interface Profile {
  id: string;
  appointment: {
    lastApointment: Date;
    nextApointment: Date;
  };
  treatment: {
    treatmentType: string;
    treatmentStart: Date;
    treatmentEnd: Date;
  };
  user: {
    name: string;
    id: string;
    document: string;
    birthdate: Date;
    age: number;
    phone: string;
    celphone: string;
    email: string;
    address: {
      address: string;
      number: number;
      complement: string;
      city: string;
      uf: string;
      cep: string;
    };
  };
  medicineObservations: string;
  observations: string;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  @Output() newItemEvent = new EventEmitter<Paciente>();

  @ViewChild('widgetsContent', { read: ElementRef })
  public widgetsContent!: ElementRef<any>;

  public scrollRight(): void {
    this.widgetsContent.nativeElement.scrollTo({ left: (this.widgetsContent.nativeElement.scrollLeft + 150), behavior: 'smooth' });
  }

  public scrollLeft(): void {
    this.widgetsContent.nativeElement.scrollTo({ left: (this.widgetsContent.nativeElement.scrollLeft - 150), behavior: 'smooth' });
  }

  profilesList: Paciente[] = [
    { id: 1, nome: 'Ana Berigo' },
    { id: 1, nome: 'Marcos Fanfarrão' },
    { id: 1, nome: 'aabba dasads' },

    { id: 1, nome: 'Ana Berigo' },
    { id: 1, nome: 'Marcos Fanfarrão' },
    { id: 1, nome: 'aabba dasads' },

    { id: 1, nome: 'Ana Berigo' },
    { id: 1, nome: 'Marcos Fanfarrão' },
    { id: 1, nome: 'aabba dasads' },

    { id: 1, nome: 'Ana Berigo' },
    { id: 1, nome: 'Marcos Fanfarrão' },
    { id: 1, nome: 'aabba dasads' },

    { id: 1, nome: 'Ana Berigo' },
    { id: 1, nome: 'Marcos Fanfarrão' },
    { id: 1, nome: 'aabba dasads' },

    { id: 1, nome: 'Ana Berigo' },
    { id: 1, nome: 'Marcos Fanfarrão' },
    { id: 1, nome: 'aabba dasads' },
  ];

  navbarElementsCapacity = 10;
  profile: Paciente = {} as Paciente;
  isModalVisible = false;
  isDataEmpty = !this.profilesList.length;
  isProfileSelected = false;
  hasProfileData = !this.isDataEmpty && !this.isProfileSelected;
  profileClassListBased: ProfileClass =
    this.profilesList.length >= 10 ? 'pspace' : 'pcenter';

  avatarLetter = this.isProfileSelected
    ? this.getProfileNameLetter(this.profile.nome)
    : '';

  handleOpenModal() {
    this.isModalVisible = true;
  }
  handleSelectProfile(_profile: Paciente) {
    this.profile = _profile;
    this.isProfileSelected = true;
  }

  getProfileFirstAndLastName(name: string) {
    const splittedName = name.split(' ');
    return splittedName[0] + ' ' + splittedName[splittedName.length - 1];
  }

  getProfileNameLetter(name: string) {
    return name.substring(0, 1);
  }
  onDeletePatient = () => {
    const profileList = this.profilesList;
    const currentProfile = this.profile;
    const deletedUser = profileList.filter(
      (profile) => profile.id !== currentProfile.id
    );
    this.profilesList = deletedUser;
    this.profile = {} as Paciente;
    this.isModalVisible = false;
  };

  // goToEditionPage() {
  //   console.log('Direcionar pra tela edição');
  //   this.router.navigate(['/editor:' + this.profile.nome]);
  // }
  onCloseModal() {
    this.isModalVisible = false;
  }


  hasProfilesInList = !this.profilesList.length;
  hasManyProfiles = this.profilesList.length > this.navbarElementsCapacity;
}
