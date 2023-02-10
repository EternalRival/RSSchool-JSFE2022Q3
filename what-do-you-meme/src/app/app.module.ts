import { ConfigService } from './shared/storage/services/config/config.service';
import { AuthData } from './auth/store/auth.reducer';
import { NgModule, isDevMode, Inject, inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { AuthStoreModule } from './auth/store/auth-store.module';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from './shared/shared.module';
import { SocketIoModule } from 'ngx-socket-io';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { WINDOW } from './shared/storage/tokens/window.token';
import { STORAGE_KEY_PREFIX } from './shared/storage/tokens/storage-key.token';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({}, {}),
    SocketIoModule.forRoot(ConfigService.socketConfig),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    StoreRouterConnectingModule.forRoot(),
    AuthStoreModule,
    SharedModule,
    EffectsModule.forRoot([]),
    BrowserAnimationsModule,
    InfiniteScrollModule,
  ],
  providers: [ {
    provide: WINDOW,
    useFactory: () => window,
  },
  {
    provide: STORAGE_KEY_PREFIX,
    useValue: 'WDYM',
  },],
  exports: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
