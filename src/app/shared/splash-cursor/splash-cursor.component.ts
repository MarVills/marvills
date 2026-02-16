import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  NgZone,
} from '@angular/core';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  life: number;
}

@Component({
  selector: 'app-splash-cursor',
  standalone: true,
  template: `<canvas #canvas class="splash-cursor"></canvas>`,
  styles: [
    `
      :host {
        position: fixed;
        inset: 0;
        pointer-events: none;
        z-index: 9999;
      }
      canvas {
        width: 100%;
        height: 100%;
      }
    `,
  ],
})
export class SplashCursorComponent implements AfterViewInit {
  @ViewChild('canvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private lastTime = performance.now();

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.init();
      this.loop();
      window.addEventListener('pointermove', (e) =>
        this.emitParticles(e.clientX, e.clientY),
      );
      window.addEventListener('resize', () => this.resize());
    });
  }

  private init() {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return console.error('2D canvas not supported');
    this.ctx = ctx;
    this.resize();
  }

  private resize() {
    const canvas = this.canvasRef.nativeElement;
    const dpr = Math.min(window.devicePixelRatio, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.scale(dpr, dpr);
  }

  private emitParticles(x: number, y: number) {
    const t = performance.now() * 0.001;
    const color = `rgba(
      ${Math.floor(128 + 127 * Math.sin(t))},
      ${Math.floor(128 + 127 * Math.sin(t + 2))},
      ${Math.floor(128 + 127 * Math.sin(t + 4))},
      0.5
    )`;

    for (let i = 0; i < 5; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 2 + 0.5;
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: Math.random() * 10 + 5,
        color,
        life: 60, // frames
      });
    }
  }

  private loop = () => {
    requestAnimationFrame(this.loop);
    this.ctx.fillStyle = 'rgba(0,0,0,0.05)';
    this.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

    // Update and draw particles
    this.particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.95; // friction
      p.vy *= 0.95;
      p.life -= 1;

      this.ctx.beginPath();
      this.ctx.fillStyle = p.color;
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fill();
    });

    // Remove dead particles
    this.particles = this.particles.filter((p) => p.life > 0);
  };
}
