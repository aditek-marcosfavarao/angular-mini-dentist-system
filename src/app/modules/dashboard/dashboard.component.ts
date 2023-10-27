import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Paciente } from 'src/app/core/@types/paciente';
import { Profile } from 'src/app/core/@types/profile';
import { DataServiceService } from 'src/app/core/services/data-service.service';

type ProfileClass = 'pcenter' | 'pspace';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  @Output() newItemEvent = new EventEmitter<Paciente>();

  @ViewChild('widgetsContent')
  widgetsContent = {} as ElementRef<HTMLDivElement>;

  profilesList: Profile[] = [
    {
      id: '00',
      lastProfileEdition: new Date(),
      lastAppointment: new Date('01/12/1899 00:00'),
      nextAppointment: new Date(),
      treatmentType: 'Completo',
      treatmentStartedAt: new Date(),
      treatmentFinishedAt: new Date(),
      name: 'Marcos Adriano Lorencini Favarão',
      rg: '17.394.588-0',
      cpf: '555.555.555-87',
      birthdate: new Date('12/01/1997'),
      age: '26',
      phone: '(16) 98335-9812',
      email: 'marcos.favarao@aditek.com.br',
      address: {
        street: 'Rua Ernesto Benfodini de Morães',
        number: '512',
        adjunct: '',
        city: 'Ribeirão Preto',
        state: 'SP',
        cep: '14210000',
      },
      pharmacy: '',
      observations: '',
    },
    {
      id: '01',
      lastProfileEdition: new Date(),
      lastAppointment: new Date('10/11/1909 00:00'),
      nextAppointment: new Date(),
      treatmentType: 'Print 3D',
      treatmentStartedAt: new Date(),
      treatmentFinishedAt: new Date(),
      name: 'Ana Paula Berigo e Silva',
      rg: '12.345.255-0',
      cpf: '444.444.444-78',
      birthdate: new Date('29/01/1999'),
      age: '24',
      phone: '(16) 98632-7456',
      email: 'ana.berigo@aditek.com.br',
      address: {
        street: 'Av. Manoel Pedrosa Filho',
        number: '245',
        adjunct: '',
        city: 'Luiz Antônio',
        state: 'SP',
        cep: '14210000',
      },
      pharmacy: '',
      observations: '',
    },
    {
      id: '02',
      lastProfileEdition: new Date(),
      lastAppointment: new Date('10/11/1909 00:00'),
      nextAppointment: new Date(),
      treatmentType: 'Print 3D',
      treatmentStartedAt: new Date(),
      treatmentFinishedAt: new Date(),
      name: 'Ermindo Lopes',
      rg: '12.011.115-9',
      cpf: '815.969.580-22',
      birthdate: new Date('16/09/1998'),
      age: '30',
      phone: '(16) 98632-7456',
      email: 'ermindo.lopes@aditek.com.br',
      address: {
        street: 'Rua Aristides França',
        number: '292',
        adjunct: '',
        city: 'Cravinhos',
        state: 'SP',
        cep: '83035170',
      },
      pharmacy: '',
      observations: '',
    },
    {
      id: '03',
      lastProfileEdition: new Date(),
      lastAppointment: new Date('10/11/1909 00:00'),
      nextAppointment: new Date(),
      treatmentType: 'Completo',
      treatmentStartedAt: new Date(),
      treatmentFinishedAt: new Date(),
      name: 'Antônio Tom',
      rg: '21.018.415-1',
      cpf: '542.725.421-27',
      birthdate: new Date('24/05/1968'),
      age: '30',
      phone: '(16) 95138-5138',
      email: 'antonio.tom@aditek.com.br',
      address: {
        street: 'Av. Presidente Prudente',
        number: '145',
        adjunct: '',
        city: 'Cravinhos',
        state: 'SP',
        cep: '73085141',
      },
      pharmacy: '',
      observations: '',
    },
  ];

  profile: Profile = {} as Profile;
  isModalVisible = false;
  isDataEmpty = !this.profilesList.length;
  isProfileSelected = false;
  hasProfileData = !this.isDataEmpty && !this.isProfileSelected;
  dateFormatted = "dd'/'MM'/'yyyy' - 'HH':'mm' hrs'";
  avatarLetter = '';
  profileClassListBased: ProfileClass =
    this.profilesList.length >= 10 ? 'pspace' : 'pcenter';

  constructor(
    private dataService: DataServiceService,
    private router: Router
  ) {}

  public scrollRight(): void {
    this.widgetsContent.nativeElement.scrollTo({
      left: this.widgetsContent.nativeElement.scrollLeft + 150,
      behavior: 'smooth',
    });
  }

  public scrollLeft(): void {
    this.widgetsContent.nativeElement.scrollTo({
      left: this.widgetsContent.nativeElement.scrollLeft - 150,
      behavior: 'smooth',
    });
  }

  handleOpenModal() {
    this.isModalVisible = true;
  }

  handleSelectProfile(_profile: Profile) {
    this.profile = _profile;
    this.isProfileSelected = true;
  }

  getProfileNameLetter(profile: Profile) {
    return profile.name.substring(0, 1);
  }

  getSimpleName(name: string) {
    const nameArray = name.split(' ');
    return nameArray[0] + ' ' + nameArray[nameArray.length - 1];
  }

  onDeletePatient = () => {
    const profileList = this.profilesList;
    const currentProfile = this.profile;
    const deletedUser = profileList.filter(
      (profile) => profile.id != currentProfile.id
    );
    this.profilesList = deletedUser;
    this.profile = {} as Profile;
    this.isModalVisible = false;
    this.isProfileSelected = false;
    this.isDataEmpty = !this.profilesList.length;
  };

  goToEditionPage(profile: Profile) {
    this.dataService.setPaciente(profile);
    this.router.navigate(['editor']);
  }

  onCloseModal() {
    this.isModalVisible = false;
  }
}
