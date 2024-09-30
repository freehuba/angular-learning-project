import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '@shared/shared.module';
import { AppComponent } from '@app/app.component';
import { CourseInfoComponent } from '@features/course-info/course-info.component';
import { NotAuthorizedGuard } from '@app/auth/guards/not-authorized.guard';
import { AuthorizedGuard } from '@app/auth/guards/authorized.guard';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { CoursesService } from '@app/services/courses.service';
import { HttpClientModule } from '@angular/common/http';
import { AppRoute } from './app-routing.module';
import { WINDOW, windowProvider } from './auth/services/window.provider';
import { AuthService } from './auth/services/auth.service';
import { StoreModule } from '@ngrx/store';
import { effects, reducers } from './store/courses';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [AppComponent, CourseInfoComponent],
  imports: [
    BrowserModule,
    SharedModule,
    FontAwesomeModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),
    AppRoute
  ],
  providers: [AuthorizedGuard, NotAuthorizedGuard, CoursesService, CoursesStoreService,AuthService,
    { provide: WINDOW, useFactory: windowProvider }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
