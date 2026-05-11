import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

/* ---------- helpers ---------- */

function smoothstep(e0: number, e1: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
}
function range(p: number, a: number, b: number) {
  return smoothstep(a, (a + b) / 2, p) * (1 - smoothstep((a + b) / 2, b, p));
}

/* ---------- snow ---------- */

function Snow({ count = 1200 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null!);
  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = Math.random() * 30 - 5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
      speeds[i] = 0.4 + Math.random() * 1.2;
    }
    return { positions, speeds };
  }, [count]);

  useFrame((_, dt) => {
    const arr = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] -= speeds[i] * dt * 0.6;
      arr[i * 3 + 0] += Math.sin(performance.now() * 0.0003 + i) * dt * 0.05;
      if (arr[i * 3 + 1] < -8) arr[i * 3 + 1] = 22;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#f5ecd6"
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ---------- coat silhouette (extruded profile) ---------- */

function buildCoatShape() {
  const s = new THREE.Shape();
  // Half outline (right side), then mirror via lineTo back
  s.moveTo(0, 3.2);
  s.lineTo(0.55, 3.25);
  s.lineTo(1.1, 3.0);
  s.lineTo(1.6, 2.6);   // shoulder
  s.lineTo(2.4, 2.3);   // sleeve top
  s.lineTo(2.55, 1.0);
  s.lineTo(2.45, -0.8); // sleeve cuff
  s.lineTo(1.9, -0.85);
  s.lineTo(1.7, 1.0);
  s.lineTo(1.5, 1.6);   // armpit
  s.lineTo(1.55, 0.0);
  s.lineTo(1.85, -3.6); // hem right
  s.lineTo(0, -3.7);
  // mirror
  s.lineTo(-1.85, -3.6);
  s.lineTo(-1.55, 0.0);
  s.lineTo(-1.5, 1.6);
  s.lineTo(-1.7, 1.0);
  s.lineTo(-1.9, -0.85);
  s.lineTo(-2.45, -0.8);
  s.lineTo(-2.55, 1.0);
  s.lineTo(-2.4, 2.3);
  s.lineTo(-1.6, 2.6);
  s.lineTo(-1.1, 3.0);
  s.lineTo(-0.55, 3.25);
  s.lineTo(0, 3.2);
  return s;
}

function Coat({ progress }: { progress: () => number }) {
  const group = useRef<THREE.Group>(null!);
  const geo = useMemo(
    () =>
      new THREE.ExtrudeGeometry(buildCoatShape(), {
        depth: 0.6,
        bevelEnabled: true,
        bevelThickness: 0.08,
        bevelSize: 0.08,
        bevelSegments: 4,
        curveSegments: 24,
      }),
    [],
  );

  useEffect(() => {
    geo.center();
    geo.computeVertexNormals();
  }, [geo]);

  useFrame((_, dt) => {
    const p = progress();
    // Visible during scene 2 → 4
    const vis = smoothstep(0.22, 0.36, p) * (1 - smoothstep(0.92, 1.0, p));
    const g = group.current;
    g.rotation.y += dt * 0.18;
    const targetY = THREE.MathUtils.lerp(-0.6, 0.2, smoothstep(0.3, 0.7, p));
    g.position.y = THREE.MathUtils.lerp(g.position.y, targetY, 0.05);
    const targetScale = THREE.MathUtils.lerp(0.85, 1.15, smoothstep(0.3, 0.85, p)) * vis;
    g.scale.setScalar(THREE.MathUtils.lerp(g.scale.x, targetScale, 0.08));
  });

  return (
    <group ref={group} scale={0}>
      <mesh geometry={geo} castShadow receiveShadow>
        <meshStandardMaterial
          color="#1a1d24"
          roughness={0.85}
          metalness={0.05}
          envMapIntensity={0.6}
        />
      </mesh>
      {/* gold thread accent */}
      <mesh geometry={geo} scale={1.002}>
        <meshBasicMaterial color="#caa15a" wireframe transparent opacity={0.06} />
      </mesh>
    </group>
  );
}

/* ---------- floating typography ---------- */

function FloatingWord({
  text,
  position,
  show,
  italic = false,
  size = 0.55,
}: {
  text: string;
  position: [number, number, number];
  show: () => number;
  italic?: boolean;
  size?: number;
}) {
  const ref = useRef<THREE.Group>(null!);
  useFrame(({ mouse }) => {
    const v = show();
    ref.current.position.x = position[0] + mouse.x * position[2] * 0.15;
    ref.current.position.y =
      position[1] + Math.sin(performance.now() * 0.0006 + position[0]) * 0.08 + mouse.y * 0.1;
    const s = THREE.MathUtils.lerp(ref.current.scale.x, v, 0.08);
    ref.current.scale.setScalar(s);
  });
  return (
    <group ref={ref} position={position} scale={0}>
      <Text
        fontSize={size}
        color="#f0e6cf"
        anchorX="center"
        anchorY="middle"
        letterSpacing={italic ? 0.02 : 0.18}
        fontStyle={italic ? "italic" : "normal"}
        material-toneMapped={false}
      >
        {text}
      </Text>
    </group>
  );
}

/* ---------- camera + mouse parallax ---------- */

function Rig({ progress }: { progress: () => number }) {
  const { camera } = useThree();
  const target = useMemo(() => new THREE.Vector3(0, 0, 0), []);
  useFrame(({ mouse }, dt) => {
    const p = progress();
    // Camera dolly through scenes
    const z = THREE.MathUtils.lerp(11, 5.5, smoothstep(0.25, 0.55, p)) +
              THREE.MathUtils.lerp(0, 2.5, smoothstep(0.75, 1, p));
    const y = THREE.MathUtils.lerp(0.4, -0.2, smoothstep(0.3, 0.8, p));
    const tx = mouse.x * 0.6;
    const ty = mouse.y * 0.4;
    camera.position.x += (tx - camera.position.x) * 0.04;
    camera.position.y += (y + ty - camera.position.y) * 0.04;
    camera.position.z += (z - camera.position.z) * 0.05;
    camera.lookAt(target);
  });
  return null;
}

/* ---------- main ---------- */

export function ImmersiveScene() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const [mounted, setMounted] = useState(false);
  const [overlay, setOverlay] = useState({ p: 0 });

  useEffect(() => {
    setMounted(true);
    let raf = 0;
    const update = () => {
      const el = sectionRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        const p = Math.min(1, Math.max(0, -rect.top / Math.max(1, total)));
        progressRef.current = p;
        setOverlay((o) => (Math.abs(o.p - p) > 0.002 ? { p } : o));
      }
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, []);

  const p = overlay.p;

  // Overlay scene visibilities
  const s1 = range(p, 0.0, 0.22);   // opening quote
  const s4Cta = smoothstep(0.82, 0.97, p);

  return (
    <section
      ref={sectionRef}
      id="canvas-scene"
      className="relative w-full"
      style={{ height: "500vh", background: "#0a0c12" }}
    >
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden"
      >
        {/* WebGL */}
        {mounted && (
          <Canvas
            shadows
            dpr={[1, 1.75]}
            gl={{ antialias: true, powerPreference: "high-performance" }}
            camera={{ position: [0, 0.4, 11], fov: 38 }}
          >
            <color attach="background" args={["#0a0c12"]} />
            <fog attach="fog" args={["#0a0c12", 6, 22]} />

            <ambientLight intensity={0.25} />
            <directionalLight
              position={[-4, 6, 5]}
              intensity={0.8}
              color="#dfe3ec"
              castShadow
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
            />
            <spotLight
              position={[6, 4, 6]}
              angle={0.5}
              penumbra={0.8}
              intensity={1.6}
              color="#caa15a"
              distance={25}
            />
            <pointLight position={[0, -3, 4]} intensity={0.4} color="#caa15a" />

            <Suspense fallback={null}>
              <Snow />
              <Coat progress={() => progressRef.current} />

              {/* Floating words — scene 3 */}
              <FloatingWord
                text="Cashmere"
                position={[-3.4, 1.6, -1.5]}
                show={() => range(progressRef.current, 0.5, 0.78)}
                italic
                size={0.7}
              />
              <FloatingWord
                text="Tailored"
                position={[3.2, 0.8, -2]}
                show={() => range(progressRef.current, 0.52, 0.8)}
                size={0.6}
              />
              <FloatingWord
                text="Private Atelier"
                position={[-2.6, -1.4, 1]}
                show={() => range(progressRef.current, 0.55, 0.82)}
                italic
                size={0.55}
              />
              <FloatingWord
                text="Crafted by Hand"
                position={[2.6, -1.8, 0.5]}
                show={() => range(progressRef.current, 0.58, 0.84)}
                size={0.5}
              />

              <Rig progress={() => progressRef.current} />
            </Suspense>
          </Canvas>
        )}

        {/* Cinematic overlays: vignette + grain */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.75) 100%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.9'/></svg>\")",
          }}
        />

        {/* Top meta */}
        <div className="absolute top-6 md:top-10 inset-x-0 flex items-center justify-between px-6 md:px-12 text-[10px] tracking-[0.4em] uppercase text-ivory/45 z-10">
          <span>Scene · {String(Math.min(4, Math.floor(p * 4) + 1)).padStart(2, "0")} / 04</span>
          <span>Maison Nord · Cinematic</span>
        </div>

        {/* Scene 1 — opening quote */}
        <div
          className="absolute inset-0 flex items-center justify-center px-6 z-10 pointer-events-none"
          style={{ opacity: s1 }}
        >
          <p className="font-serif italic text-3xl md:text-6xl text-ivory text-center max-w-4xl leading-tight">
            “Winter is not weather.
            <br />
            It is <span className="text-primary">presence.</span>”
          </p>
        </div>

        {/* Scene 4 — CTA */}
        <div
          className="absolute inset-x-0 bottom-20 md:bottom-28 flex flex-col items-center justify-center z-10"
          style={{ opacity: s4Cta, transform: `translateY(${(1 - s4Cta) * 20}px)` }}
        >
          <p className="text-[11px] tracking-[0.5em] uppercase text-primary mb-6">
            The Reveal
          </p>
          <a
            href="#collection"
            className="group inline-flex items-center gap-4 border border-ivory/40 text-ivory px-10 py-5 text-[12px] tracking-[0.4em] uppercase hover:border-primary hover:text-primary transition-colors backdrop-blur-sm bg-background/20"
            style={{ pointerEvents: s4Cta > 0.5 ? "auto" : "none" }}
          >
            Enter The Collection
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 right-6 md:right-12 text-[10px] tracking-[0.4em] uppercase text-ivory/40 z-10 tabular-nums">
          {String(Math.round(p * 100)).padStart(3, "0")} / 100
        </div>
      </div>
    </section>
  );
}