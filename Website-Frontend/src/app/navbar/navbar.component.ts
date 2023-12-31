import { Component, OnInit } from '@angular/core';
import { ThemeService } from './Theme.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public isActive:boolean =false;
  constructor(public themeService: ThemeService) {
    this.themeService.isDarkMode$.subscribe(isDarkMode => {
      this.isActive = isDarkMode;
    });
   }
  ngOnInit() {

  }

}
