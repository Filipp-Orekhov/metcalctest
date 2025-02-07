export interface Shape {
  id: string;
  formula: string;
  requiredParams: string[];
}

export interface Material {
  density: number;
}

export type ParamsType = Record<string, string>;

export const labelMap: Record<string, string> = {
  firstSide: "Сторона 1, мм",
  secondSide: "Сторона 2, мм",
  diameter: "Диаметр, мм",
  thickness: "Толщина стенки, мм",
  materialLength: "Длина, м",
};