/**
 * Narrow typing for `useGLTF` results: GLTF nodes are treated as meshes with buffer geometry,
 * while materials stay generic `Material` because Sketchfab exports mix shader types.
 */
import type { Material, Mesh, Object3D } from "three";

export type MacbookGLTF = {
  scene: Object3D;
  nodes: Record<string, Mesh>;
  materials: Record<string, Material>;
};
