import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "../../styles/globals.scss";
import style from "./style.module.scss";
import { getSelectedShape, getSelectedMaterial } from "../../store/selectors";
import InputField from "./InputField.tsx";
import { labelMap } from '../../types';



const Calculator = () => {
  const selectedShape = useSelector(getSelectedShape);
  const selectedMaterial = useSelector(getSelectedMaterial);

  type ParamsType = Record<string, string>;

  const [params, setParams] = useState<ParamsType>({});

  useEffect(() => {
    setParams({});
  }, [selectedShape]);

  if (!selectedShape || !selectedMaterial || !selectedShape.requiredParams) return null;

  const handleInputChange = (key: string, value: string) => {
    if (value === "" || (/^\d*\.?\d*$/.test(value) && Number(value) > 0)) {
      setParams((prev) => ({ ...prev, [key]: value }));
    }
  };

  const calculateWeight = (): string => {
    try {
      const formula = selectedShape.formula
        .replace(/pi/g, `${Math.PI}`)
        .replace(/density/g, `${selectedMaterial.density}`);

      const filledValues = Object.values(params).filter(val => val !== "");
      if (filledValues.some(val => Number(val) <= 0)) {
        return "Введите корректные данные";
      }

      if (selectedShape.requiredParams.includes("firstSide") &&
        selectedShape.requiredParams.includes("secondSide") &&
        (!params.firstSide || !params.secondSide)) {
        return "Введите обе стороны";
      }

      if (params.firstSide && params.thickness &&
        Number(params.firstSide) <= 2 * Number(params.thickness)) {
        return `Сторона ${params.firstSide} мм слишком мала для стенки ${params.thickness} мм`;
      }

      if (params.secondSide && params.thickness &&
        Number(params.secondSide) <= 2 * Number(params.thickness)) {
        return `Сторона ${params.secondSide} мм слишком мала для стенки ${params.thickness} мм`;
      }

      if (params.diameter && params.thickness &&
        Number(params.diameter) <= 2 * Number(params.thickness)) {
        return `Диаметр ${params.diameter} мм слишком мал для стенки ${params.thickness} мм`;
      }

      const result = new Function(...Object.keys(params), `return ${formula}`)(
        ...Object.values(params).map(v => Number(v) || 0)
      );

      return result > 0 ? result.toFixed(2) : "0.00";
    } catch {
      return "Ошибка";
    }
  };

  const weight = calculateWeight();
  const isError = weight.includes("Введите") || weight.includes("Диаметр") || weight === "Ошибка";

  return (
    <div key={selectedShape.id} className={style.Calculator}>
      <h3>Расчёт массы</h3>

      {selectedShape.requiredParams.map((param) => (
        <InputField
          key={param}
          label={labelMap[param] || param}
          value={params[param] || ""}
          onChange={(value) => handleInputChange(param, value)}
        />
      ))}

      {isError ? <p>{weight}</p> : <p className={style.result}>Масса: {weight} кг</p>}
    </div>
  );
};

export default Calculator;