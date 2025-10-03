import { useEffect, useRef, useState } from 'react';
import { floorPlanData } from '@/data/floorPlanData';

interface FloorPlan2DProps {
  selectedRoom?: string;
}

export const FloorPlan2D = ({ selectedRoom }: FloorPlan2DProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Draw the floor plan
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match container
    const rect = container.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Calculate scale to fit the floor plan perfectly
    const padding = 20;
    const availableWidth = rect.width - padding * 2;
    const availableHeight = rect.height - padding * 2;
    const scaleX = availableWidth / floorPlanData.planSize.width;
    const scaleY = availableHeight / floorPlanData.planSize.height;
    const baseScale = Math.min(scaleX, scaleY);

    // Clear canvas
    ctx.fillStyle = 'hsl(0, 0%, 96%)';
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Apply transformations
    ctx.save();
    ctx.translate(rect.width / 2 + offset.x, rect.height / 2 + offset.y);
    ctx.scale(baseScale * scale, baseScale * scale);
    ctx.translate(-floorPlanData.planSize.width / 2, -floorPlanData.planSize.height / 2);

    // Draw rooms
    floorPlanData.rooms.forEach((room) => {
      ctx.beginPath();
      room.points.forEach((point, index) => {
        if (index === 0) {
          ctx.moveTo(point[0], point[1]);
        } else {
          ctx.lineTo(point[0], point[1]);
        }
      });
      ctx.closePath();

      // Fill room
      if (selectedRoom === room.name) {
        ctx.fillStyle = 'hsl(221, 83%, 53%)';
        ctx.globalAlpha = 0.3;
      } else {
        ctx.fillStyle = 'hsl(0, 0%, 100%)';
        ctx.globalAlpha = 1;
      }
      ctx.fill();

      // Draw room border
      ctx.strokeStyle = 'hsl(0, 0%, 85%)';
      ctx.lineWidth = 0.15;
      ctx.globalAlpha = 1;
      ctx.stroke();

      // Draw room label
      const centerX = room.points.reduce((sum, p) => sum + p[0], 0) / room.points.length;
      const centerY = room.points.reduce((sum, p) => sum + p[1], 0) / room.points.length;
      
      ctx.fillStyle = 'hsl(0, 0%, 15%)';
      ctx.font = '0.8px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      const lines = room.name.split('\n');
      lines.forEach((line, i) => {
        ctx.fillText(line, centerX, centerY + (i - (lines.length - 1) / 2) * 1);
      });
    });

    // Draw walls
    ctx.strokeStyle = 'hsl(0, 0%, 37%)';
    ctx.lineWidth = floorPlanData.wallThickness;
    ctx.lineCap = 'round';
    
    floorPlanData.walls.forEach((wall) => {
      ctx.beginPath();
      ctx.moveTo(wall.p1[0], wall.p1[1]);
      ctx.lineTo(wall.p2[0], wall.p2[1]);
      ctx.stroke();
    });

    ctx.restore();
  }, [scale, offset, selectedRoom]);

  // Handle mouse/touch events for pan
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setScale(prev => Math.max(0.5, Math.min(3, prev * delta)));
  };

  return (
    <div 
      ref={containerRef}
      className="w-full h-full cursor-grab active:cursor-grabbing"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
    >
      <canvas ref={canvasRef} />
    </div>
  );
};
