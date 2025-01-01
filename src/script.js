import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";

/**
 * Base
 */
// Debug
const gui = new GUI({
  title: "Debug",
  width: 200,
});

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();

const matcapTexture = textureLoader.load("/textures/matcaps/8.png");
const matcapTexture2 = textureLoader.load("/textures/matcaps/1.png");
matcapTexture.colorSpace = THREE.SRGBColorSpace;
matcapTexture2.colorSpace = THREE.SRGBColorSpace;

// Load Font
const fontLoader = new FontLoader();

fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  console.log("font loaded");
  const textGeometry = new TextGeometry("Firstya R.A", {
    font: font,
    size: 0.5,
    depth: 0.2,
    curveSegments: 5,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 3,
  });

  const newYear = new TextGeometry("Happy New Year - 2025", {
    font: font,
    size: 0.3,
    depth: 0.2,
    curveSegments: 5,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 3,
  });

  const philo = new TextGeometry("- Philoo", {
    font: font,
    size: 0.3,
    depth: 0.2,
    curveSegments: 5,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 3,
  });

  newYear.center();
  textGeometry.center();
  philo.center();

  const customMaterial = new THREE.MeshMatcapMaterial({
    matcap: matcapTexture,
  });

  const customMaterial2 = new THREE.MeshMatcapMaterial({
    matcap: matcapTexture2,
  });

  const text = new THREE.Mesh(textGeometry, customMaterial);
  const newYearText = new THREE.Mesh(newYear, customMaterial);
  const philoText = new THREE.Mesh(philo, customMaterial2);

  const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);

  // Manipulate the position of the text
  newYearText.position.y = 1;
  philoText.position.y = -1.5;

  scene.add(text);
  scene.add(newYearText);
  scene.add(philoText);

  for (let i = 0; i < 100; i++) {
    const donut = new THREE.Mesh(donutGeometry, customMaterial);

    donut.position.x = (Math.random() - 0.5) * 10;
    donut.position.y = (Math.random() - 0.5) * 10;
    donut.position.z = (Math.random() - 0.5) * 10;

    const scale = Math.random();
    donut.scale.set(scale, scale, scale);

    scene.add(donut);
  }
});

// add axes
// const axesHelper = new THREE.AxesHelper(5);
// scene.add(axesHelper);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);

camera.position.x = -1.3;
camera.position.y = 0.8;
camera.position.z = 2.6;

scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// add tweaks
gui.add(camera.position, "z").min(0).max(10).step(0.001);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
