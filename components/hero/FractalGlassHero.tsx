"use client";

import { useReducedMotion } from "framer-motion";
import { type ChangeEvent, useEffect, useRef, useState } from "react";
import {
  LinearFilter,
  Mesh,
  MirroredRepeatWrapping,
  OrthographicCamera,
  PlaneGeometry,
  RepeatWrapping,
  RGBAFormat,
  Scene,
  ShaderMaterial,
  TextureLoader,
  Vector2,
  Vector3,
  WebGLRenderer,
  WebGLRenderTarget,
} from "three";

const vertexShader = `
uniform vec2 uResolution;
uniform vec2 uGrainTextureSize;
uniform float uPixelRatio;

varying vec2 vUv;
varying vec2 vUvA;
varying vec3 vPos;

void main() {
    vUv = uv;
    vPos = position;
    float aspect = uResolution.x / uResolution.y;
    if (aspect < 1. || aspect > 2.3) {
        vUvA = uResolution * uPixelRatio / uGrainTextureSize * uv;
    } else {
        vUvA = uv;
    }
    gl_Position = vec4(position, 1.0);
}
`;

const noiseShader = `
uniform float uTime;
uniform float uNoiseScaleX;
uniform float uNoiseScaleY;
uniform float uWarpSpeed;
varying vec2 vUvA;

vec3 mod289(vec3 x) {
return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec2 mod289(vec2 x) {
return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec3 permute(vec3 x) {
return mod289(((x*34.0)+10.0)*x);
}

float snoise(vec2 v)
{
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);

    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;

    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
            + i.x + vec3(0.0, i1.x, 1.0 ));

    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;

    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;

    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );

    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
}

void main() {
    float t = uTime * uWarpSpeed;
    float nx = snoise(vUvA * vec2(uNoiseScaleX, uNoiseScaleY) + t * 0.5);
    float ny = snoise(vUvA * vec2(uNoiseScaleX, uNoiseScaleY) * 0.93 - t * 0.3);
    gl_FragColor = vec4(nx * 0.5 + 0.5, ny * 0.5 + 0.5, 0., 1.0);
}
`;

const fragmentShader = `
#define PI 3.14159265359

uniform float uPixelRatio;
uniform float uTime;
uniform vec2 uResolution;
uniform float uWarpStrength;
uniform sampler2D uNoiseMap;
uniform sampler2D uGrainTexture;
uniform float uGrainStrength;
uniform float uFluteWidth;
uniform float uFluteStrength;
uniform float uToneMapExposure;
uniform vec3 uC1;
uniform vec3 uC2;
uniform vec3 uC3;
uniform vec3 uC4;
uniform vec3 uC5;
uniform int uAlgo;
varying vec2 vUv;
varying vec2 vUvA;

vec3 GaussianBlobs(vec2 uv) {
    float t = uTime * 0.6 + 3.5;

    vec2 p1 = vec2(-0.28 + sin(t * 0.7 + 0.5) * 0.15,  0.06 + cos(t * 0.5) * 0.12);
    vec2 p2 = vec2(-0.06 + sin(t * 0.4 + 1.2) * 0.18,  0.16 + cos(t * 0.6) * 0.15);
    vec2 p3 = vec2( 0.07 + sin(t * 0.5 + 3.4) * 0.2,  0.00 + cos(t * 0.4) * 0.14);
    vec2 p4 = vec2( 0.22 + sin(t * 0.3 + 2.3) * 0.24, -0.10 + cos(t * 0.7) * 0.14);
    vec2 p5 = vec2( 0.30 + sin(t * 0.6 + 1.1) * 0.18,  0.06 + cos(t * 0.4) * 0.13);

    vec2 warpNoise = texture2D(uNoiseMap, vUv).rg * 2.0 - 1.0;
    vec2 warpedUv = uv + warpNoise * uWarpStrength;
    float d1 = dot(warpedUv - p1, warpedUv - p1);
    float d2 = dot(warpedUv - p2, warpedUv - p2);
    float d3 = dot(warpedUv - p3, warpedUv - p3);
    float d4 = dot(warpedUv - p4, warpedUv - p4);
    float d5 = dot(warpedUv - p5, warpedUv - p5);

    vec3 color = vec3(0.005, 0.010, 0.055);
    color += uC1 * exp(-d1 * 12.0) * 1.4;
    color += uC2 * exp(-d2 * 20.0) * 2.0;
    color += uC3 * exp(-d3 *  9.0) * 1.6;
    color += uC4 * exp(-d4 * 15.0) * 1.3;
    color += uC5 * exp(-d5 * 25.0) * 0.8;

    return color;
}

vec2 rotate2d(vec2 v, float angle) {
    float s = sin(angle);
    float c = cos(angle);
    mat2 m = mat2(c, -s, s, c);
    return m * v;
}

vec3 GaussianEllipses(vec2 uv) {
    float t = uTime * 0.6 + 3.5;

    vec2 p1 = vec2(-0.32 + sin(t * 0.5 + 1.8) * 0.20, -0.12 + cos(t * 0.8 + 0.3) * 0.16);
    vec2 p2 = vec2( 0.10 + sin(t * 0.6 + 2.5) * 0.14,  0.24 + cos(t * 0.3 + 1.7) * 0.18);
    vec2 p3 = vec2(-0.15 + sin(t * 0.9 + 0.7) * 0.22, -0.08 + cos(t * 0.5 + 2.9) * 0.11);
    vec2 p4 = vec2( 0.28 + sin(t * 0.4 + 3.1) * 0.17,  0.18 + cos(t * 0.6 + 0.9) * 0.20);
    vec2 p5 = vec2(-0.05 + sin(t * 0.7 + 4.2) * 0.13, -0.20 + cos(t * 0.9 + 1.5) * 0.15);

    vec2 warpNoise = texture2D(uNoiseMap, vUv).rg * 2. - 1.;
    vec2 warpedUv = uv + vec2(warpNoise.r * uWarpStrength, warpNoise.g * uWarpStrength * 0.2);

    vec2 r1 = rotate2d(warpedUv - p1,  0.3);
    vec2 r2 = rotate2d(warpedUv - p2, -1.1);
    vec2 r3 = rotate2d(warpedUv - p3,  0.8);
    vec2 r4 = rotate2d(warpedUv - p4, -0.5);
    vec2 r5 = rotate2d(warpedUv - p5,  1.4);

    float e1 = r1.x * r1.x *  8.0 + r1.y * r1.y * 1.0;
    float e2 = r2.x * r2.x * 25.0 + r2.y * r2.y * 12.0;
    float e3 = r3.x * r3.x *  6.0 + r3.y * r3.y * 14.0;
    float e4 = r4.x * r4.x * 20.0 + r4.y * r4.y *  8.0;
    float e5 = r5.x * r5.x * 30.0 + r5.y * r5.y * 15.0;

    vec3 color = vec3(0.005, 0.010, 0.055);
    color += uC1 * exp(-e1) * 1.4;
    color += uC2 * exp(-e2) * 2.0;
    color += uC3 * exp(-e3) * 1.6;
    color += uC4 * exp(-e4) * 1.3;
    color += uC5 * exp(-e5) * 0.8;

    return color;
}

void main() {
    vec2 mappedCoords = gl_FragCoord.xy / uPixelRatio - uResolution * 0.5;

    vec2 scaledUv = mappedCoords / vec2(uFluteWidth);
    vec2 fractUv = vec2(fract(scaledUv.x), scaledUv.y);
    float flutedX = (uFluteStrength) * (fractUv.x - 0.5);
    float flutedY = -(uFluteStrength) * atanh(pow(fractUv.x, 6.));
    vec2 flutedCoords = vec2(mappedCoords.x + flutedX, mappedCoords.y + flutedY);
    vec2 flutedUv = flutedCoords / 1000.;

    vec3 color = (uAlgo == 0) ? GaussianBlobs(flutedUv) : GaussianEllipses(flutedUv);

    color = 1.0 - exp(-color * uToneMapExposure);

    float grain = texture2D(uGrainTexture, vUvA).r * 2.0 - 1.0;
    color += grain * uGrainStrength * max(color.r, max(color.g, color.b));
    color = clamp(color, 0.0, 1.0);

    gl_FragColor = vec4(color, 1.0);
}
`;

const palettes = {
  Aurora: [
    [0.0, 0.75, 0.45],
    [0.05, 0.45, 0.95],
    [0.55, 0.05, 0.85],
    [0.0, 0.9, 0.7],
    [0.3, 0.0, 0.65],
  ],
  "Neon Flux": [
    [0.02, 0.2, 0.75],
    [0.8, 0.05, 0.55],
    [0.95, 0.1, 0.15],
    [0.97, 0.48, 0.08],
    [0.2, 0.65, 0.88],
  ],
  Sunset: [
    [0.95, 0.25, 0.05],
    [0.85, 0.08, 0.35],
    [1.0, 0.6, 0.0],
    [0.55, 0.05, 0.5],
    [1.0, 0.85, 0.2],
  ],
} as const;

type PaletteName = keyof typeof palettes;
type ShaderPalette = (typeof palettes)[PaletteName];

type FractalSettings = {
  algo: 0 | 1;
  fluteStrength: number;
  fluteWidth: number;
  grainStrength: number;
  noiseScaleX: number;
  noiseScaleY: number;
  palette: PaletteName;
  patternBrightness: number;
  warpSpeed: number;
  warpStrength: number;
};

const defaultSettings: FractalSettings = {
  algo: 1,
  fluteStrength: 153,
  fluteWidth: 35,
  grainStrength: 0.8,
  noiseScaleX: 1.3,
  noiseScaleY: 0.65,
  palette: "Aurora",
  patternBrightness: 0.58,
  warpSpeed: 0.12,
  warpStrength: 0.36,
};

const paletteLoop = ["Aurora", "Neon Flux"] as const satisfies PaletteName[];
const paletteLoopDurationMs = 10_000;
const paletteTransitionDurationMs = 8_000;

function easeInOutCubic(value: number) {
  return value < 0.5
    ? 4 * value * value * value
    : 1 - (-2 * value + 2) ** 3 / 2;
}

function mixPalette(from: ShaderPalette, to: ShaderPalette, progress: number) {
  const easedProgress = easeInOutCubic(Math.min(Math.max(progress, 0), 1));

  return from.map((fromColor, colorIndex) =>
    fromColor.map(
      (channel, channelIndex) =>
        channel + (to[colorIndex][channelIndex] - channel) * easedProgress,
    ),
  ) as unknown as ShaderPalette;
}

const controlGroups = [
  {
    controls: [
      { key: "noiseScaleX", label: "Noise X", max: 5, min: 0.1, step: 0.05 },
      { key: "noiseScaleY", label: "Noise Y", max: 5, min: 0.1, step: 0.05 },
      { key: "warpStrength", label: "Warp", max: 2, min: 0, step: 0.01 },
      { key: "warpSpeed", label: "Speed", max: 1, min: 0, step: 0.01 },
    ],
    title: "Pattern",
  },
  {
    controls: [
      { key: "fluteWidth", label: "Flute Width", max: 200, min: 5, step: 1 },
      {
        key: "fluteStrength",
        label: "Refraction",
        max: 200,
        min: 0,
        step: 1,
      },
      { key: "grainStrength", label: "Grain", max: 1, min: 0, step: 0.005 },
      {
        key: "patternBrightness",
        label: "Brightness",
        max: 2,
        min: 0.01,
        step: 0.01,
      },
    ],
    title: "Glass",
  },
] satisfies Array<{
  controls: Array<{
    key: keyof Omit<FractalSettings, "algo" | "palette">;
    label: string;
    max: number;
    min: number;
    step: number;
  }>;
  title: string;
}>;

export function FractalGlassHero() {
  const mountRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<FractalSettings>(defaultSettings);
  const shouldReduceMotion = useReducedMotion();
  const paletteNameRef = useRef<PaletteName>(paletteLoop[0]);
  const currentPaletteRef = useRef<ShaderPalette>(palettes[paletteLoop[0]]);
  const transitionFromPaletteRef = useRef<ShaderPalette>(
    palettes[paletteLoop[0]],
  );
  const transitionStartRef = useRef(0);
  const transitionToPaletteRef = useRef<ShaderPalette>(
    palettes[paletteLoop[0]],
  );
  const [settings, setSettings] = useState<FractalSettings>(defaultSettings);
  // Fractal Lab fica comentado/desabilitado enquanto a hero usa o loop automatico.
  const showControls = false;

  const updateSettings = (nextSettings: FractalSettings) => {
    settingsRef.current = nextSettings;
    setSettings(nextSettings);
  };

  const updateNumber =
    (key: keyof Omit<FractalSettings, "algo" | "palette">) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      updateSettings({
        ...settingsRef.current,
        [key]: Number(event.target.value),
      });
    };

  const updatePalette = (event: ChangeEvent<HTMLSelectElement>) => {
    updateSettings({
      ...settingsRef.current,
      palette: event.target.value as PaletteName,
    });
  };

  const updateAlgo = (event: ChangeEvent<HTMLSelectElement>) => {
    updateSettings({
      ...settingsRef.current,
      algo: Number(event.target.value) as 0 | 1,
    });
  };

  useEffect(() => {
    if (showControls) {
      return;
    }

    let paletteIndex = 0;
    paletteNameRef.current = paletteLoop[paletteIndex];
    currentPaletteRef.current = palettes[paletteLoop[paletteIndex]];
    transitionFromPaletteRef.current = palettes[paletteLoop[paletteIndex]];
    transitionToPaletteRef.current = palettes[paletteLoop[paletteIndex]];

    const intervalId = window.setInterval(() => {
      paletteIndex = (paletteIndex + 1) % paletteLoop.length;
      paletteNameRef.current = paletteLoop[paletteIndex];
      transitionFromPaletteRef.current = currentPaletteRef.current;
      transitionToPaletteRef.current = palettes[paletteLoop[paletteIndex]];
      transitionStartRef.current = performance.now();
    }, paletteLoopDurationMs);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const mount = mountRef.current;

    if (!mount) {
      return;
    }

    const isSmallViewport = window.matchMedia("(max-width: 767px)").matches;
    const renderer = new WebGLRenderer({
      alpha: false,
      antialias: !isSmallViewport,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x010318, 1);
    mount.appendChild(renderer.domElement);

    const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const scene = new Scene();
    const noiseScene = new Scene();
    const geometry = new PlaneGeometry(2, 2, 1, 1);
    const resolution = new Vector2(1, 1);
    const grainTextureSize = new Vector2(1024, 691);

    const noiseTargetSize = isSmallViewport ? 128 : 256;
    const noiseTarget = new WebGLRenderTarget(
      noiseTargetSize,
      noiseTargetSize,
      {
        format: RGBAFormat,
        magFilter: LinearFilter,
        minFilter: LinearFilter,
      },
    );
    noiseTarget.texture.wrapS = MirroredRepeatWrapping;
    noiseTarget.texture.wrapT = MirroredRepeatWrapping;

    const commonVertexUniforms = {
      uResolution: { value: resolution },
      uGrainTextureSize: { value: grainTextureSize },
      uPixelRatio: { value: 1 },
    };

    const noiseUniforms = {
      ...commonVertexUniforms,
      uTime: { value: 0 },
      uNoiseScaleX: { value: defaultSettings.noiseScaleX },
      uNoiseScaleY: { value: defaultSettings.noiseScaleY },
      uWarpSpeed: {
        value: shouldReduceMotion ? 0 : defaultSettings.warpSpeed,
      },
    };
    const noiseMaterial = new ShaderMaterial({
      vertexShader,
      fragmentShader: noiseShader,
      uniforms: noiseUniforms,
    });
    const noiseMesh = new Mesh(geometry, noiseMaterial);
    noiseScene.add(noiseMesh);

    const grainTexture = new TextureLoader().load(
      "/film_grain_contrasted.webp",
      (texture) => {
        grainTextureSize.set(texture.image.width, texture.image.height);
        texture.wrapS = RepeatWrapping;
        texture.wrapT = RepeatWrapping;
        texture.needsUpdate = true;
      },
    );
    grainTexture.wrapS = RepeatWrapping;
    grainTexture.wrapT = RepeatWrapping;

    const uniforms = {
      ...commonVertexUniforms,
      uTime: { value: 0 },
      uWarpStrength: { value: defaultSettings.warpStrength },
      uNoiseMap: { value: noiseTarget.texture },
      uGrainTexture: { value: grainTexture },
      uGrainStrength: { value: defaultSettings.grainStrength },
      uFluteWidth: { value: defaultSettings.fluteWidth },
      uFluteStrength: { value: defaultSettings.fluteStrength },
      uToneMapExposure: { value: defaultSettings.patternBrightness },
      uC1: { value: new Vector3(...palettes[defaultSettings.palette][0]) },
      uC2: { value: new Vector3(...palettes[defaultSettings.palette][1]) },
      uC3: { value: new Vector3(...palettes[defaultSettings.palette][2]) },
      uC4: { value: new Vector3(...palettes[defaultSettings.palette][3]) },
      uC5: { value: new Vector3(...palettes[defaultSettings.palette][4]) },
      uAlgo: { value: defaultSettings.algo },
    };
    const material = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
    });
    const mesh = new Mesh(geometry, material);
    scene.add(mesh);

    let animationFrame = 0;
    let lastTime = performance.now();

    const resize = () => {
      const rect = mount.getBoundingClientRect();
      const maxPixelRatio = isSmallViewport ? 1.25 : 1.75;
      const pixelRatio = Math.min(window.devicePixelRatio, maxPixelRatio);
      const width = Math.max(rect.width, 1);
      const height = Math.max(rect.height, 1);

      resolution.set(width, height);
      commonVertexUniforms.uPixelRatio.value = pixelRatio;
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(width, height, false);
    };

    const render = () => {
      const now = performance.now();
      const delta = shouldReduceMotion ? 0 : (now - lastTime) * 0.001;
      lastTime = now;

      noiseUniforms.uTime.value += delta;
      uniforms.uTime.value += delta;
      const activeSettings = settingsRef.current;
      const transitionProgress =
        transitionStartRef.current === 0
          ? 1
          : (now - transitionStartRef.current) / paletteTransitionDurationMs;
      const loopPalette = mixPalette(
        transitionFromPaletteRef.current,
        transitionToPaletteRef.current,
        shouldReduceMotion ? 1 : transitionProgress,
      );
      currentPaletteRef.current = loopPalette;
      const activePalette = showControls
        ? palettes[activeSettings.palette]
        : loopPalette;

      noiseUniforms.uNoiseScaleX.value = activeSettings.noiseScaleX;
      noiseUniforms.uNoiseScaleY.value = activeSettings.noiseScaleY;
      noiseUniforms.uWarpSpeed.value = shouldReduceMotion
        ? 0
        : activeSettings.warpSpeed;
      uniforms.uWarpStrength.value = activeSettings.warpStrength;
      uniforms.uGrainStrength.value = activeSettings.grainStrength;
      uniforms.uFluteWidth.value = activeSettings.fluteWidth;
      uniforms.uFluteStrength.value = activeSettings.fluteStrength;
      uniforms.uToneMapExposure.value = activeSettings.patternBrightness;
      uniforms.uAlgo.value = activeSettings.algo;
      uniforms.uC1.value.set(
        activePalette[0][0],
        activePalette[0][1],
        activePalette[0][2],
      );
      uniforms.uC2.value.set(
        activePalette[1][0],
        activePalette[1][1],
        activePalette[1][2],
      );
      uniforms.uC3.value.set(
        activePalette[2][0],
        activePalette[2][1],
        activePalette[2][2],
      );
      uniforms.uC4.value.set(
        activePalette[3][0],
        activePalette[3][1],
        activePalette[3][2],
      );
      uniforms.uC5.value.set(
        activePalette[4][0],
        activePalette[4][1],
        activePalette[4][2],
      );

      renderer.setRenderTarget(noiseTarget);
      renderer.render(noiseScene, camera);
      renderer.setRenderTarget(null);
      renderer.render(scene, camera);

      animationFrame = requestAnimationFrame(render);
    };

    resize();
    render();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrame);
      mount.removeChild(renderer.domElement);
      noiseTarget.dispose();
      grainTexture.dispose();
      geometry.dispose();
      material.dispose();
      noiseMaterial.dispose();
      renderer.dispose();
    };
  }, [shouldReduceMotion]);

  return (
    <>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-30 [&_canvas]:h-full [&_canvas]:w-full"
        ref={mountRef}
      />
      {showControls ? (
        <div className="absolute right-4 top-24 z-30 w-[18rem] rounded-lg border border-white/15 bg-black/45 p-4 text-white shadow-2xl backdrop-blur-xl">
          <div className="mb-4 flex items-center justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
              Fractal Lab
            </p>
            <button
              className="rounded-full border border-white/15 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-white/80 transition hover:bg-white/10"
              onClick={() => updateSettings(defaultSettings)}
              type="button"
            >
              Reset
            </button>
          </div>

          <div className="mb-4 grid grid-cols-2 gap-3">
            <label className="grid gap-1 text-[0.68rem] uppercase tracking-[0.12em] text-white/60">
              Palette
              <select
                className="h-9 rounded-md border border-white/15 bg-black/55 px-2 text-xs normal-case tracking-normal text-white outline-none"
                onChange={updatePalette}
                value={settings.palette}
              >
                {Object.keys(palettes).map((paletteName) => (
                  <option key={paletteName} value={paletteName}>
                    {paletteName}
                  </option>
                ))}
              </select>
            </label>
            <label className="grid gap-1 text-[0.68rem] uppercase tracking-[0.12em] text-white/60">
              Algo
              <select
                className="h-9 rounded-md border border-white/15 bg-black/55 px-2 text-xs normal-case tracking-normal text-white outline-none"
                onChange={updateAlgo}
                value={settings.algo}
              >
                <option value={0}>Blobs</option>
                <option value={1}>Ellipses</option>
              </select>
            </label>
          </div>

          <div className="grid gap-4">
            {controlGroups.map((group) => (
              <div className="grid gap-3" key={group.title}>
                <p className="border-t border-white/10 pt-3 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/50">
                  {group.title}
                </p>
                {group.controls.map((control) => (
                  <label className="grid gap-1.5" key={control.key}>
                    <span className="flex items-center justify-between text-xs text-white/70">
                      {control.label}
                      <span className="font-mono text-white/50">
                        {settings[control.key].toFixed(
                          control.step < 0.01 ? 3 : control.step < 1 ? 2 : 0,
                        )}
                      </span>
                    </span>
                    <input
                      className="h-1.5 accent-white"
                      max={control.max}
                      min={control.min}
                      onChange={updateNumber(control.key)}
                      step={control.step}
                      type="range"
                      value={settings[control.key]}
                    />
                  </label>
                ))}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}
