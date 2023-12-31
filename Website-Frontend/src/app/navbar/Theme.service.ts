import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  public isDarkMode = new BehaviorSubject<boolean>(false);

  isDarkMode$ = this.isDarkMode.asObservable();


  toggleTheme() {
    // Toggle the current value
    this.isDarkMode.next(!this.isDarkMode.value);
  
    // Check the updated value to apply the correct class
    if (this.isDarkMode.value) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }
  public currentTheme(): boolean {
    return this.isDarkMode.value;
  }
}