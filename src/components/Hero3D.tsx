'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Objeto 3D do hero: uma malha (icosaedro) em wireframe laranja que se
 * deforma organicamente com ruído (parece um modelo 3D a ser esculpido) e
 * reage suavemente ao movimento do rato. Renderiza dentro do seu contentor
 * (não ocupa o ecrã todo). Tudo corre só no cliente, dentro do useEffect.
 */
export default function Hero3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    const isSmall = window.matchMedia('(max-width: 600px)').matches;

    let width = mount.clientWidth || 1;
    let height = mount.clientHeight || 1;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 3.2;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return; // sem WebGL → deixa o container vazio (sem quebrar)
    }
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isSmall ? 1.5 : 2));
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.display = 'block';

    // Malha base — icosaedro subdividido em wireframe (menos denso no mobile).
    const geometry = new THREE.IcosahedronGeometry(1.25, isSmall ? 6 : 10);

    const material = new THREE.ShaderMaterial({
      wireframe: true,
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
        uAmp: { value: 0.0 }, // sobe na entrada (fade-in da deformação)
        uColorCore: { value: new THREE.Color('#fb923c') }, // laranja claro
        uColorEdge: { value: new THREE.Color('#c2410c') }, // laranja escuro
      },
      vertexShader: /* glsl */ `
        uniform float uTime;
        uniform float uAmp;
        varying float vDisp;
        varying vec3 vNormal;

        // Simplex noise 3D (Ashima)
        vec3 mod289(vec3 x){ return x - floor(x*(1.0/289.0))*289.0; }
        vec4 mod289(vec4 x){ return x - floor(x*(1.0/289.0))*289.0; }
        vec4 permute(vec4 x){ return mod289(((x*34.0)+1.0)*x); }
        vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314*r; }
        float snoise(vec3 v){
          const vec2 C = vec2(1.0/6.0, 1.0/3.0);
          const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
          vec3 i  = floor(v + dot(v, C.yyy));
          vec3 x0 = v - i + dot(i, C.xxx);
          vec3 g = step(x0.yzx, x0.xyz);
          vec3 l = 1.0 - g;
          vec3 i1 = min(g.xyz, l.zxy);
          vec3 i2 = max(g.xyz, l.zxy);
          vec3 x1 = x0 - i1 + C.xxx;
          vec3 x2 = x0 - i2 + C.yyy;
          vec3 x3 = x0 - D.yyy;
          i = mod289(i);
          vec4 p = permute(permute(permute(
                    i.z + vec4(0.0, i1.z, i2.z, 1.0))
                  + i.y + vec4(0.0, i1.y, i2.y, 1.0))
                  + i.x + vec4(0.0, i1.x, i2.x, 1.0));
          float n_ = 0.142857142857;
          vec3 ns = n_ * D.wyz - D.xzx;
          vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
          vec4 x_ = floor(j * ns.z);
          vec4 y_ = floor(j - 7.0 * x_);
          vec4 x = x_ * ns.x + ns.yyyy;
          vec4 y = y_ * ns.x + ns.yyyy;
          vec4 h = 1.0 - abs(x) - abs(y);
          vec4 b0 = vec4(x.xy, y.xy);
          vec4 b1 = vec4(x.zw, y.zw);
          vec4 s0 = floor(b0)*2.0 + 1.0;
          vec4 s1 = floor(b1)*2.0 + 1.0;
          vec4 sh = -step(h, vec4(0.0));
          vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
          vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
          vec3 p0 = vec3(a0.xy, h.x);
          vec3 p1 = vec3(a0.zw, h.y);
          vec3 p2 = vec3(a1.xy, h.z);
          vec3 p3 = vec3(a1.zw, h.w);
          vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
          p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
          vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
          m = m*m;
          return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
        }

        void main(){
          vNormal = normal;
          float n = snoise(position * 1.5 + vec3(uTime * 0.35));
          vDisp = n;
          vec3 displaced = position + normal * n * 0.28 * uAmp;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        uniform vec3 uColorCore;
        uniform vec3 uColorEdge;
        varying float vDisp;
        varying vec3 vNormal;

        void main(){
          // Mais "quente" nas cristas da deformação.
          float t = clamp(vDisp * 0.5 + 0.5, 0.0, 1.0);
          vec3 color = mix(uColorEdge, uColorCore, t);
          // brilho extra nas pontas
          color += pow(t, 3.0) * 0.4;
          gl_FragColor = vec4(color, 0.92);
        }
      `,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Halo/glow por trás (sprite radial gerado em canvas).
    const glowTexture = makeGlowTexture();
    const glowMaterial = new THREE.SpriteMaterial({
      map: glowTexture,
      color: new THREE.Color('#f97316'),
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const glow = new THREE.Sprite(glowMaterial);
    glow.scale.set(5, 5, 1);
    glow.position.z = -1;
    scene.add(glow);

    // Interação com o mouse (tilt suave).
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    const onPointer = (e: PointerEvent) => {
      const r = mount.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      target.x = ((e.clientY - cy) / window.innerHeight) * 0.8;
      target.y = ((e.clientX - cx) / window.innerWidth) * 0.8;
    };
    window.addEventListener('pointermove', onPointer, { passive: true });

    // Resize com base no container.
    const resize = () => {
      width = mount.clientWidth || 1;
      height = mount.clientHeight || 1;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    let frame = 0;
    const start = performance.now();
    let amp = 0;

    // Pausa a renderização quando fora da tela ou com a aba oculta (poupa
    // bateria/CPU, importante no mobile).
    let active = false;
    let inView = true;
    let pageVisible = !document.hidden;

    const animate = () => {
      const t = (performance.now() - start) / 1000;
      material.uniforms.uTime.value = t;

      // fade-in da deformação
      amp += (1 - amp) * 0.02;
      material.uniforms.uAmp.value = amp;

      // rotação automática + tilt do mouse (lerp)
      current.x += (target.x - current.x) * 0.05;
      current.y += (target.y - current.y) * 0.05;
      mesh.rotation.x = current.x;
      mesh.rotation.y = t * 0.15 + current.y;

      renderer.render(scene, camera);
      frame = requestAnimationFrame(animate);
    };

    const startLoop = () => {
      if (active || reduceMotion) return;
      active = true;
      frame = requestAnimationFrame(animate);
    };
    const stopLoop = () => {
      if (!active) return;
      active = false;
      cancelAnimationFrame(frame);
    };
    const sync = () => {
      if (inView && pageVisible) startLoop();
      else stopLoop();
    };

    // Visibilidade na viewport
    const vis = new IntersectionObserver(
      ([e]) => {
        inView = e.isIntersecting;
        sync();
      },
      { threshold: 0 }
    );
    vis.observe(mount);

    // Visibilidade da aba
    const onVisibility = () => {
      pageVisible = !document.hidden;
      sync();
    };
    document.addEventListener('visibilitychange', onVisibility);

    if (reduceMotion) {
      material.uniforms.uAmp.value = 1;
      renderer.render(scene, camera); // quadro estático
    } else {
      startLoop();
    }

    return () => {
      stopLoop();
      window.removeEventListener('pointermove', onPointer);
      document.removeEventListener('visibilitychange', onVisibility);
      vis.disconnect();
      ro.disconnect();
      geometry.dispose();
      material.dispose();
      glowTexture.dispose();
      glowMaterial.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="hero3d" aria-hidden="true" />;
}

/** Textura radial (glow) gerada num canvas. */
function makeGlowTexture(): THREE.Texture {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const g = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2
  );
  g.addColorStop(0, 'rgba(255,255,255,0.9)');
  g.addColorStop(0.25, 'rgba(255,255,255,0.35)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}
