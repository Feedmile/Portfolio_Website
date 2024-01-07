import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../navbar/Theme.service';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  constructor(public themeService: ThemeService) { }
  private scrollPoints = [0,0.7, 1.5, 2.1]; // Example: 1x, 2x, 3x, 4x window height
  private currentIndex = 0;
  public isActive:boolean = false;
  ngOnInit() {
    this.themeService.isDarkMode$.subscribe(isDarkMode => {
      this.isActive = isDarkMode;
    })  
  }
  get isTop(): boolean {
    return this.currentIndex === 0;
  }
  scrollToNextPoint(): void {
    // Calculate the actual scrollY position based on window height
    this.currentIndex = (this.currentIndex + 1) % this.scrollPoints.length;

    const idealWidth = 1920;
    const idealHeight = 1080;
    const targetScrollY = Math.min((window.innerWidth )* this.scrollPoints[this.currentIndex], (idealHeight) * this.scrollPoints[this.currentIndex]);
    window.scrollTo({
        top: targetScrollY,
        behavior: 'smooth'
    });

    // Move to the next index or loop back to the start
}
scrollToPastPoint(): void {
  // Calculate the actual scrollY position based on window height
  this.currentIndex = (this.currentIndex - 1) % this.scrollPoints.length;
  const idealWidth = 1920;
  const idealHeight = 1080;
  const targetScrollY = Math.min((window.innerWidth )* this.scrollPoints[this.currentIndex], (idealHeight) * this.scrollPoints[this.currentIndex]);
  window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth'
  });

  // Move to the next index or loop back to the start
}
}
