import type { Material, Mesh, Object3D } from "three";

export type MacbookGLTF = {
  scene: Object3D;
  nodes: Record<string, Mesh>;
  materials: Record<string, Material>;
};
