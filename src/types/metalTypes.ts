export interface Material {
  name: string;
  density: number;
}

export interface Shape {
  id: string;
  name: string;
  requiredParams: string[];
  formula: string;
  materials: Material[];
}

export interface MetalState {
  shapes: Shape[];
  loading: boolean;
  error: string | null;
  selectedShape: Shape | null;
  selectedMaterial: Material | null;
}