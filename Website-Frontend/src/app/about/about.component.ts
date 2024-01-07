import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { ThemeService } from '../navbar/Theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements AfterViewInit {
  @ViewChild('spriteCanvas', {static: true})  myCanvas!: ElementRef;

  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private spriteImage: any;
  private frameIndex: number = 9;
  private totalFrames: number = 9; // Total number of sprites
  private spriteWidth: number = 269;
  private spriteHeight: number = 325;
  private spriteLoaded:boolean = false;
  public isActive:boolean = false;
  private lastFrameTime: number = 0;
  private frameDuration: number = 1000 / 10;
  private themeSubscription!: Subscription;
  private animationFrameId: number | null = null;
  constructor(@Inject(PLATFORM_ID) private platformId: Object,public themeService: ThemeService) { 
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)){
      this.canvas = this.myCanvas.nativeElement;
      this.ctx = this.canvas.getContext('2d')!;
      this.spriteImage = new Image();
      if(this.ctx){
        this.spriteImage.onload = () => {
          this.spriteLoaded = true;
          this.checkAllImagesLoaded();
          this.animate();
        };
        this.spriteImage.src = '../assets/white/spritesheets/charSheet.png'; // Path to your spritesheet

      }

    }
  }
  ngOnDestroy() {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
  private checkAllImagesLoaded(): void {
    if (this.spriteLoaded) {
      this.themeService.isDarkMode$.subscribe(isDarkMode => {
        this.isActive = isDarkMode;
        if (isDarkMode) {
          this.updateCanvasImagesForDarkMode();
        } else {
          this.updateCanvasImagesForLightMode();
        }
      });
    }
  }
  private applyFilterToImage(image: HTMLImageElement, filter: string): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.filter = filter;
  }
  public updateCanvasImagesForDarkMode(): void {
    this.applyFilterToImage(this.spriteImage, 'invert(.8)');
    this.animate();
  }
  public updateCanvasImagesForLightMode(): void {
    this.applyFilterToImage(this.spriteImage, 'none');
    this.animate();
  }
  animate(timestamp: number = 0) {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId); 
    }
    const timeSinceLastFrame = timestamp - this.lastFrameTime;
  
    if (timeSinceLastFrame >= this.frameDuration) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(
        this.spriteImage,
        this.frameIndex * this.spriteWidth, 0,
        this.spriteWidth, this.spriteHeight,
        0, 0,
        this.spriteWidth/4, this.spriteHeight/4
      );
  
      this.frameIndex = (this.frameIndex + 1) % this.totalFrames;
      this.lastFrameTime = timestamp;
    }
  
    requestAnimationFrame((newTimestamp) => this.animate(newTimestamp));
  }
}
