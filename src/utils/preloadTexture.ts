import * as THREE from "three";

const PreloadTexture = (url: string): Promise<THREE.Texture> => {
  return new Promise((resolve, reject) => {
    new THREE.TextureLoader().load(url, resolve, undefined, reject);
  });
};

export default PreloadTexture;
