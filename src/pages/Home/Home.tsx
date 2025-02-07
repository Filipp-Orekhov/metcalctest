import ShapeSelector from '../../components/ShapeSelector/ShapeSelector.tsx';
import MaterialSelector from '../../components/MaterialSelector/MaterialSelector.tsx';
import Calculator from '../../components/Calculator/Calculator.tsx';
import { Link } from 'react-router-dom';
import style from "./style.module.scss";


const Home = () => (
  <div className={style.main_container}>
    <li><Link to="/contacts">Перейти в контакты</Link></li>
    <h1>Металлокалькулятор</h1>
    <ShapeSelector />
    <MaterialSelector />
    <Calculator />
  </div>
);

export default Home;