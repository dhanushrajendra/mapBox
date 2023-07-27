import React, { useEffect, useRef } from 'react';
import * as BABYLON from 'babylonjs';

const Cuboid = ({ textureUrl }) => {
  const canvasRef = useRef(null);
  const engine = useRef(null);
  const scene = useRef(null);
  const camera = useRef(null);
  const box = useRef(null);

  useEffect(() => {
    
    if (!engine.current) {
      engine.current = new BABYLON.Engine(canvasRef.current, true);
      scene.current = new BABYLON.Scene(engine.current);
      camera.current = new BABYLON.ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 2.5, 5, new BABYLON.Vector3(0, 0, 0), scene.current);
      camera.current.attachControl(canvasRef.current, true);
      box.current = BABYLON.MeshBuilder.CreateBox('box', { size: 1 }, scene.current);
    }

    
    const material = new BABYLON.StandardMaterial('textureMaterial', scene.current);
    material.diffuseTexture = new BABYLON.Texture(textureUrl, scene.current);
    box.current.material = material;

    engine.current.runRenderLoop(() => {
      scene.current.render();
    });

    return () => {
      scene.current.dispose();
      engine.current.dispose();
    };
  }, [textureUrl]);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '400px' }} />;
};

export default Cuboid;
