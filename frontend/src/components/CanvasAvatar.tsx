import React, { useEffect, useRef } from 'react';

export const CanvasAvatar: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let size = 420;
    
    // Set matching dimensions
    canvas.width = size;
    canvas.height = size;

    // Define 3D Points for holographic dual sphere
    interface Point3D {
      x: number;
      y: number;
      z: number;
      color: string;
      size: number;
    }

    const points: Point3D[] = [];
    const numPoints = 280;
    const sphereRadius = 110;

    // Generate Outer Hologram Sphere
    for (let i = 0; i < numPoints; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      
      const r = sphereRadius;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      const color = Math.random() > 0.45 ? '#00f0ff' : '#bd00ff'; // Cyan & Purple glowing nodes

      points.push({ x, y, z, color, size: Math.random() * 1.5 + 0.8 });
    }

    // Generate Inner Core Sphere Nodes (denser, neon purple/pink)
    const numCorePoints = 120;
    const coreRadius = 50;
    for (let i = 0; i < numCorePoints; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      
      const r = coreRadius + Math.sin(theta * 4) * 8; // Distorted core pattern
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      points.push({ x, y, z, color: '#ff007f', size: Math.random() * 2 + 1 });
    }

    // Capture mouse tilt coordinates
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      
      // Calculate normalized offset (-1 to 1)
      mouse.targetX = (e.clientX - cx) / (window.innerWidth / 2);
      mouse.targetY = (e.clientY - cy) / (window.innerHeight / 2);
    };

    window.addEventListener('mousemove', handleMouseMove);

    let angleX = 0;
    let angleY = 0;

    const animate = () => {
      ctx.clearRect(0, 0, size, size);
      
      const cx = size / 2;
      const cy = size / 2;

      // Smooth interpolation for mouse movements
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      // Base auto-spin plus mouse control
      angleY += 0.007 + mouse.x * 0.01;
      angleX = mouse.y * 0.4; // Pitch tilted by mouse Y

      // 1. Draw Outer Concentric Diagnostics HUD Circles
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.08)';
      ctx.lineWidth = 1;
      
      // Ring 1 (Static grid compass)
      ctx.beginPath();
      ctx.arc(cx, cy, 180, 0, Math.PI * 2);
      ctx.stroke();

      // Ring 2 (Dashed rotating ring)
      ctx.strokeStyle = 'rgba(189, 0, 255, 0.15)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 15]);
      ctx.beginPath();
      ctx.arc(cx, cy, 155, angleY * 0.5, angleY * 0.5 + Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]); // Reset dash

      // HUD cross brackets
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.2)';
      ctx.lineWidth = 1;
      // Top bracket
      ctx.beginPath();
      ctx.moveTo(cx - 30, cy - 160);
      ctx.lineTo(cx + 30, cy - 160);
      ctx.stroke();
      
      // Ambient pulse wave rings
      const pulseScale = (Date.now() % 2000) / 2000;
      ctx.strokeStyle = `rgba(0, 240, 255, ${0.15 * (1 - pulseScale)})`;
      ctx.beginPath();
      ctx.arc(cx, cy, 110 + pulseScale * 60, 0, Math.PI * 2);
      ctx.stroke();

      // Project & Draw 3D Points
      const sinX = Math.sin(angleX);
      const cosX = Math.cos(angleX);
      const sinY = Math.sin(angleY);
      const cosY = Math.cos(angleY);

      // Sort points by Z (depth buffer) to render correct overlapping
      const projectedPoints = points.map((p) => {
        // Rotate Y (Left-Right)
        let x1 = p.x * cosY - p.z * sinY;
        let z1 = p.z * cosY + p.x * sinY;

        // Rotate X (Up-Down)
        let y2 = p.y * cosX - z1 * sinX;
        let z2 = z1 * cosX + p.y * sinX;

        // Perspective projection factor
        const fov = 350;
        const scale = fov / (fov + z2);
        
        return {
          projX: cx + x1 * scale,
          projY: cy + y2 * scale,
          depth: z2,
          color: p.color,
          size: p.size * scale
        };
      });

      // Sort back-to-front
      projectedPoints.sort((a, b) => b.depth - a.depth);

      // Render points
      projectedPoints.forEach((p) => {
        // Render simple glowing circles
        ctx.beginPath();
        ctx.arc(p.projX, p.projY, p.size, 0, Math.PI * 2);
        
        // Z-Depth fade calculation (fade out rear points)
        const alpha = Math.max(0.1, 1 - (p.depth + sphereRadius) / (sphereRadius * 2));
        ctx.fillStyle = p.color === '#00f0ff' 
          ? `rgba(0, 240, 255, ${alpha * 0.95})` 
          : p.color === '#bd00ff'
            ? `rgba(189, 0, 255, ${alpha * 0.95})`
            : `rgba(255, 0, 127, ${alpha * 0.95})`; // Core pink
            
        ctx.fill();
        
        // Draw soft connections between very close core points for visual complexity
        if (p.color === '#ff007f' && alpha > 0.5) {
          ctx.beginPath();
          ctx.arc(p.projX, p.projY, p.size * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 0, 127, ${alpha * 0.15})`;
          ctx.fill();
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="relative flex items-center justify-center select-none w-full max-w-[420px] aspect-square">
      {/* Central Canvas */}
      <canvas 
        ref={canvasRef} 
        className="w-full h-full drop-shadow-[0_0_20px_rgba(0,240,255,0.25)] relative z-10"
      />
      
      {/* Glowing Outer HUD bracket graphics */}
      <div className="absolute inset-0 border border-cyan-500/5 rounded-full pointer-events-none scale-105 animate-pulse-glow"></div>
      
      {/* Target Crosshairs */}
      <div className="absolute top-1/2 left-4 right-4 h-[1px] bg-cyan-500/10 pointer-events-none"></div>
      <div className="absolute left-1/2 top-4 bottom-4 w-[1px] bg-cyan-500/10 pointer-events-none"></div>
    </div>
  );
};
export default CanvasAvatar;
