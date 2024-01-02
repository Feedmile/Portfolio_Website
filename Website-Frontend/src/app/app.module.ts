import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ParallaxComponent } from './parallax/parallax.component';

import { NavbarComponent } from './navbar/navbar.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [			
    AppComponent,
    ParallaxComponent,
    NavbarComponent,
      AboutComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
