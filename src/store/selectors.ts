import { RootState } from "./store";


export const getShapes = (state: RootState) => state.metal.shapes;
export const getSelectedShape = (state: RootState) => state.metal.selectedShape;
export const getSelectedMaterial = (state: RootState) => state.metal.selectedMaterial;
