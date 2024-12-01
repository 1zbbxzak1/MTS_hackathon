import {NgModule} from '@angular/core';
import {BrowserModule, provideClientHydration, withEventReplay} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeModule} from './children/home/home.module';
import {ProfileModule} from './children/profile/profile.module';
import {ServicesService} from './data/services/services.service';
import {ServicesManagerService} from './data/services/services.manager.service';
import {HttpClientModule, provideHttpClient} from '@angular/common/http';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,

        HomeModule,
        ProfileModule,
    ],
    providers: [
        provideClientHydration(withEventReplay()),
        provideHttpClient(),
        ServicesService,
        ServicesManagerService,
    ],
    exports: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
