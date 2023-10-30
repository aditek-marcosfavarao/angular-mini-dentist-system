import {
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Profile } from 'src/app/core/@types/profile';
import { AuthService } from 'src/app/core/services/auth.service';

import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { ProfileService } from 'src/app/core/services/profile.service';
import { profileStorage } from 'src/app/data/storage';

type ProfileClass = 'pcenter' | 'pspace';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private authService: AuthService,
    private profileService: ProfileService,
    private localStorageService: LocalStorageService
  ) {
    const isUserLogged = this.authService.getIsUserLoggedIn();

    if (!isUserLogged) {
      this.router.navigate(['notAuthorized']);
      return;
    }

    this.fetchProfiles();
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
          this.isProfileSelected = true;
        },
        error: (error) => console.error(error),
      });
  }

  ngOnDestroy() {
    this.profileSubscription.unsubscribe();
  }

  // component input/output
  @Output()
  newItemEvent = new EventEmitter<Profile>();

  @ViewChild('widgetsContent')
  widgetsContent = {} as ElementRef<HTMLDivElement>;

  readonly dateFormat = "dd'/'MM'/'yyyy' - 'HH':'mm' hrs'" as const;

  profileSubscription = new Subscription();
  profiles: Profile[] = [];
  profile: Profile = {} as Profile;
  isDataEmpty = true;
  isModalVisible = false;
  isProfileSelected = false;
  hasProfileData = !this.isDataEmpty && !this.isProfileSelected;

  avatarLetter = '';
  profileClassListBased: ProfileClass =
    this.profiles.length >= 10 ? 'pspace' : 'pcenter';

  private fetchProfiles() {
    this.profileService.fetchProfiles().subscribe({
      next: (response) => {
        this.profiles = response;
        this.isDataEmpty = !this.profiles.length;
      },
      error: (error) =>
        console.error('Could not retrieve profiles 😢: ', error),
    });
  }

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

    this.localStorageService.setData(profileStorage.id, _profile.id);
  }

  getProfileNameLetter(profile: Profile) {
    return profile.name.substring(0, 1);
  }

  getSimpleName(name: string) {
    const nameArray = name.split(' ');
    return nameArray[0] + ' ' + nameArray[nameArray.length - 1];
  }

  onDeletePatient = () => {
    const profileList = this.profiles;
    const currentProfile = this.profile;
    const newProfileList = profileList.filter(
      (profile) => profile.id !== currentProfile.id
    );

    this.profiles = newProfileList;
    this.profile = {} as Profile;

    this.isModalVisible = false;
    this.isProfileSelected = false;
    this.isDataEmpty = !this.profiles.length;
  };

  goToEditionPage() {
    this.authService.setIsLoggedIn();
    this.router.navigate(['editor']);
  }

  onCloseModal() {
    this.isModalVisible = false;
  }
}
