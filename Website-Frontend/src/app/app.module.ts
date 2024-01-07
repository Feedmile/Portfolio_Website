import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ParallaxComponent } from './parallax/parallax.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AboutComponent } from './about/about.component';
import { BackgroundComponent } from './background/background.component';
import { ButtonComponent } from './button/button.component';
import { ProjectComponent } from './project/project.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
@NgModule({
  declarations: [					
    AppComponent,
    ParallaxComponent,
    NavbarComponent,
      AboutComponent,
      BackgroundComponent,
      ButtonComponent,
      ProjectComponent,


   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SlickCarouselModule,
    
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  
 }
