import * as THREE from 'three';

function createCanvas(width: number, height: number): HTMLCanvasElement | null {
  if (typeof document === 'undefined') return null;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

export function createLateriteTexture(): THREE.CanvasTexture | null {
  const canvas = createCanvas(256, 256);
  const ctx = canvas?.getContext('2d');
  if (!canvas || !ctx) return null;

  ctx.fillStyle = '#973829';
  ctx.fillRect(0, 0, 256, 256);

  const rows = 8;
  const cols = 4;
  const rowH = 256 / rows;
  const colW = 256 / cols;

  for (let r = 0; r < rows; r++) {
    const offset = r % 2 === 0 ? 0 : colW / 2;
    for (let c = -1; c <= cols; c++) {
      const shade = ((r * 7 + c * 13) % 5) * 6 - 12;
      ctx.fillStyle = `rgb(${150 + shade}, ${56 + Math.floor(shade * 0.4)}, ${41 + Math.floor(shade * 0.3)})`;
      ctx.fillRect(c * colW + offset + 2, r * rowH + 2, colW - 4, rowH - 4);
    }
  }

  ctx.strokeStyle = 'rgba(235, 222, 205, 0.25)';
  ctx.lineWidth = 2;
  for (let r = 0; r <= rows; r++) {
    ctx.beginPath();
    ctx.moveTo(0, r * rowH);
    ctx.lineTo(256, r * rowH);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 2);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function createRoofTexture(baseHex: string, ribHex: string): THREE.CanvasTexture | null {
  const canvas = createCanvas(256, 256);
  const ctx = canvas?.getContext('2d');
  if (!canvas || !ctx) return null;

  ctx.fillStyle = baseHex;
  ctx.fillRect(0, 0, 256, 256);

  ctx.strokeStyle = ribHex;
  ctx.lineWidth = 4;
  for (let x = 0; x < 256; x += 16) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 256);
    ctx.stroke();
  }

  ctx.strokeStyle = 'rgba(255,255,255,0.08)';
  ctx.lineWidth = 2;
  for (let y = 0; y < 256; y += 32) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(256, y);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 2);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function createPavedWalkwayTexture(): THREE.CanvasTexture | null {
  const canvas = createCanvas(256, 256);
  const ctx = canvas?.getContext('2d');
  if (!canvas || !ctx) return null;

  ctx.fillStyle = '#a8654e';
  ctx.fillRect(0, 0, 256, 256);

  for (let y = 0; y < 256; y += 32) {
    const xShift = (y / 32) % 2 === 0 ? 0 : 24;
    for (let x = -32; x < 256; x += 48) {
      const tone = ((x + y) % 3) * 8;
      ctx.fillStyle = `rgb(${168 + tone}, ${101 + Math.floor(tone * 0.6)}, ${78 + Math.floor(tone * 0.4)})`;
      ctx.fillRect(x + xShift + 2, y + 2, 44, 28);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}
