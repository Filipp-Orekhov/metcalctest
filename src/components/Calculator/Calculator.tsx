import { useSelector } from 'react-redux';
import { RootState } from '../../store/store.ts';
import { useEffect, useState } from 'react';
import '../../styles/globals.scss';
import style from "./style.module.scss";


const Calculator = () => {
  const { selectedShape, selectedMaterial } = useSelector((state: RootState) => state.metal);

  type ParamsType = {
    thickness: string;
    materialLength: string;
    diameter: string;
    firstSide: string;
    secondSide: string;
  };

  const [params, setParams] = useState<ParamsType>({
    thickness: "",
    materialLength: "",
    diameter: "",
    firstSide: "",
    secondSide: ""
  });

  useEffect(() => {
    setParams({
      thickness: "",
      materialLength: "",
      diameter: "",
      firstSide: "",
      secondSide: ""
    });
  }, [selectedShape]);

  if (!selectedShape || !selectedMaterial || !selectedShape.requiredParams) return null;

  const calculateWeight = () => {
    try {
      const formula = selectedShape.formula
        .replace(/pi/g, `${Math.PI}`)
        .replace(/density/g, `${selectedMaterial.density}`);

      const { thickness, diameter, firstSide, secondSide, materialLength } = params;

      const filledValues = [thickness, materialLength].filter(val => val !== "");
      if (filledValues.some(val => Number(val) <= 0)) {
        return "Введите корректные данные";
      }

      if (selectedShape.requiredParams.includes("firstSide") &&
        selectedShape.requiredParams.includes("secondSide") &&
        (!firstSide || !secondSide)) {
        return "Введите обе стороны";
      }

      if (Number(firstSide) > 0 && Number(thickness) > 0 && Number(firstSide) <= 2 * Number(thickness)) {
        return `Сторона  ${firstSide} мм слишком мала для стенки ${thickness} мм`;
      }

      if (Number(secondSide) > 0 && Number(thickness) > 0 && Number(secondSide) <= 2 * Number(thickness)) {
        return `Сторона  ${secondSide} мм слишком мала для стенки ${thickness} мм`;
      }

      if (Number(diameter) > 0 && Number(thickness) > 0 && Number(diameter) <= 2 * Number(thickness)) {
        return `Диаметр ${diameter} мм слишком мал для стенки ${thickness} мм`;
      }

      const result = new Function(...Object.keys(params), `return ${formula}`)(
        ...Object.values(params).map(v => Number(v) || 0)
      );

      return result > 0 ? result.toFixed(2) : "0.00";
    } catch {
      return "Ошибка";
    }
  };

  const handleInputChange = (key: keyof ParamsType, value: string) => {
    if (value === "" || (/^\d*\.?\d*$/.test(value) && Number(value) > 0)) {
      setParams(prev => ({ ...prev, [key]: value }));
    }
  };

  const weight = calculateWeight();

  return (
    <div key={selectedShape.id} className={style.Calculator}>
      <h3>Расчёт массы</h3>
      {selectedShape.requiredParams.includes("firstSide") && (
      <input className='custom-input'
          type="text"
          inputMode="decimal"
          pattern="^\d*\.?\d*$"
          placeholder="Сторона 1, мм"
          value={params.firstSide}
          onChange={event => handleInputChange("firstSide", event.target.value)}
      />)}
      {selectedShape.requiredParams.includes("secondSide") && (
        <input className='custom-input'
          type="text"
          inputMode="decimal"
          pattern="^\d*\.?\d*$"
          placeholder="Сторона 2, мм"
          value={params.secondSide}
          onChange={event => handleInputChange("secondSide", event.target.value)}
      />)}
      {selectedShape.requiredParams.includes("diameter") && (
        <input className='custom-input'
          type="text"
          inputMode="decimal"
          pattern="^\d*\.?\d*$"
          placeholder="Диаметр, мм"
          value={params.diameter}
          onChange={event => handleInputChange("diameter", event.target.value)}
        />)}
      {selectedShape.requiredParams.includes("thickness") && (
        <input className='custom-input'
           type="text"
           inputMode="decimal"
           pattern="^\d*\.?\d*$"
           placeholder="Толщина стенки, мм"
           value={params.thickness}
           onChange={event => handleInputChange("thickness", event.target.value)}
        />)}
      {selectedShape.requiredParams.includes("materialLength") && (
        <input className='custom-input'
           type="text"
           inputMode="decimal"
           pattern="^\d*\.?\d*$"
           placeholder="Длина, м"
           value={params.materialLength}
           onChange={event => handleInputChange("materialLength", event.target.value)}
        />)}
        {isNaN(Number(weight)) || weight === "Введите корректные данные" || weight === "Введите обе стороны" || weight.includes("Диаметр слишком мал") ? (
        <p>{weight}</p>
      ) : (
        <p>Масса: {weight} кг</p>
      )}
    </div>
  );
};

export default Calculator;
