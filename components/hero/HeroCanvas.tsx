"use client";

import { OrthographicCamera } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { type MotionValue, useMotionValueEvent } from "framer-motion";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type HeroCanvasProps = Readonly<{
  scrollProgress: MotionValue<number>;
}>;

const LINE_COUNT = 78;
const POINT_COUNT = 240;
const TWO_PI = Math.PI * 2;

function mixColor(a: THREE.Color, b: THREE.Color, amount: number) {
  return a.clone().lerp(b, THREE.MathUtils.clamp(amount, 0, 1));
}

function waveY(x: number, time: number, layer: number, scroll: number) {
  const main = Math.sin((x * 0.31 + time * 0.09 + scroll * 0.2) * TWO_PI);
  const secondary = Math.sin((x * 0.13 - time * 0.06 + layer * 0.18) * TWO_PI);
  const fine = Math.sin(x * 0.72 + time * 0.22 + layer * 0.9);

  return main * 0.72 + secondary * 0.18 + fine * 0.018;
}

function colorAt(pointProgress: number, layerProgress: number) {
  const shadow = new THREE.Color("#05061c");
  const indigo = new THREE.Color("#10186f");
  const blue = new THREE.Color("#2854ff");
  const cyan = new THREE.Color("#18b8df");
  const white = new THREE.Color("#fff7ff");
  const silver = new THREE.Color("#d8d4e3");
  const lilac = new THREE.Color("#d7a8ff");
  const magenta = new THREE.Color("#d315c5");
  const plum = new THREE.Color("#4b1769");

  const topLayer = THREE.MathUtils.smoothstep(0.5, 0, layerProgress);
  const lowerLayer = THREE.MathUtils.smoothstep(layerProgress, 0.42, 1);
  const centerWhite =
    smoothBand(pointProgress, 0.28, 0.34) * 0.82 +
    smoothBand(pointProgress, 0.62, 0.38) * 0.72;
  const cyanMid = smoothBand(pointProgress, 0.47, 0.3);
  const leftMagenta = smoothBand(pointProgress, 0.12, 0.2);
  const rightMagenta = smoothBand(pointProgress, 0.86, 0.19);
  const farBlue =
    smoothBand(pointProgress, 0.02, 0.25) +
    smoothBand(pointProgress, 0.98, 0.25);

  let color = mixColor(shadow, indigo, 0.55 + farBlue * 0.28);
  color = mixColor(color, plum, lowerLayer * 0.34);
  color = mixColor(color, blue, farBlue * 0.45);
  color = mixColor(color, cyan, cyanMid * (0.48 + topLayer * 0.34));
  color = mixColor(color, magenta, (leftMagenta + rightMagenta) * 0.72);
  color = mixColor(color, lilac, centerWhite * 0.42);
  color = mixColor(color, silver, centerWhite * 0.48);
  color = mixColor(color, white, centerWhite * topLayer * 0.76);
  color.multiplyScalar(0.72 + topLayer * 0.45 - lowerLayer * 0.2);

  return color;
}

function smoothBand(value: number, center: number, width: number) {
  const distance = Math.abs(value - center);
  return 1 - THREE.MathUtils.smoothstep(distance, width * 0.35, width);
}

function WaveLine({
  index,
  scroll,
}: Readonly<{
  index: number;
  scroll: React.MutableRefObject<number>;
}>) {
  const lineRef = useRef<THREE.Line>(null);
  const { viewport } = useThree();
  const layer = index / (LINE_COUNT - 1);
  const geometry = useMemo(() => {
    const positions = new Float32Array(POINT_COUNT * 3);
    const colors = new Float32Array(POINT_COUNT * 3);
    const geometryInstance = new THREE.BufferGeometry();

    for (let pointIndex = 0; pointIndex < POINT_COUNT; pointIndex++) {
      const progress = pointIndex / (POINT_COUNT - 1);
      const color = colorAt(progress, layer);
      const colorOffset = pointIndex * 3;

      colors[colorOffset] = color.r;
      colors[colorOffset + 1] = color.g;
      colors[colorOffset + 2] = color.b;
    }

    geometryInstance.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3),
    );
    geometryInstance.setAttribute(
      "color",
      new THREE.BufferAttribute(colors, 3),
    );

    return geometryInstance;
  }, [layer]);
  const material = useMemo(() => {
    const opacity =
      0.08 + (1 - Math.abs(layer - 0.16) * 1.5) * 0.5 + (1 - layer) * 0.28;

    return new THREE.LineBasicMaterial({
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: THREE.MathUtils.clamp(opacity, 0.06, 0.84),
      transparent: true,
      vertexColors: true,
    });
  }, [layer]);

  useFrame(({ clock }) => {
    const position = geometry.getAttribute("position") as THREE.BufferAttribute;
    const time = clock.getElapsedTime();
    const width = viewport.width * 1.2;
    const startX = -width / 2;
    const lineOffset = (layer - 0.08) * -2.05;
    const perspective = 0.82 + layer * 0.16;
    const verticalBase = -viewport.height * 0.34;

    for (let pointIndex = 0; pointIndex < POINT_COUNT; pointIndex++) {
      const progress = pointIndex / (POINT_COUNT - 1);
      const x = startX + progress * width;
      const normalizedX = progress * 3.7 - 1.85;
      const y =
        verticalBase +
        waveY(normalizedX, time, layer, scroll.current) * perspective +
        lineOffset;
      const z = -layer * 0.08;
      const offset = pointIndex * 3;

      position.array[offset] = x;
      position.array[offset + 1] = y;
      position.array[offset + 2] = z;
    }

    position.needsUpdate = true;

    if (lineRef.current) {
      lineRef.current.rotation.z = Math.sin(time * 0.12) * 0.006;
      lineRef.current.position.y = scroll.current * -0.28;
    }
  });

  return (
    <primitive object={new THREE.Line(geometry, material)} ref={lineRef} />
  );
}

function WaveField({ scrollProgress }: HeroCanvasProps) {
  const scroll = useRef(0);
  const lines = useMemo(
    () => Array.from({ length: LINE_COUNT }, (_, index) => index),
    [],
  );

  useMotionValueEvent(scrollProgress, "change", (latest) => {
    scroll.current = latest;
  });

  return (
    <>
      <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={92} />
      <group>
        {lines.map((index) => (
          <WaveLine index={index} key={index} scroll={scroll} />
        ))}
      </group>
    </>
  );
}

export function HeroCanvas({ scrollProgress }: HeroCanvasProps) {
  return (
    <Canvas
      className="pointer-events-none absolute inset-0"
      dpr={[1, 1.7]}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      }}
    >
      <color args={["#000000"]} attach="background" />
      <WaveField scrollProgress={scrollProgress} />
    </Canvas>
  );
}
