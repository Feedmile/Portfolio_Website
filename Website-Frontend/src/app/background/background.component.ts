import { Component, ElementRef, HostListener, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { ThemeService } from '../navbar/Theme.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.css']
})
export class BackgroundComponent implements OnInit {
  @ViewChild('bgCanvas', {static: true})  myCanvas!: ElementRef;


  private canvas!: HTMLCanvasElement;
  private canvas2!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private ctx2!: CanvasRenderingContext2D;
  private scaleFactor!:number;
  public isActive:boolean = false;
  private rotation:number = 0;


  constructor(@Inject(PLATFORM_ID) private platformId: Object,public themeService: ThemeService) { 
  }
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)){
      this.canvas = this.myCanvas.nativeElement;
      this.canvas2 = this.myCanvas.nativeElement;
      this.ctx = this.canvas.getContext('2d')!;
      this.ctx2 = this.canvas2.getContext('2d')!;
      if(this.ctx && this.ctx2){
        window.addEventListener('scroll', this.onScroll.bind(this));
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight ;
        window.innerHeight
        const idealWidth = 1920;
        const idealHeight = 1080;
        this.scaleFactor = Math.min((this.canvas.width / idealWidth) * 35, (this.canvas.height / idealHeight) * 35);

        this.themeService.isDarkMode$.subscribe(isDarkMode => {
          this.isActive = isDarkMode;
          this.drawShape(this.ctx,this.scaleFactor,this.rotation);
          this.drawShape2(this.ctx,this.scaleFactor,this.rotation);
          this.drawShape3(this.ctx,this.scaleFactor,this.rotation);
          this.drawShape4(this.ctx,this.scaleFactor,this.rotation);

        });
          
      }  

    }
  }
  private drawShape(ctx: CanvasRenderingContext2D, scaleFactor:number,rotation:number) {
    ctx.save();
    // Clear the canvas
    let startX = ctx.canvas.width * 0.3;
    let startY = ctx.canvas.height * 0.4;
    ctx.translate(startX * rotation*1.5, startY);
    ctx.rotate(rotation);
    ctx.beginPath();
    ctx.moveTo(19.7 * scaleFactor, -23.3 * scaleFactor);
    ctx.bezierCurveTo(2 * scaleFactor, -18.3 * scaleFactor, 0.5 * scaleFactor, -9.2 * scaleFactor, 0.8 * scaleFactor, -1.8 * scaleFactor);
    ctx.bezierCurveTo(2 * scaleFactor, 5.6 * scaleFactor, 13.9 * scaleFactor, 11.2 * scaleFactor, 12.6 * scaleFactor, 17.5 * scaleFactor);
    ctx.bezierCurveTo(11.2 * scaleFactor, 23.7 * scaleFactor, 5.6 * scaleFactor, 30.6 * scaleFactor, 0.2 * scaleFactor, 30.3 * scaleFactor);
    ctx.bezierCurveTo(-5.1 * scaleFactor, 30.1 * scaleFactor, -10.3 * scaleFactor, 22.7 * scaleFactor, -15.5 * scaleFactor, 16.5 * scaleFactor);
    ctx.bezierCurveTo(-20.8 * scaleFactor, 10.3 * scaleFactor, -26.2 * scaleFactor, 5.1 * scaleFactor, -29.1 * scaleFactor, -2.9 * scaleFactor);
    ctx.bezierCurveTo(-32.1 * scaleFactor, -11 * scaleFactor, -32.6 * scaleFactor, -22 * scaleFactor, -27.3 * scaleFactor, -27.1 * scaleFactor);
    ctx.bezierCurveTo(-22 * scaleFactor, -32.1 * scaleFactor, -11 * scaleFactor, -31.1 * scaleFactor, -0.9 * scaleFactor, -30.2 * scaleFactor);
    ctx.bezierCurveTo(9.2 * scaleFactor, -29.3 * scaleFactor, 18.3 * scaleFactor, -28.4 * scaleFactor, 19.7 * scaleFactor, -23.3 * scaleFactor);
    ctx.closePath();
    ctx.fillStyle = this.isActive ?  'rgb(170, 170, 170)' : '#4d4d4d' ;
    ctx.fill();
    ctx.restore();
  }
  private drawShape2(ctx: CanvasRenderingContext2D, scaleFactor:number,rotation:number) {
    ctx.save();
    let startX = ctx.canvas.width * 0.3;
    let startY = ctx.canvas.height * 0.4;
    ctx.translate(-(startX * rotation*2) + this.canvas.width*1.1, -(startY * rotation*2));
    ctx.rotate(rotation);
    ctx.beginPath();
    ctx.moveTo(6.2 * scaleFactor, -15.4 * scaleFactor);

    // Translating the SVG path to Canvas drawing commands, scaling each coordinate
    ctx.bezierCurveTo(6.6 * scaleFactor, -10.4 * scaleFactor, 4.8 * scaleFactor, -6 * scaleFactor, 10.8 * scaleFactor, -3.6 * scaleFactor);
    ctx.bezierCurveTo(16.9 * scaleFactor, -1.1 * scaleFactor, 30.8 * scaleFactor, -0.6 * scaleFactor, 33.8 * scaleFactor, 1.7 * scaleFactor);
    ctx.bezierCurveTo(36.7 * scaleFactor, 4 * scaleFactor, 28.7 * scaleFactor, 8 * scaleFactor, 23.5 * scaleFactor, 11.9 * scaleFactor);
    ctx.bezierCurveTo(18.4 * scaleFactor, 15.9 * scaleFactor, 16.1 * scaleFactor, 19.9 * scaleFactor, 12.7 * scaleFactor, 22.1 * scaleFactor);
    ctx.bezierCurveTo(9.2 * scaleFactor, 24.2 * scaleFactor, 4.6 * scaleFactor, 24.5 * scaleFactor, 0.1 * scaleFactor, 24.2 * scaleFactor);
    ctx.bezierCurveTo(-4.3 * scaleFactor, 24 * scaleFactor, -8.7 * scaleFactor, 23.3 * scaleFactor, -8.9 * scaleFactor, 19.3 * scaleFactor);
    ctx.bezierCurveTo(-9.1 * scaleFactor, 15.3 * scaleFactor, -5.2 * scaleFactor, 8 * scaleFactor, -10.9 * scaleFactor, 4.3 * scaleFactor);
    ctx.bezierCurveTo(-16.6 * scaleFactor, 0.5 * scaleFactor, -31.9 * scaleFactor, 0.3 * scaleFactor, -35.2 * scaleFactor, -2 * scaleFactor);
    ctx.bezierCurveTo(-38.6 * scaleFactor, -4.2 * scaleFactor, -30.1 * scaleFactor, -8.3 * scaleFactor, -26.3 * scaleFactor, -15.2 * scaleFactor);
    ctx.bezierCurveTo(-22.4 * scaleFactor, -22.2 * scaleFactor, -23.2 * scaleFactor, -31.8 * scaleFactor, -19.6 * scaleFactor, -35 * scaleFactor);
    ctx.bezierCurveTo(-16 * scaleFactor, -38.2 * scaleFactor, -8 * scaleFactor, -35 * scaleFactor, -2.6 * scaleFactor, -30.5 * scaleFactor);
    ctx.bezierCurveTo(2.8 * scaleFactor, -26.1 * scaleFactor, 5.7 * scaleFactor, -20.4 * scaleFactor, 6.2 * scaleFactor, -15.4 * scaleFactor);

 
    ctx.closePath();
    ctx.fillStyle = this.isActive ?  'rgb(170, 170, 170)' : '#4d4d4d' ;
    ctx.fill();
    ctx.restore();
  }
  private drawShape3(ctx: CanvasRenderingContext2D, scaleFactor:number,rotation:number) {
    ctx.save();
    let startX = ctx.canvas.width * 0.3;
    let startY = ctx.canvas.height * 0.4;
    ctx.translate((startX * rotation) - this.canvas.width*1.2, -(startY * rotation*3) + this.canvas.height*4);
    ctx.rotate(rotation);
    ctx.beginPath();
    ctx.moveTo(6.2 * scaleFactor, -15.4 * scaleFactor);

    // Translating the SVG path to Canvas drawing commands, scaling each coordinate
    ctx.bezierCurveTo(6.6 * scaleFactor, -10.4 * scaleFactor, 4.8 * scaleFactor, -6 * scaleFactor, 10.8 * scaleFactor, -3.6 * scaleFactor);
    ctx.bezierCurveTo(16.9 * scaleFactor, -1.1 * scaleFactor, 30.8 * scaleFactor, -0.6 * scaleFactor, 33.8 * scaleFactor, 1.7 * scaleFactor);
    ctx.bezierCurveTo(36.7 * scaleFactor, 4 * scaleFactor, 28.7 * scaleFactor, 8 * scaleFactor, 23.5 * scaleFactor, 11.9 * scaleFactor);
    ctx.bezierCurveTo(18.4 * scaleFactor, 15.9 * scaleFactor, 16.1 * scaleFactor, 19.9 * scaleFactor, 12.7 * scaleFactor, 22.1 * scaleFactor);
    ctx.bezierCurveTo(9.2 * scaleFactor, 24.2 * scaleFactor, 4.6 * scaleFactor, 24.5 * scaleFactor, 0.1 * scaleFactor, 24.2 * scaleFactor);
    ctx.bezierCurveTo(-4.3 * scaleFactor, 24 * scaleFactor, -8.7 * scaleFactor, 23.3 * scaleFactor, -8.9 * scaleFactor, 19.3 * scaleFactor);
    ctx.bezierCurveTo(-9.1 * scaleFactor, 15.3 * scaleFactor, -5.2 * scaleFactor, 8 * scaleFactor, -10.9 * scaleFactor, 4.3 * scaleFactor);
    ctx.bezierCurveTo(-16.6 * scaleFactor, 0.5 * scaleFactor, -31.9 * scaleFactor, 0.3 * scaleFactor, -35.2 * scaleFactor, -2 * scaleFactor);
    ctx.bezierCurveTo(-38.6 * scaleFactor, -4.2 * scaleFactor, -30.1 * scaleFactor, -8.3 * scaleFactor, -26.3 * scaleFactor, -15.2 * scaleFactor);
    ctx.bezierCurveTo(-22.4 * scaleFactor, -22.2 * scaleFactor, -23.2 * scaleFactor, -31.8 * scaleFactor, -19.6 * scaleFactor, -35 * scaleFactor);
    ctx.bezierCurveTo(-16 * scaleFactor, -38.2 * scaleFactor, -8 * scaleFactor, -35 * scaleFactor, -2.6 * scaleFactor, -30.5 * scaleFactor);
    ctx.bezierCurveTo(2.8 * scaleFactor, -26.1 * scaleFactor, 5.7 * scaleFactor, -20.4 * scaleFactor, 6.2 * scaleFactor, -15.4 * scaleFactor);

 
    ctx.closePath();
    ctx.fillStyle = this.isActive ?  'rgb(170, 170, 170)' : '#4d4d4d' ;
    ctx.fill();
    ctx.restore();
  }
  private drawShape4(ctx: CanvasRenderingContext2D, scaleFactor:number,rotation:number) {
    ctx.save();
    let startX = ctx.canvas.width * 0.3;
    let startY = ctx.canvas.height * 0.4;
    ctx.translate(-(startX * rotation/2)  + this.canvas.width*2, -(startY * rotation*2) + this.canvas.height*5 );
    ctx.rotate(rotation);
    ctx.beginPath();
    ctx.moveTo(6.2 * scaleFactor, -15.4 * scaleFactor);

    // Drawing the shape using bezierCurveTo method
    ctx.bezierCurveTo(6.6 * scaleFactor, -10.4 * scaleFactor, 4.8 * scaleFactor, -6 * scaleFactor, 10.8 * scaleFactor, -3.6 * scaleFactor);
    ctx.bezierCurveTo(16.9 * scaleFactor, -1.1 * scaleFactor, 30.8 * scaleFactor, -0.6 * scaleFactor, 33.8 * scaleFactor, 1.7 * scaleFactor);
    ctx.bezierCurveTo(36.7 * scaleFactor, 4 * scaleFactor, 28.7 * scaleFactor, 8 * scaleFactor, 23.5 * scaleFactor, 11.9 * scaleFactor);
    ctx.bezierCurveTo(18.4 * scaleFactor, 15.9 * scaleFactor, 16.1 * scaleFactor, 19.9 * scaleFactor, 12.7 * scaleFactor, 22.1 * scaleFactor);
    ctx.bezierCurveTo(9.2 * scaleFactor, 24.2 * scaleFactor, 4.6 * scaleFactor, 24.5 * scaleFactor, 0.1 * scaleFactor, 24.2 * scaleFactor);
    ctx.bezierCurveTo(-4.3 * scaleFactor, 24 * scaleFactor, -8.7 * scaleFactor, 23.3 * scaleFactor, -8.9 * scaleFactor, 19.3 * scaleFactor);
    ctx.bezierCurveTo(-9.1 * scaleFactor, 15.3 * scaleFactor, -5.2 * scaleFactor, 8 * scaleFactor, -10.9 * scaleFactor, 4.3 * scaleFactor);
    ctx.bezierCurveTo(-16.6 * scaleFactor, 0.5 * scaleFactor, -31.9 * scaleFactor, 0.3 * scaleFactor, -35.2 * scaleFactor, -2 * scaleFactor);
    ctx.bezierCurveTo(-38.6 * scaleFactor, -4.2 * scaleFactor, -30.1 * scaleFactor, -8.3 * scaleFactor, -26.3 * scaleFactor, -15.2 * scaleFactor);
    ctx.bezierCurveTo(-22.4 * scaleFactor, -22.2 * scaleFactor, -23.2 * scaleFactor, -31.8 * scaleFactor, -19.6 * scaleFactor, -35 * scaleFactor);
    ctx.bezierCurveTo(-16 * scaleFactor, -38.2 * scaleFactor, -8 * scaleFactor, -35 * scaleFactor, -2.6 * scaleFactor, -30.5 * scaleFactor);
    ctx.bezierCurveTo(2.8 * scaleFactor, -26.1 * scaleFactor, 5.7 * scaleFactor, -20.4 * scaleFactor, 6.2 * scaleFactor, -15.4 * scaleFactor);

    ctx.closePath();
    ctx.fillStyle = this.isActive ?  'rgb(170, 170, 170)' : '#4d4d4d' ;
    ctx.fill();
    ctx.restore();
  }
  private onScroll() {
    let scrollY = window.scrollY;
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    // Calculate rotation based on the scroll position
    // Example: Rotate 180 degrees (π radians) over 1000 pixels of scrolling
    this.rotation = (scrollY / 1000) * Math.PI;
  
    this.drawShape(this.ctx, this.scaleFactor, this.rotation);
    this.drawShape2(this.ctx2,this.scaleFactor,this.rotation);
    this.drawShape3(this.ctx2,this.scaleFactor,this.rotation);
    this.drawShape4(this.ctx2,this.scaleFactor,this.rotation);
  }
 
}
