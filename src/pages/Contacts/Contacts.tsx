import { Link } from 'react-router-dom';
import style from "./style.module.scss";


const Contacts = () => {
  return (
    <div className={style.Contacts}>
      <li><Link to="/home">Перейти на страницу калькулятора</Link></li>
      <h1>Контакты, которые мы заслужили</h1>
      <p>Привет!</p>
    </div>
  );
};

export default Contacts;