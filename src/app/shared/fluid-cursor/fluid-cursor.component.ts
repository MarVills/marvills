import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';

interface ColorRGB {
  r: number;
  g: number;
  b: number;
}

interface Pointer {
  texcoordX: number;
  texcoordY: number;
  prevTexcoordX: number;
  prevTexcoordY: number;
  deltaX: number;
  deltaY: number;
  moved: boolean;
  color: ColorRGB;
}

@Component({
  selector: 'app-fluid-cursor',
  standalone: true,
  template: `<canvas
    #canvas
    style="position:fixed; top:0; left:0; width:100%; height:100%; pointer-events:none;"
  ></canvas>`,
})
export class FluidCursorComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private pointer: Pointer = this.createPointer();
  private lastTime = Date.now();

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.canvas = this.canvasRef.nativeElement;
    this.ctx = this.canvas.getContext('2d')!;
    if (!this.ctx) {
      console.error('2D Canvas not supported');
      return;
    }

    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
    this.animate();
  }

  private createPointer(): Pointer {
    return {
      texcoordX: 0,
      texcoordY: 0,
      prevTexcoordX: 0,
      prevTexcoordY: 0,
      deltaX: 0,
      deltaY: 0,
      moved: false,
      color: { r: 0, g: 0.7, b: 1 }, // blue-ish
    };
  }

  private resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const rect = this.canvas.getBoundingClientRect();
    this.pointer.prevTexcoordX = this.pointer.texcoordX;
    this.pointer.prevTexcoordY = this.pointer.texcoordY;

    this.pointer.texcoordX = (event.clientX - rect.left) / this.canvas.width;
    this.pointer.texcoordY =
      1 - (event.clientY - rect.top) / this.canvas.height;

    this.pointer.deltaX = this.pointer.texcoordX - this.pointer.prevTexcoordX;
    this.pointer.deltaY = this.pointer.texcoordY - this.pointer.prevTexcoordY;
    this.pointer.moved = true;
  }

  private animate() {
    const dt = (Date.now() - this.lastTime) / 1000;
    this.lastTime = Date.now();

    // fade the canvas slowly
    this.ctx.fillStyle = 'rgba(0,0,0,0.1)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    if (this.pointer.moved) {
      this.drawSplat(this.pointer);
      this.pointer.moved = false;
    }

    requestAnimationFrame(() => this.animate());
  }

  private drawSplat(pointer: Pointer) {
    const x = pointer.texcoordX * this.canvas.width;
    const y = (1 - pointer.texcoordY) * this.canvas.height;

    const radius = 50; // size of fluid splash
    const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(
      0,
      `rgba(${pointer.color.r * 255},${pointer.color.g * 255},${pointer.color.b * 255},1)`,
    );
    gradient.addColorStop(1, 'rgba(0,0,0,0)');

    this.ctx.fillStyle = gradient;
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, Math.PI * 2);
    this.ctx.fill();
  }
}
