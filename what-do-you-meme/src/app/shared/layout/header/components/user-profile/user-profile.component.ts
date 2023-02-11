import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../../services/auth.service';
import { logout, logoutSuccess } from 'src/app/auth/store/auth.actions';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit, OnDestroy {
  subs: Subscription = new Subscription();
  public readonly DEFAULT_USERNAME = 'RAK';
  public readonly DEFAULT_AVATAR = 'assets/images/avatars/baby-yoda.webp';
  userName: string | undefined = this.DEFAULT_USERNAME;
  path: string = this.DEFAULT_AVATAR;

  constructor(
    private httpService: AuthService,
    private store$: Store,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit() {
    this.subs.add(
      this.httpService.user$.subscribe(
        (data) => (
          (this.userName = data?.username ?? this.DEFAULT_USERNAME),
          (this.path = data?.image ?? this.DEFAULT_AVATAR)
        )
      )
    );
  }

  signOut() {
    localStorage.clear();
    this.router.navigate(['auth'], { replaceUrl: true });
    this.store$.dispatch(logoutSuccess());
  }

  get isNotDefaultUsername() {
    return this.DEFAULT_USERNAME !== this.userName;
  }
}
