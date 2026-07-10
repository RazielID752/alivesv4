"use client";

import { type MotionValue, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import {
  AmbientLight,
  BoxGeometry,
  Color,
  CylinderGeometry,
  DirectionalLight,
  Group,
  Mesh,
  MeshPhysicalMaterial,
  PCFSoftShadowMap,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  SphereGeometry,
  TorusGeometry,
  WebGLRenderer,
} from "three";

type HeroWebGLSceneProps = Readonly<{
  scrollProgress: MotionValue<number>;
}>;

export function HeroWebGLScene({ scrollProgress }: HeroWebGLSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const mount = mountRef.current;

    if (!mount) {
      return;
    }

    const scene = new Scene();
    scene.background = null;

    const camera = new PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0.35, 0.25, 8.2);

    const renderer = new WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFSoftShadowMap;
    mount.appendChild(renderer.domElement);

    const group = new Group();
    scene.add(group);

    const darkMaterial = new MeshPhysicalMaterial({
      color: new Color("#111113"),
      metalness: 0.55,
      roughness: 0.38,
      clearcoat: 0.35,
      clearcoatRoughness: 0.3,
    });
    const blueMaterial = new MeshPhysicalMaterial({
      color: new Color("#275cff"),
      emissive: new Color("#1d4ed8"),
      emissiveIntensity: 0.6,
      metalness: 0.2,
      roughness: 0.28,
      transmission: 0.08,
    });
    const amberMaterial = new MeshPhysicalMaterial({
      color: new Color("#f4a340"),
      emissive: new Color("#f59e0b"),
      emissiveIntensity: 0.22,
      metalness: 0.4,
      roughness: 0.34,
    });

    const arch = new Mesh(
      new TorusGeometry(1.78, 0.45, 42, 96, Math.PI),
      darkMaterial,
    );
    arch.rotation.set(0, Math.PI * 0.5, 0);
    arch.position.set(0.75, 0.5, 0);
    arch.castShadow = true;
    group.add(arch);

    const portal = new Mesh(
      new CylinderGeometry(1.2, 1.2, 0.18, 72),
      blueMaterial,
    );
    portal.rotation.set(Math.PI * 0.5, 0, 0);
    portal.position.set(0.62, 0.15, -0.3);
    portal.castShadow = true;
    group.add(portal);

    const slab = new Mesh(new BoxGeometry(3.9, 0.28, 1.45), darkMaterial);
    slab.position.set(-0.1, -1.32, 0.4);
    slab.rotation.set(0, -0.24, 0);
    slab.castShadow = true;
    slab.receiveShadow = true;
    group.add(slab);

    const wall = new Mesh(new BoxGeometry(1.04, 2.55, 0.4), darkMaterial);
    wall.position.set(-0.8, -0.15, 0.3);
    wall.rotation.set(0, -0.08, 0);
    wall.castShadow = true;
    group.add(wall);

    const ramp = new Mesh(new BoxGeometry(2.75, 0.2, 0.52), darkMaterial);
    ramp.position.set(1.25, -0.58, 0.85);
    ramp.rotation.set(0.1, -0.62, 0.03);
    ramp.castShadow = true;
    group.add(ramp);

    const orb = new Mesh(new SphereGeometry(0.36, 48, 48), amberMaterial);
    orb.position.set(-1.8, -0.75, 0.95);
    orb.castShadow = true;
    group.add(orb);

    const floor = new Mesh(
      new PlaneGeometry(8, 5),
      new MeshPhysicalMaterial({
        color: new Color("#08080a"),
        metalness: 0.15,
        roughness: 0.6,
      }),
    );
    floor.rotation.x = -Math.PI * 0.5;
    floor.position.y = -1.52;
    floor.receiveShadow = true;
    scene.add(floor);

    scene.add(new AmbientLight("#ffffff", 1.6));

    const keyLight = new DirectionalLight("#ffffff", 3.2);
    keyLight.position.set(-3, 4, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(1024, 1024);
    scene.add(keyLight);

    const blueLight = new DirectionalLight("#3868ff", 4);
    blueLight.position.set(3, 1.5, 2);
    scene.add(blueLight);

    const amberLight = new DirectionalLight("#f59e0b", 2.6);
    amberLight.position.set(-2, -0.5, 3);
    scene.add(amberLight);

    let animationFrame = 0;
    let scrollValue = scrollProgress.get();
    let width = 1;
    let height = 1;

    const resize = () => {
      const rect = mount.getBoundingClientRect();
      width = Math.max(rect.width, 1);
      height = Math.max(rect.height, 1);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    const unsubscribe = scrollProgress.on("change", (value) => {
      scrollValue = value;
    });

    const render = () => {
      const time = performance.now() * 0.001;
      const motionScale = prefersReducedMotion ? 0 : 1;
      const scrollRotation = (scrollValue - 0.15) * motionScale;

      group.rotation.y = -0.42 + scrollRotation * 1.35;
      group.rotation.x = -0.04 + scrollRotation * 0.32;
      group.position.y = -0.06 + scrollValue * 0.72 * motionScale;
      group.position.x = Math.sin(time * 0.35) * 0.035 * motionScale;

      portal.rotation.z = time * 0.16 * motionScale + scrollValue * 1.5;
      orb.position.y = -0.75 + Math.sin(time * 1.1) * 0.08 * motionScale;
      orb.position.x = -1.8 + scrollValue * 0.45 * motionScale;

      camera.position.z = 8.2 - scrollValue * 0.8 * motionScale;
      camera.lookAt(0.15, -0.2, 0);
      renderer.render(scene, camera);
      animationFrame = requestAnimationFrame(render);
    };

    resize();
    render();
    window.addEventListener("resize", resize);

    return () => {
      unsubscribe();
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrame);
      mount.removeChild(renderer.domElement);
      renderer.dispose();

      for (const mesh of [arch, portal, slab, wall, ramp, orb, floor]) {
        mesh.geometry.dispose();
      }

      darkMaterial.dispose();
      blueMaterial.dispose();
      amberMaterial.dispose();
    };
  }, [prefersReducedMotion, scrollProgress]);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 [&_canvas]:h-full [&_canvas]:w-full"
      aria-hidden="true"
    />
  );
}
