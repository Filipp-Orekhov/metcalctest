import { useSelector, useDispatch } from 'react-redux';
import { selectMaterial } from '../../store/metalSlice.ts';
import '../../styles/globals.scss';
import style from "./style.module.scss";
import { getSelectedShape, getSelectedMaterial } from "../../store/selectors";

const MaterialSelector = () => {
  const dispatch = useDispatch();
  const selectedShape = useSelector(getSelectedShape);
  const selectedMaterial = useSelector(getSelectedMaterial);

  if (!selectedShape)
    return null;

  return (
    <div className={style.MaterialSelector}>
      <h3>Выберите материал</h3>
      <select  className='custom-select' value={selectedMaterial?.name || ""} onChange={e => dispatch(selectMaterial(e.target.value))}>
        <option className='option' value="">Выберите</option>
        {selectedShape.materials.map((material) => (
          <option key={material.name} value={material.name}>{material.name}</option>
        ))}
      </select>
    </div>
  );
};

export default MaterialSelector;