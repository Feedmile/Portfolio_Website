import { AfterViewInit, Component, ElementRef, Inject, OnInit, PLATFORM_ID, Renderer2, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ThemeService } from '../navbar/Theme.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-parallax',
  templateUrl: './parallax.component.html',
  styleUrls: ['./parallax.component.css']
})
export class ParallaxComponent implements AfterViewInit {
  @ViewChild('characterCanvas', {static: true})  myCanvas!: ElementRef;
  @ViewChild('container') myContainer!: ElementRef;
  private characterImage : any;
  private leftEyeImage: any;
  private rightEyeImage: any;
  private spriteSheet: any;
  private container: any;
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private leftEyePos = { x: 0, y: 0 };
  private rightEyePos = { x: 0, y: 0 };
  private characterLoaded = false;
  private leftEyeLoaded = false;
  private rightEyeLoaded = false;
  private themeSubscription!: Subscription;
  private sprites: Sprite[] = [];
  private mouseX:number = 0;
  private mouseY:number = 0;
  private spriteSheetLoaded = false;
  private animationFrameId: number | null = null;
  public isActive:boolean = false;
  constructor(@Inject(PLATFORM_ID) private platformId: Object,public themeService: ThemeService) {
  }

  ngAfterViewInit() {
    this.sprites = [];
    if (isPlatformBrowser(this.platformId)){
        this.canvas = this.myCanvas.nativeElement;
        this.container = this.myContainer;
        this.ctx = this.canvas.getContext('2d')!;
        this.characterImage = new Image();
        this.leftEyeImage = new Image();
        this.rightEyeImage = new Image();
        this.spriteSheet = new Image();
        if(this.ctx){
         
          this.characterImage.onload = () => {
            this.characterLoaded = true;
            this.checkAllImagesLoaded();
          };
          this.leftEyeImage.onload = () => {
            this.leftEyeLoaded = true;
            this.checkAllImagesLoaded();
          };
          this.rightEyeImage.onload = () => {
            this.rightEyeLoaded = true;
            this.checkAllImagesLoaded();
          };
          this.spriteSheet.onload = () =>{
            this.spriteSheetLoaded = true;
            this.checkAllImagesLoaded();
          }
          this.spriteSheet.src = '../assets/white/spritesheets/Spritesheet.png'
          this.characterImage.src = '../assets/white/character/svgCharacter.png';
          this.leftEyeImage.src = '../assets/white/character/svgEye1.png';
          this.rightEyeImage.src = '../assets/white/character/svgEye2.png';
          this.updateCanvasSize();
         
        }

    }
  }
  onMouseMove(event: MouseEvent): void {
    // const containerRect = this.container.nativeElement.getBoundingClientRect();
    // const mouseX = event.clientX;
    // const containerCenter = containerRect.left + (containerRect.width / 2);
    // const distanceFromCenter = mouseX - containerCenter;
    // const normalizedDistance = distanceFromCenter / containerRect.width;
    // const maxOffset = 20; 
    // const offset = normalizedDistance * maxOffset;
    // this.applyOffsetToElement('.serif-text', -offset);
    // this.applyOffsetToElement('.textured-div', offset);
  }
  
  private applyOffsetToElement(selector: string, offset: number): void {
    const element = this.container.nativeElement.querySelector(selector);
    if (element) {
      element.style.transform = `translateX(${offset}px)`;
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
  private applyFilterToImage(image: HTMLImageElement, filter: string): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.filter = filter;
  }
  
  public updateCanvasImagesForDarkMode(): void {
    this.applyFilterToImage(this.characterImage, 'invert(1)');
    this.applyFilterToImage(this.leftEyeImage, 'invert(1)');
    this.applyFilterToImage(this.rightEyeImage, 'invert(1)');
    this.applyFilterToImage(this.spriteSheet, 'invert(1)');
    this.drawImages();
  }
  
  public updateCanvasImagesForLightMode(): void {
    this.applyFilterToImage(this.characterImage, 'none');
    this.applyFilterToImage(this.leftEyeImage, 'none');
    this.applyFilterToImage(this.rightEyeImage, 'none');
    this.applyFilterToImage(this.spriteSheet, 'none');
    this.drawImages(); 
  }
  private checkAllImagesLoaded(): void {
    if (this.characterLoaded && this.leftEyeLoaded && this.rightEyeLoaded && this.spriteSheetLoaded) {
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
  private updateCanvasSize(): void {
    if (this.myCanvas && this.myCanvas.nativeElement) {
      this.canvas = this.myCanvas.nativeElement;
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.ctx = this.canvas.getContext('2d')!;
    }
  }
  private drawImages(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId); 
    }
  let characterImageWidth = this.characterImage.width/2 *0.6  ;
  let characterImageHeight = this.characterImage.height/2 *0.6 ;
  let characterPosX = (this.canvas.width - characterImageWidth) / 1.2;
  let characterPosY = (this.canvas.height - characterImageHeight) / 2;
  this.ctx.drawImage(this.characterImage, characterPosX, characterPosY, characterImageWidth, characterImageHeight);
  let leftEyeFactorX = 0.001;
  let leftEyeFactorY = 0.001;
  let rightEyeFactorX = 0.002;
  let rightEyeFactorY = 0.002;
  this.leftEyePos.x = characterPosX + characterImageWidth * leftEyeFactorX;
  this.leftEyePos.y = characterPosY + characterImageHeight * leftEyeFactorY;
  this.rightEyePos.x = characterPosX + characterImageWidth * rightEyeFactorX;
  this.rightEyePos.y = characterPosY + characterImageHeight * rightEyeFactorY;
  let eyeImageWidth = characterImageWidth;
  let eyeImageHeight = characterImageHeight;
  this.ctx.drawImage(this.leftEyeImage, this.leftEyePos.x, this.leftEyePos.y, eyeImageWidth, eyeImageHeight);
  this.ctx.drawImage(this.rightEyeImage, this.rightEyePos.x, this.rightEyePos.y, eyeImageWidth, eyeImageHeight);
  this.setupMouseMovement();
  if (this.sprites.length === 0) {
    this.createSprite(characterPosX,characterPosY,characterImageWidth,characterImageHeight)
  }
    requestAnimationFrame(() =>this.updateCanvas(this.rightEyePos.x,this.rightEyePos.y,this.leftEyePos.x,this.leftEyePos.y,eyeImageWidth,eyeImageHeight,characterPosX,characterPosY,characterImageWidth,characterImageHeight));

  }
  private createSprite(characterPosX:number,characterPosY:number,characterImageWidth:number,characterImageHeight:number) {
    let x = (characterPosX + characterImageWidth/2) / 1.05; // Central point X
    let y =  characterPosY + characterImageHeight/2; // Central point Y
    let radius = Math.min(this.canvas.width, this.canvas.height) * 0.3; // Radius of the initial circle
      for(let i = 0; i < 10; i++){
        let angle = (Math.PI * 2 / 10) * i;
        let spriteX = x + Math.cos(angle) * radius;
        let spriteY = y + Math.sin(angle) * radius;
        // Calculate the initial position for each sprite
        
        const sprite = new Sprite(spriteX,spriteY,i,radius,x,y);
        this.sprites.push(sprite);
      }
      
      
    }
  private updateCanvas(rightEyePosX:number,rightEyePosY:number,leftEyePosX:number,leftEyePosY:number,eyeImageWidth:number,eyeImageHeight:number,characterPosX:number,characterPosY:number,characterImageWidth:number,characterImageHeight:number) {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId); // Cancel the previous animation frame
    }
    const maxOffset = 3; 
    let RoffsetX = (this.mouseX - rightEyePosX) / (this.canvas.width / 2) * maxOffset;
    let RoffsetY = (this.mouseY - rightEyePosY) / (this.canvas.height / 2) * maxOffset;
    let LoffsetX = (this.mouseX - leftEyePosX) / (this.canvas.width / 2) * maxOffset;
    let LoffsetY = (this.mouseY - leftEyePosY) / (this.canvas.height / 2) * maxOffset;

    let newRightEyeX = rightEyePosX + RoffsetX;
    let newRightEyeY = rightEyePosY + RoffsetY;
    let newLeftEyeX = leftEyePosX + LoffsetX;
    let newLeftEyeY = leftEyePosY + LoffsetY;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(this.characterImage, characterPosX, characterPosY, characterImageWidth, characterImageHeight);
    this.ctx.drawImage(this.leftEyeImage, newLeftEyeX, newLeftEyeY, eyeImageWidth, eyeImageHeight);
    this.ctx.drawImage(this.rightEyeImage, newRightEyeX, newRightEyeY, eyeImageWidth, eyeImageHeight);
    this.sprites.forEach(sprite => {
      sprite.update();
      sprite.draw(this.ctx, this.spriteSheet, this.canvas);
    });
  
    this.animationFrameId = requestAnimationFrame(() => this.updateCanvas(rightEyePosX,rightEyePosY,leftEyePosX,leftEyePosY,eyeImageWidth,eyeImageHeight,characterPosX,characterPosY,characterImageWidth,characterImageHeight));
  }
  private setupMouseMovement(): void {
    this.canvas.addEventListener('mousemove', (event) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouseX = event.clientX - rect.left;
      this.mouseY = event.clientY - rect.top;
  });
  }
}

class Sprite{
  x: number = 0;
  y: number = 0;
  spriteIndex: number;
  fading: boolean;
  remove:boolean = false;
  angle:number;
  rotationSpeed:number;
  radius:number;
  centerX:number;
  centerY:number;
  readonly fadeRate: number = 0.02;
  readonly moveSpeed: number = 2;
  constructor(spriteX:number, spriteY:number, spriteIndex:number,radius:number,x:number,y:number){
    this.x = spriteX;
    this.y = spriteY;
    this.spriteIndex = spriteIndex;
    this.fading = true;
    this.angle =  Math.atan2(spriteY - y, spriteX - x);;
    this.rotationSpeed = 0.005;
    this.radius = radius
    this.centerX = x;
    this.centerY = y;
  }
  update() {
    this.angle += this.rotationSpeed;
    let targetX = this.centerX + Math.cos(this.angle) * this.radius;
    let targetY = this.centerY + Math.sin(this.angle) * this.radius;
    this.x = targetX;
    this.y = targetY;
}
  draw(context: CanvasRenderingContext2D, spriteSheet: HTMLImageElement, canvas:HTMLCanvasElement) {
    const spriteX = (this.spriteIndex) * 400;
    const spriteY = 0;
    context.drawImage(spriteSheet, spriteX, spriteY, 400, 400, this.x, this.y, canvas.width * 0.06, canvas.height * 0.07);
  }

  
}