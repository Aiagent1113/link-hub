"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Scene3D() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // 1. WebGL Renderer with High Precision
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    // 2. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 7;

    // 3. Volumetric Lights & Floating Orbs
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x00f0ff, 3.5, 15);
    cyanLight.position.set(-3, 3, 2);
    scene.add(cyanLight);

    const violetLight = new THREE.PointLight(0x9333ea, 4.0, 15);
    violetLight.position.set(3, -2, 2);
    scene.add(violetLight);

    const emeraldLight = new THREE.PointLight(0x10b981, 2.5, 12);
    emeraldLight.position.set(0, 4, -1);
    scene.add(emeraldLight);

    // 4. Central Spatial Jewel: Iridescent Core & Gyroscope Rings
    const groupCenter = new THREE.Group();
    scene.add(groupCenter);

    // Central Faceted Icosahedron (Floating Holographic Gem)
    const gemGeo = new THREE.IcosahedronGeometry(1.2, 0);
    const gemMat = new THREE.MeshPhysicalMaterial({
      color: 0x00f0ff,
      emissive: 0x0a1d30,
      emissiveIntensity: 0.6,
      roughness: 0.1,
      metalness: 0.9,
      transmission: 0.6,
      ior: 1.5,
      transparent: true,
      opacity: 0.75,
    });
    const gemMesh = new THREE.Mesh(gemGeo, gemMat);
    groupCenter.add(gemMesh);

    // Inner Glowing Wireframe Gem
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x7000ff,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const wireMesh = new THREE.Mesh(gemGeo, wireMat);
    wireMesh.scale.set(1.02, 1.02, 1.02);
    groupCenter.add(wireMesh);

    // Gyroscope Orbital Ring 1
    const ring1Geo = new THREE.TorusGeometry(1.9, 0.02, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.5,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    groupCenter.add(ring1);

    // Gyroscope Orbital Ring 2
    const ring2Geo = new THREE.TorusGeometry(2.2, 0.015, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0xec4899,
      transparent: true,
      opacity: 0.4,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = Math.PI / 3;
    groupCenter.add(ring2);

    // Gyroscope Orbital Ring 3
    const ring3Geo = new THREE.TorusGeometry(2.5, 0.02, 16, 100);
    const ring3Mat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.45,
    });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.y = Math.PI / 4;
    groupCenter.add(ring3);

    // 5. Orbiting Quantum Nodes
    const satelliteGeo = new THREE.SphereGeometry(0.12, 16, 16);
    const satelliteMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
    const satellite = new THREE.Mesh(satelliteGeo, satelliteMat);
    scene.add(satellite);

    // 6. 140 Floating Cosmic Dust Particles
    const particleCount = 140;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 18;
      positions[i + 1] = (Math.random() - 0.5) * 18;
      positions[i + 2] = (Math.random() - 0.5) * 12 - 1;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0x00f0ff,
      size: 0.065,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 7. Mouse Parallax Motion Tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // 8. 60 FPS Render Loop with Harmonic Motion
    let frameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Smooth lerp towards cursor
      targetX += (mouseX - targetX) * 0.04;
      targetY += (mouseY - targetY) * 0.04;

      // Centerpiece Gyroscope Rotation
      groupCenter.rotation.x = time * 0.15 + targetY * 0.4;
      groupCenter.rotation.y = time * 0.22 + targetX * 0.4;
      groupCenter.position.y = Math.sin(time * 0.9) * 0.25;

      ring1.rotation.z = time * 0.3;
      ring2.rotation.x = time * 0.25;
      ring3.rotation.y = time * 0.2;

      // Orbiting Satellite Physics
      satellite.position.x = Math.sin(time * 1.2) * 3.2;
      satellite.position.y = Math.cos(time * 1.2) * 2.2 + Math.sin(time * 2) * 0.3;
      satellite.position.z = Math.sin(time * 0.8) * 1.8;

      // Ambient Lights movement
      cyanLight.position.x = -3 + Math.sin(time * 0.8) * 1.5;
      cyanLight.position.y = 3 + Math.cos(time * 0.8) * 1.5;
      violetLight.position.x = 3 + Math.cos(time * 0.7) * 1.5;
      violetLight.position.y = -2 + Math.sin(time * 0.7) * 1.5;

      // Cosmic dust slow rotation
      particles.rotation.y = time * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      gemGeo.dispose();
      gemMat.dispose();
      ring1Geo.dispose();
      ring2Geo.dispose();
      ring3Geo.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none w-full h-full opacity-80"
    />
  );
}
