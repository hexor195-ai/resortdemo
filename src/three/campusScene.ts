import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CAMPUS_HOTSPOTS, type HotspotId } from '../data/resortData';
import {
  createLateriteTexture,
  createPavedWalkwayTexture,
  createRoofTexture,
} from './campusTextures';

export type LightingMode = 'day' | 'dusk';

export interface CampusSceneController {
  setHotspot: (id: HotspotId) => void;
  setLighting: (mode: LightingMode) => void;
  zoomBy: (deltaFactor: number) => void;
  resetView: () => void;
  dispose: () => void;
}

export interface CreateCampusSceneOptions {
  initialHotspot: HotspotId;
  initialLighting: LightingMode;
  reducedMotion: boolean;
  onUserInteract?: () => void;
}

interface PalmCluster {
  group: THREE.Group;
  phase: number;
  baseRotZ: number;
}

function buildKonkanCottageWing(
  width: number,
  depth: number,
  lateriteMat: THREE.Material,
  roofMat: THREE.Material,
  windowMats: THREE.MeshStandardMaterial[],
  showSideStairs: boolean
): THREE.Group {
  const wing = new THREE.Group();
  const floorHeight = 2.4;
  const totalHeight = floorHeight * 2;

  // Plinth
  const plinth = new THREE.Mesh(
    new THREE.BoxGeometry(width + 0.6, 0.35, depth + 1.9),
    new THREE.MeshStandardMaterial({ color: 0x6f584b, roughness: 0.9 })
  );
  plinth.position.set(0, 0.175, 0.55);
  plinth.receiveShadow = true;
  wing.add(plinth);

  // Main two-story red laterite core
  const body = new THREE.Mesh(new THREE.BoxGeometry(width, totalHeight, depth), lateriteMat);
  body.position.set(0, 0.35 + totalHeight / 2, -0.2);
  body.castShadow = true;
  body.receiveShadow = true;
  wing.add(body);

  // White floor slab & balcony deck on both levels
  const whiteTrimMat = new THREE.MeshStandardMaterial({ color: 0xf4f1ea, roughness: 0.6 });
  const deckGeo = new THREE.BoxGeometry(width + 0.3, 0.18, 1.5);
  const deck1 = new THREE.Mesh(deckGeo, whiteTrimMat);
  deck1.position.set(0, 0.35 + floorHeight, depth / 2 + 0.45);
  deck1.castShadow = true;
  wing.add(deck1);

  const eaveTrim = new THREE.Mesh(
    new THREE.BoxGeometry(width + 0.7, 0.2, depth + 2.1),
    whiteTrimMat
  );
  eaveTrim.position.set(0, 0.35 + totalHeight, 0.5);
  wing.add(eaveTrim);

  // White balcony pillars & crisp vertical railings (both floors)
  const bayCount = Math.max(4, Math.round(width / 2.2));
  for (let i = 0; i <= bayCount; i++) {
    const x = -width / 2 + (i * width) / bayCount;
    const pillar = new THREE.Mesh(
      new THREE.BoxGeometry(0.16, totalHeight, 0.16),
      whiteTrimMat
    );
    pillar.position.set(x, 0.35 + totalHeight / 2, depth / 2 + 1.12);
    pillar.castShadow = true;
    wing.add(pillar);
  }

  // Horizontal balcony rails & vertical pickets on 1st floor + ground floor
  [0.35 + 0.85, 0.35 + floorHeight + 0.85].forEach((railY) => {
    const topRail = new THREE.Mesh(
      new THREE.BoxGeometry(width + 0.15, 0.08, 0.08),
      whiteTrimMat
    );
    topRail.position.set(0, railY, depth / 2 + 1.12);
    wing.add(topRail);

    const picketCount = Math.floor(width * 2.5);
    for (let p = 0; p < picketCount; p++) {
      const px = -width / 2 + 0.2 + (p * (width - 0.4)) / Math.max(1, picketCount - 1);
      const picket = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.76, 0.05), whiteTrimMat);
      picket.position.set(px, railY - 0.42, depth / 2 + 1.12);
      wing.add(picket);
    }
  });

  // Warm windows & doors across both floors
  const roomsPerFloor = Math.max(3, Math.round(width / 2.6));
  for (let floor = 0; floor < 2; floor++) {
    const wy = 0.35 + floor * floorHeight + 1.25;
    for (let r = 0; r < roomsPerFloor; r++) {
      const wx = -width / 2 + 1.1 + r * ((width - 2.2) / Math.max(1, roomsPerFloor - 1));
      const winMat = new THREE.MeshStandardMaterial({
        color: 0xfde6be,
        emissive: 0xffa744,
        emissiveIntensity: 0.15,
        roughness: 0.25,
      });
      windowMats.push(winMat);
      const winMesh = new THREE.Mesh(new THREE.BoxGeometry(1.1, 1.15, 0.08), winMat);
      winMesh.position.set(wx, wy, depth / 2 - 0.19);
      wing.add(winMesh);

      const frame = new THREE.Mesh(
        new THREE.BoxGeometry(1.24, 1.28, 0.05),
        new THREE.MeshStandardMaterial({ color: 0x4b2e22, roughness: 0.8 })
      );
      frame.position.set(wx, wy, depth / 2 - 0.2);
      wing.add(frame);
    }
  }

  // Hipped green roof
  const roof = new THREE.Mesh(
    new THREE.ConeGeometry(Math.max(width, depth + 2) * 0.72, 2.1, 4),
    roofMat
  );
  roof.rotation.y = Math.PI / 4;
  roof.scale.set(1.06, 1, (depth + 2.4) / Math.max(width, depth + 2));
  roof.position.set(0, 0.35 + totalHeight + 1.05, 0.5);
  roof.castShadow = true;
  wing.add(roof);

  if (showSideStairs) {
    const stairMat = new THREE.MeshStandardMaterial({ color: 0xdfd7cb, roughness: 0.85 });
    for (let s = 0; s < 8; s++) {
      const step = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.24, 0.45), stairMat);
      step.position.set(width / 2 + 0.58, 0.48 + s * 0.29, depth / 2 + 0.9 - s * 0.35);
      step.castShadow = true;
      wing.add(step);
    }
  }

  return wing;
}

function buildDiningGazebo(
  redRoofMat: THREE.Material,
  lanternMats: THREE.MeshStandardMaterial[]
): THREE.Group {
  const gazebo = new THREE.Group();

  // Warm stone floor
  const floor = new THREE.Mesh(
    new THREE.BoxGeometry(5.6, 0.25, 4.8),
    new THREE.MeshStandardMaterial({ color: 0xb76a4f, roughness: 0.85 })
  );
  floor.position.y = 0.125;
  floor.receiveShadow = true;
  gazebo.add(floor);

  const postMat = new THREE.MeshStandardMaterial({ color: 0x5c3626, roughness: 0.75 });
  const postCoords: [number, number][] = [
    [-2.4, -2.0],
    [2.4, -2.0],
    [-2.4, 2.0],
    [2.4, 2.0],
    [0, -2.0],
    [0, 2.0],
  ];
  postCoords.forEach(([px, pz]) => {
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.12, 2.6, 8), postMat);
    post.position.set(px, 1.4, pz);
    post.castShadow = true;
    gazebo.add(post);
  });

  // Low perimeter rail
  const railMat = new THREE.MeshStandardMaterial({ color: 0x7c4430, roughness: 0.8 });
  const backRail = new THREE.Mesh(new THREE.BoxGeometry(5.0, 0.5, 0.1), railMat);
  backRail.position.set(0, 0.5, -2.0);
  gazebo.add(backRail);

  // Dining tables + red chairs (matches resort photos)
  const tableMat = new THREE.MeshStandardMaterial({ color: 0xf4ede3, roughness: 0.5 });
  const chairMat = new THREE.MeshStandardMaterial({ color: 0xc2382b, roughness: 0.6 });
  const tablePositions: [number, number][] = [
    [-1.25, -0.6],
    [1.25, -0.6],
    [-1.25, 0.9],
    [1.25, 0.9],
  ];
  tablePositions.forEach(([tx, tz]) => {
    const top = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.08, 0.8), tableMat);
    top.position.set(tx, 0.82, tz);
    top.castShadow = true;
    gazebo.add(top);

    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, 0.58, 6), postMat);
    leg.position.set(tx, 0.52, tz);
    gazebo.add(leg);

    [-0.55, 0.55].forEach((cx) => {
      const chair = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.48, 0.34), chairMat);
      chair.position.set(tx + cx, 0.5, tz);
      gazebo.add(chair);
    });
  });

  // Warm pendant lanterns
  [-1.2, 1.2].forEach((lx) => {
    const lanternMat = new THREE.MeshStandardMaterial({
      color: 0xffe4ad,
      emissive: 0xffa030,
      emissiveIntensity: 0.25,
    });
    lanternMats.push(lanternMat);
    const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.18, 12, 10), lanternMat);
    bulb.position.set(lx, 2.35, 0);
    gazebo.add(bulb);
  });

  // Sloped terracotta-red roof
  const roof = new THREE.Mesh(new THREE.ConeGeometry(4.4, 1.7, 4), redRoofMat);
  roof.rotation.y = Math.PI / 4;
  roof.scale.set(1.18, 1, 1.0);
  roof.position.y = 3.55;
  roof.castShadow = true;
  gazebo.add(roof);

  return gazebo;
}

function buildKidsPlayZone(): THREE.Group {
  const zone = new THREE.Group();

  // Slide
  const frameMat = new THREE.MeshStandardMaterial({ color: 0x2a6a4d, roughness: 0.6 });
  const slideMat = new THREE.MeshStandardMaterial({ color: 0xe6a11e, roughness: 0.35 });
  const redAccentMat = new THREE.MeshStandardMaterial({ color: 0xc93b2b, roughness: 0.4 });

  const ladder = new THREE.Mesh(new THREE.BoxGeometry(0.6, 1.5, 0.12), frameMat);
  ladder.position.set(-0.6, 0.75, 0);
  ladder.rotation.z = -0.25;
  zone.add(ladder);

  const chute = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.08, 2.1), slideMat);
  chute.position.set(0.35, 0.78, 0);
  chute.rotation.y = Math.PI / 2;
  chute.rotation.x = 0.56;
  chute.castShadow = true;
  zone.add(chute);

  // Swing A-frame
  const swingGroup = new THREE.Group();
  swingGroup.position.set(0.2, 0, 1.9);
  [-1.0, 1.0].forEach((sx) => {
    const leg1 = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1.9, 6), frameMat);
    leg1.position.set(sx, 0.9, -0.32);
    leg1.rotation.x = 0.32;
    swingGroup.add(leg1);

    const leg2 = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1.9, 6), frameMat);
    leg2.position.set(sx, 0.9, 0.32);
    leg2.rotation.x = -0.32;
    swingGroup.add(leg2);
  });

  const crossbar = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 2.3, 6), redAccentMat);
  crossbar.rotation.z = Math.PI / 2;
  crossbar.position.y = 1.75;
  swingGroup.add(crossbar);

  [-0.42, 0.42].forEach((seatX) => {
    const seat = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.06, 0.24), redAccentMat);
    seat.position.set(seatX, 0.6, 0);
    swingGroup.add(seat);
  });

  zone.add(swingGroup);
  return zone;
}

function buildPalmTree(height: number, scale: number): THREE.Group {
  const tree = new THREE.Group();
  const trunkMat = new THREE.MeshStandardMaterial({ color: 0x6f513b, roughness: 0.92 });
  const frondMat = new THREE.MeshStandardMaterial({
    color: 0x2c6336,
    roughness: 0.75,
    side: THREE.DoubleSide,
  });

  const segments = 6;
  const segH = height / segments;
  for (let i = 0; i < segments; i++) {
    const seg = new THREE.Mesh(
      new THREE.CylinderGeometry(0.18 - i * 0.018, 0.22 - i * 0.018, segH + 0.08, 7),
      trunkMat
    );
    const curveX = Math.sin(i * 0.22) * 0.28;
    seg.position.set(curveX, i * segH + segH / 2, 0);
    seg.rotation.z = -i * 0.04;
    seg.castShadow = true;
    tree.add(seg);
  }

  const crown = new THREE.Group();
  crown.position.set(Math.sin((segments - 1) * 0.22) * 0.28, height, 0);

  const frondCount = 7;
  for (let f = 0; f < frondCount; f++) {
    const angle = (f / frondCount) * Math.PI * 2;
    const frondPivot = new THREE.Group();
    frondPivot.rotation.y = angle;

    const leaf = new THREE.Mesh(new THREE.ConeGeometry(0.55 * scale, 2.4 * scale, 4), frondMat);
    leaf.rotation.z = -Math.PI / 2.6;
    leaf.position.set(1.05 * scale, -0.25 * scale, 0);
    leaf.scale.set(0.32, 1, 0.7);
    leaf.castShadow = true;
    frondPivot.add(leaf);
    crown.add(frondPivot);
  }

  tree.add(crown);
  return tree;
}

function buildParkedCar(colorHex: number): THREE.Group {
  const car = new THREE.Group();
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(2.4, 0.62, 1.2),
    new THREE.MeshStandardMaterial({ color: colorHex, roughness: 0.4, metalness: 0.2 })
  );
  body.position.y = 0.45;
  body.castShadow = true;
  car.add(body);

  const cabin = new THREE.Mesh(
    new THREE.BoxGeometry(1.3, 0.5, 1.04),
    new THREE.MeshStandardMaterial({ color: 0xdbe7f0, roughness: 0.2 })
  );
  cabin.position.set(-0.1, 0.96, 0);
  car.add(cabin);

  const wheelMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.9 });
  [
    [-0.75, 0.22, 0.62],
    [0.75, 0.22, 0.62],
    [-0.75, 0.22, -0.62],
    [0.75, 0.22, -0.62],
  ].forEach(([wx, wy, wz]) => {
    const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.14, 10), wheelMat);
    wheel.rotation.x = Math.PI / 2;
    wheel.position.set(wx, wy, wz);
    car.add(wheel);
  });
  return car;
}

export function createPalmBlissScene(
  container: HTMLElement,
  options: CreateCampusSceneOptions
): CampusSceneController | null {
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
  } catch {
    return null;
  }

  if (!renderer.getContext()) {
    renderer.dispose();
    return null;
  }

  const width = Math.max(container.clientWidth || 800, 300);
  const height = Math.max(container.clientHeight || 520, 320);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(width, height);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const daySky = new THREE.Color(0xdbe9dc);
  const duskSky = new THREE.Color(0x282538);
  const dayFogColor = new THREE.Color(0xd5e3d7);
  const duskFogColor = new THREE.Color(0x2c2536);

  let currentLighting: LightingMode = options.initialLighting;
  let lightingBlend = currentLighting === 'dusk' ? 1 : 0;
  let targetLightingBlend = lightingBlend;

  scene.background = (currentLighting === 'dusk' ? duskSky : daySky).clone();
  const fog = new THREE.FogExp2(
    (currentLighting === 'dusk' ? duskFogColor : dayFogColor).getHex(),
    0.0135
  );
  scene.fog = fog;

  const camera = new THREE.PerspectiveCamera(44, width / height, 0.5, 160);
  const initialSpot =
    CAMPUS_HOTSPOTS.find((h) => h.id === options.initialHotspot) ?? CAMPUS_HOTSPOTS[0];
  camera.position.set(...initialSpot.cameraPos);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.06;
  // Keep wheel zoom disabled so scrolling the page never traps over the 3D hero
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.minPolarAngle = 0.22;
  controls.maxPolarAngle = Math.PI / 2 - 0.08;
  controls.minDistance = 11;
  controls.maxDistance = 40;
  controls.target.set(...initialSpot.targetPos);
  controls.update();

  const desiredCameraPos = new THREE.Vector3(...initialSpot.cameraPos);
  const desiredTargetPos = new THREE.Vector3(...initialSpot.targetPos);
  let cameraAnimating = false;
  let userDragging = false;

  const onControlStart = () => {
    userDragging = true;
    cameraAnimating = false;
    options.onUserInteract?.();
  };
  const onControlEnd = () => {
    userDragging = false;
  };
  controls.addEventListener('start', onControlStart);
  controls.addEventListener('end', onControlEnd);

  // Lighting
  const hemiLight = new THREE.HemisphereLight(0xfff8eb, 0x2f4b37, 0.9);
  scene.add(hemiLight);

  const sunLight = new THREE.DirectionalLight(0xfff1d6, 1.85);
  sunLight.position.set(18, 26, 16);
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.set(1024, 1024);
  sunLight.shadow.camera.near = 2;
  sunLight.shadow.camera.far = 75;
  const d = 22;
  sunLight.shadow.camera.left = -d;
  sunLight.shadow.camera.right = d;
  sunLight.shadow.camera.top = d;
  sunLight.shadow.camera.bottom = -d;
  scene.add(sunLight);

  const gazeboWarmLight = new THREE.PointLight(0xffa747, 0, 14, 1.6);
  gazeboWarmLight.position.set(-4.2, 2.4, 4.6);
  scene.add(gazeboWarmLight);

  const courtyardWarmLight = new THREE.PointLight(0xffb45c, 0, 18, 1.5);
  courtyardWarmLight.position.set(0, 4.2, -2.5);
  scene.add(courtyardWarmLight);

  // Textures & Materials
  const lateriteTex = createLateriteTexture();
  const greenRoofTex = createRoofTexture('#29493f', '#1d362e');
  const redRoofTex = createRoofTexture('#9d3a2a', '#7c2b1e');
  const walkwayTex = createPavedWalkwayTexture();

  const lateriteMat = new THREE.MeshStandardMaterial({
    color: lateriteTex ? 0xffffff : 0x9b3b2c,
    map: lateriteTex,
    roughness: 0.85,
  });
  const greenRoofMat = new THREE.MeshStandardMaterial({
    color: greenRoofTex ? 0xffffff : 0x2b4b40,
    map: greenRoofTex,
    roughness: 0.72,
  });
  const redRoofMat = new THREE.MeshStandardMaterial({
    color: redRoofTex ? 0xffffff : 0x9e3b2b,
    map: redRoofTex,
    roughness: 0.72,
  });
  const walkwayMat = new THREE.MeshStandardMaterial({
    color: walkwayTex ? 0xffffff : 0xa5624a,
    map: walkwayTex,
    roughness: 0.88,
  });

  // Ground plane (lush Konkan lawn)
  const lawn = new THREE.Mesh(
    new THREE.CircleGeometry(46, 48),
    new THREE.MeshStandardMaterial({ color: 0x3f6b3e, roughness: 0.92 })
  );
  lawn.rotation.x = -Math.PI / 2;
  lawn.receiveShadow = true;
  scene.add(lawn);

  // Paved courtyard walkways & parking pad
  const mainPlaza = new THREE.Mesh(new THREE.BoxGeometry(15, 0.06, 9.5), walkwayMat);
  mainPlaza.position.set(0, 0.03, 1.8);
  mainPlaza.receiveShadow = true;
  scene.add(mainPlaza);

  const parkingPad = new THREE.Mesh(
    new THREE.BoxGeometry(7.2, 0.06, 8.5),
    new THREE.MeshStandardMaterial({ color: 0x6b6f72, roughness: 0.9 })
  );
  parkingPad.position.set(-11.2, 0.03, -0.8);
  parkingPad.receiveShadow = true;
  scene.add(parkingPad);

  const car1 = buildParkedCar(0xd9e1e8);
  car1.position.set(-11.2, 0.06, -2.1);
  car1.rotation.y = Math.PI / 2;
  scene.add(car1);

  const car2 = buildParkedCar(0x334155);
  car2.position.set(-11.2, 0.06, 1.1);
  car2.rotation.y = Math.PI / 2;
  scene.add(car2);

  // Buildings
  const windowMats: THREE.MeshStandardMaterial[] = [];
  const lanternMats: THREE.MeshStandardMaterial[] = [];

  const mainWing = buildKonkanCottageWing(12.2, 4.6, lateriteMat, greenRoofMat, windowMats, true);
  mainWing.position.set(0, 0, -5.2);
  scene.add(mainWing);

  const sideWing = buildKonkanCottageWing(7.4, 4.2, lateriteMat, greenRoofMat, windowMats, false);
  sideWing.position.set(9.8, 0, -3.2);
  sideWing.rotation.y = -0.38;
  scene.add(sideWing);

  const diningGazebo = buildDiningGazebo(redRoofMat, lanternMats);
  diningGazebo.position.set(-4.2, 0, 4.6);
  scene.add(diningGazebo);

  const kidsZone = buildKidsPlayZone();
  kidsZone.position.set(4.4, 0, 4.2);
  scene.add(kidsZone);

  // Garden bollards along the courtyard
  const bollardCoords: [number, number][] = [
    [-7.0, 1.2],
    [-1.4, 1.6],
    [1.8, 1.6],
    [6.6, 1.2],
    [-1.5, 6.2],
    [2.0, 6.2],
  ];
  bollardCoords.forEach(([bx, bz]) => {
    const post = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.1, 0.72, 6),
      new THREE.MeshStandardMaterial({ color: 0x263238, roughness: 0.7 })
    );
    post.position.set(bx, 0.36, bz);
    scene.add(post);

    const lampMat = new THREE.MeshStandardMaterial({
      color: 0xffebb8,
      emissive: 0xffa73b,
      emissiveIntensity: 0.15,
    });
    lanternMats.push(lampMat);
    const cap = new THREE.Mesh(new THREE.SphereGeometry(0.11, 8, 8), lampMat);
    cap.position.set(bx, 0.76, bz);
    scene.add(cap);
  });

  // Palm trees & tropical shrubs
  const palms: PalmCluster[] = [];
  const palmPlacements: [number, number, number, number][] = [
    [-9.2, -7.8, 6.6, 1.0],
    [-3.5, -10.2, 7.4, 1.1],
    [3.8, -10.5, 7.1, 1.05],
    [11.8, -9.0, 6.8, 1.0],
    [14.2, 1.4, 6.2, 0.95],
    [-8.6, 6.8, 6.4, 0.95],
    [8.2, 7.0, 6.0, 0.9],
    [-15.2, -5.0, 7.0, 1.0],
  ];
  palmPlacements.forEach(([px, pz, ph, ps], idx) => {
    const palm = buildPalmTree(ph, ps);
    palm.position.set(px, 0, pz);
    palm.rotation.y = idx * 0.9;
    scene.add(palm);
    palms.push({ group: palm, phase: idx * 1.3, baseRotZ: palm.rotation.z });
  });

  // Distant Konkan/Sahyadri hills
  const hillMat = new THREE.MeshStandardMaterial({ color: 0x2c4b37, roughness: 0.96 });
  const hills: [number, number, number, number][] = [
    [-22, -26, 14, 9],
    [-4, -30, 18, 11.5],
    [17, -27, 15, 9.5],
    [30, -20, 12, 7.5],
  ];
  hills.forEach(([hx, hz, radius, heightScale]) => {
    const hill = new THREE.Mesh(new THREE.SphereGeometry(radius, 18, 12), hillMat);
    hill.position.set(hx, -2.5, hz);
    hill.scale.set(1.3, heightScale / radius, 0.9);
    scene.add(hill);
  });

  // Subtle floating hotspot beacons
  const beaconMeshes = new Map<HotspotId, THREE.Mesh>();
  CAMPUS_HOTSPOTS.forEach((spot) => {
    const beacon = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.28, 0),
      new THREE.MeshStandardMaterial({
        color: 0xe4a73d,
        emissive: 0xb47b2b,
        emissiveIntensity: spot.id === options.initialHotspot ? 0.9 : 0.25,
        roughness: 0.25,
      })
    );
    beacon.position.set(...spot.pinPos);
    scene.add(beacon);
    beaconMeshes.set(spot.id, beacon);
  });

  let activeHotspot: HotspotId = options.initialHotspot;
  const applyLightingInstant = (blend: number) => {
    const sky = daySky.clone().lerp(duskSky, blend);
    const fogC = dayFogColor.clone().lerp(duskFogColor, blend);
    scene.background = sky;
    fog.color.copy(fogC);

    hemiLight.intensity = THREE.MathUtils.lerp(0.95, 0.45, blend);
    sunLight.intensity = THREE.MathUtils.lerp(1.85, 0.72, blend);
    sunLight.color.setHex(0xfff1d6).lerp(new THREE.Color(0xff9452), blend);
    sunLight.position.set(
      THREE.MathUtils.lerp(18, -16, blend),
      THREE.MathUtils.lerp(26, 9, blend),
      THREE.MathUtils.lerp(16, -12, blend)
    );

    gazeboWarmLight.intensity = THREE.MathUtils.lerp(0, 6.5, blend);
    courtyardWarmLight.intensity = THREE.MathUtils.lerp(0, 5.2, blend);

    const winGlow = THREE.MathUtils.lerp(0.15, 1.35, blend);
    windowMats.forEach((m) => {
      m.emissiveIntensity = winGlow;
    });
    const lanternGlow = THREE.MathUtils.lerp(0.2, 1.8, blend);
    lanternMats.forEach((m) => {
      m.emissiveIntensity = lanternGlow;
    });
  };
  applyLightingInstant(lightingBlend);

  const resizeObserver = new ResizeObserver(() => {
    const nextW = Math.max(container.clientWidth, 300);
    const nextH = Math.max(container.clientHeight, 320);
    camera.aspect = nextW / nextH;
    camera.updateProjectionMatrix();
    renderer.setSize(nextW, nextH);
  });
  resizeObserver.observe(container);

  let rafId = 0;
  let disposed = false;
  const clock = new THREE.Clock();

  const animate = () => {
    if (disposed) return;
    rafId = requestAnimationFrame(animate);
    const elapsed = clock.getElapsedTime();

    if (Math.abs(lightingBlend - targetLightingBlend) > 0.005) {
      lightingBlend = options.reducedMotion
        ? targetLightingBlend
        : THREE.MathUtils.lerp(lightingBlend, targetLightingBlend, 0.08);
      applyLightingInstant(lightingBlend);
    }

    if (cameraAnimating && !userDragging) {
      if (options.reducedMotion) {
        camera.position.copy(desiredCameraPos);
        controls.target.copy(desiredTargetPos);
        cameraAnimating = false;
      } else {
        camera.position.lerp(desiredCameraPos, 0.08);
        controls.target.lerp(desiredTargetPos, 0.08);
        if (
          camera.position.distanceTo(desiredCameraPos) < 0.08 &&
          controls.target.distanceTo(desiredTargetPos) < 0.08
        ) {
          cameraAnimating = false;
        }
      }
    }

    if (!options.reducedMotion) {
      palms.forEach((p) => {
        p.group.rotation.z = p.baseRotZ + Math.sin(elapsed * 1.1 + p.phase) * 0.028;
      });
    }

    beaconMeshes.forEach((mesh, id) => {
      const spot = CAMPUS_HOTSPOTS.find((h) => h.id === id);
      if (spot && !options.reducedMotion) {
        mesh.position.y = spot.pinPos[1] + Math.sin(elapsed * 2.2) * 0.14;
        mesh.rotation.y = elapsed * 1.2;
      }
      const mat = mesh.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = id === activeHotspot ? 1.05 : 0.25;
      mesh.scale.setScalar(id === activeHotspot ? 1.25 : 0.85);
    });

    controls.update();
    renderer.render(scene, camera);
  };
  animate();

  return {
    setHotspot(id: HotspotId) {
      activeHotspot = id;
      const spot = CAMPUS_HOTSPOTS.find((h) => h.id === id);
      if (!spot) return;
      desiredCameraPos.set(...spot.cameraPos);
      desiredTargetPos.set(...spot.targetPos);
      cameraAnimating = true;
    },
    setLighting(mode: LightingMode) {
      currentLighting = mode;
      targetLightingBlend = mode === 'dusk' ? 1 : 0;
      if (options.reducedMotion) {
        lightingBlend = targetLightingBlend;
        applyLightingInstant(lightingBlend);
      }
    },
    zoomBy(deltaFactor: number) {
      cameraAnimating = false;
      const offset = camera.position.clone().sub(controls.target);
      const nextLength = THREE.MathUtils.clamp(
        offset.length() * deltaFactor,
        controls.minDistance,
        controls.maxDistance
      );
      offset.setLength(nextLength);
      camera.position.copy(controls.target).add(offset);
      controls.update();
    },
    resetView() {
      const overview = CAMPUS_HOTSPOTS[0];
      activeHotspot = overview.id;
      desiredCameraPos.set(...overview.cameraPos);
      desiredTargetPos.set(...overview.targetPos);
      cameraAnimating = true;
    },
    dispose() {
      disposed = true;
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      controls.removeEventListener('start', onControlStart);
      controls.removeEventListener('end', onControlEnd);
      controls.dispose();

      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });

      lateriteTex?.dispose();
      greenRoofTex?.dispose();
      redRoofTex?.dispose();
      walkwayTex?.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    },
  };
}
