import { useSelector, useDispatch} from 'react-redux';
import { AppDispatch, RootState } from '../../store/store.ts';
import { fetchShapes, selectShape } from '../../store/metalSlice.ts';
import { useEffect } from 'react';
import '../../styles/globals.scss';
import style from "./style.module.scss";




const ShapeSelector = () => {
  const dispatch = useDispatch<AppDispatch>();
  const shapes = useSelector((state: RootState) => state.metal.shapes);

  useEffect(() => {
    dispatch(fetchShapes());
  }, [dispatch]);

  return (
    <div className={style.ShapeSelector}>
      <h3>Вид проката</h3>
      <select className='custom-select' onChange={e => dispatch(selectShape(e.target.value))}>
        <option value="">Выберите</option>
        {shapes.map((shape) => (
          <option key={shape.id} value={shape.id}>{shape.name}</option>
        ))}
      </select>
    </div>
  );
};

export default ShapeSelector;