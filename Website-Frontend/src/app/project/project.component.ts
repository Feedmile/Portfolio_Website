import { AfterViewInit, Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ThemeService } from '../navbar/Theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements AfterViewInit {
  @ViewChild('spriteCanvas', {static: true})  myCanvas!: ElementRef;

  slides = [
    { title: 'First Project', text: 'This is the first card, for the first project' },
    { title: 'Second Project', text: 'This is the second card, for the second project' },
    { title: 'Third Project', text: 'This is the first card, for the third project' },
    { title: 'Fourth Project', text: 'This is the second card, for the fourth project' },
    { title: 'Fifth Project', text: 'This is the first card, for the fifth project' },
    { title: 'Sixth Project', text: 'This is the second card, for the sixth project' },
    { title: 'Seventh Project', text: 'This is the first card, for the seventh project' },
    { title: 'Eighth Project', text: 'This is the second card, for the eighth project' },
    { title: 'Ninth Project', text: 'This is the first card, for the ninth project' },
    { title: 'Tenth Project', text: 'This is the second card, for the tenth project' },
    // ... other slides
  ];
  isActive = false;
  slideConfig = {"slidesToShow": 2, "slidesToScroll": 1};
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private spriteImage: any;
  private frameIndex: number = 6;
  private totalFrames: number = 6;
  private spriteWidth: number = 1621;
  private spriteHeight: number = 1367;
  private lastFrameTime: number = 0;
  private frameDuration: number = 1000 / 10;
  private themeSubscription!: Subscription;
  private spriteLoaded:boolean = false;
  private animationFrameId: number | null = null;
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private themeService: ThemeService) { }

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
        this.spriteImage.src = '../assets/white/spritesheets/deskSheet.png';

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
  this.applyFilterToImage(this.spriteImage, 'invert(1)');
  this.animate();
}
public updateCanvasImagesForLightMode(): void {
  this.applyFilterToImage(this.spriteImage, 'none');
  this.animate();
}
animate(timestamp: number = 0) {
  if (this.animationFrameId) {
    console.log("===")
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
      this.spriteWidth/5, this.spriteHeight/5
    );

    this.frameIndex = (this.frameIndex + 1) % this.totalFrames;
    this.lastFrameTime = timestamp;
  }

  requestAnimationFrame((newTimestamp) => this.animate(newTimestamp));
}
}
