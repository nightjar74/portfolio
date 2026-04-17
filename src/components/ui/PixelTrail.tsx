/* eslint-disable react/no-unknown-property */
import React, { useEffect, useMemo } from "react";
import {
  Canvas,
  useThree,
  CanvasProps,
  ThreeEvent,
  useFrame,
} from "@react-three/fiber";
import { shaderMaterial, useTexture, useTrailTexture } from "@react-three/drei";
import * as THREE from "three";

import "./PixelTrail.css";

interface GooeyFilterProps {
  id?: string;
  strength?: number;
}

interface DotMaterialUniforms {
  resolution: THREE.Vector2;
  mouseTrail: THREE.Texture | null;
  gridSize: number;
  pixelColor: THREE.Color;
}

interface SceneProps {
  gridSize: number;
  trailSize: number;
  maxAge: number;
  interpolate: number;
  easingFunction: (x: number) => number;
  pixelColor: string;
  imgPath: string;
}

interface PixelTrailProps {
  gridSize?: number;
  trailSize?: number;
  maxAge?: number;
  interpolate?: number;
  easingFunction?: (x: number) => number;
  canvasProps?: Partial<CanvasProps>;
  glProps?: WebGLContextAttributes & { powerPreference?: string };
  gooeyFilter?: { id: string; strength: number };
  color?: string;
  className?: string;
  imgPath?: string;
}

const GooeyFilter: React.FC<GooeyFilterProps> = ({
  id = "goo-filter",
  strength = 10,
}) => {
  return (
    <svg className="goo-filter-container">
      <defs>
        <filter id={id}>
          <feGaussianBlur
            in="SourceGraphic"
            stdDeviation={strength}
            result="blur"
          />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
    </svg>
  );
};
/* ImageTrailMaterial is a custom shader material for rendering the pixel trail effect in dynamic color */
const ImageTrailMaterial = shaderMaterial(
  {
    uResolution: new THREE.Vector2(),
    uMouseTrail: null,
    uImage: null,
    uGridSize: 15,
  },
  /* vertex shader */
  `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
  /* fragment shader */
  `
  uniform vec2 uResolution;
  uniform sampler2D uMouseTrail;
  uniform sampler2D uImage;
  uniform float uGridSize;
  varying vec2 vUv;

void main() {
  vec2 gridUv = (floor(vUv * uGridSize) + 0.5) / uGridSize;
  float trail = texture2D(uMouseTrail, vUv).r;

  // Blend between smooth UV and snapped grid UV based on trail
  vec2 finalUv = mix(vUv, gridUv, trail);
  vec4 color = texture2D(uImage, finalUv);

  gl_FragColor = vec4(color.rgb, 1.0);
}
  `,
);

/* DotMaterial is a custom shader material for rendering the pixel trail effect in solid color */

const DotMaterial = shaderMaterial(
  {
    resolution: new THREE.Vector2(),
    mouseTrail: null,
    gridSize: 100,
    pixelColor: new THREE.Color("#ffffff"),
  },
  /* glsl vertex shader */ `
    varying vec2 vUv;
    void main() {
      gl_Position = vec4(position.xy, 0.0, 1.0);
    }
  `,
  /* glsl fragment shader */ `
    uniform vec2 resolution;
    uniform sampler2D mouseTrail;
    uniform float gridSize;
    uniform vec3 pixelColor;

    vec2 coverUv(vec2 uv) {
      vec2 s = resolution.xy / max(resolution.x, resolution.y);
      vec2 newUv = (uv - 0.5) * s + 0.5;
      return clamp(newUv, 0.0, 1.0);
    }

    float sdfCircle(vec2 p, float r) {
        return length(p - 0.5) - r;
    }

    void main() {
      vec2 screenUv = gl_FragCoord.xy / resolution;
      vec2 uv = coverUv(screenUv);

      vec2 gridUv = fract(uv * gridSize);
      vec2 gridUvCenter = (floor(uv * gridSize) + 0.5) / gridSize;
      

      float trail = texture2D(mouseTrail, gridUvCenter).r;

      gl_FragColor = vec4(pixelColor, trail);
    }
  `,
);

function Scene({
  imgPath,
  gridSize,
  trailSize,
  maxAge,
  interpolate,
  easingFunction,
  pixelColor,
}: SceneProps) {
  // get texture from image path if provided, otherwise use a default white texture
  const texture = useTexture(imgPath);
  console.log("Loaded texture:", texture);

  useEffect(() => {
    console.log("texture image:", texture?.image);
  }, [texture]);

  // This ensures the texture is crisp for the pixel effect
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;

  const size = useThree((s) => s.size);
  const viewport = useThree((s) => s.viewport);

  //const dotMaterial = useMemo(() => new ImageTrailMaterial(), []);
  const dotMaterial = useMemo(() => {
    const mat = new ImageTrailMaterial();
    mat.uniforms.uImage.value = texture;
    mat.uniforms.uGridSize.value = gridSize;
    return mat;
  }, [texture, gridSize]);
  //dotMaterial.uniforms.pixelColor.value = new THREE.Color(pixelColor);
  useFrame(() => {
    if (dotMaterial.uniforms.uMouseTrail) {
      dotMaterial.uniforms.uMouseTrail.value = trail;
    }
  });

  const [trail, onMove] = useTrailTexture({
    size: 512,
    radius: trailSize,
    maxAge: maxAge,
    interpolate: interpolate || 0.1,
    ease: easingFunction || ((x: number) => x),
  }) as [THREE.Texture | null, (e: ThreeEvent<PointerEvent>) => void];

  const handleMove = (e: ThreeEvent<PointerEvent>) => {
    console.log("pointer move fired", e.uv);
    onMove(e);
  };

  if (trail) {
    trail.minFilter = THREE.NearestFilter;
    trail.magFilter = THREE.NearestFilter;
    trail.wrapS = THREE.ClampToEdgeWrapping;
    trail.wrapT = THREE.ClampToEdgeWrapping;
  }

  //const scale = Math.max(viewport.width, viewport.height) / 2;

  return (
    <mesh
      /* scale={[scale, scale, 1]} */ onPointerMove={handleMove}
      position={[0, 0, 0]}
      scale={[viewport.width / 2, viewport.height / 2, 1]}
      renderOrder={1}
    >
      <planeGeometry args={[2, 2]} />
      <primitive
        object={dotMaterial}
        //uImage={texture}
        //uGridSize={gridSize}
        uResolution={[size.width * viewport.dpr, size.height * viewport.dpr]}
        //uMouseTrail={trail}
      />
    </mesh>
  );
}

export default function PixelTrail({
  gridSize = 15,
  trailSize = 0.2,
  maxAge = 1000,
  interpolate = 5,
  easingFunction = (x: number) => x,
  canvasProps = {},
  glProps = {
    antialias: false,
    powerPreference: "high-performance",
    alpha: true,
  },
  gooeyFilter,
  color = "#000000",
  className = "",
  imgPath = "/images/gallery/horizontal-1.jpg",
}: PixelTrailProps) {
  return (
    <>
      {gooeyFilter && (
        <GooeyFilter id={gooeyFilter.id} strength={gooeyFilter.strength} />
      )}
      <Canvas
        {...canvasProps}
        gl={glProps}
        orthographic
        className={`pixel-canvas ${className}`}
        style={gooeyFilter ? { filter: `url(#${gooeyFilter.id})` } : undefined}
      >
        <Scene
          imgPath={imgPath}
          gridSize={gridSize}
          trailSize={trailSize}
          maxAge={maxAge}
          interpolate={interpolate}
          easingFunction={easingFunction}
          pixelColor={color}
        />
      </Canvas>
    </>
  );
}
