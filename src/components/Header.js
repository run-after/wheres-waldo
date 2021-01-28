import '../styles/Header.css';
import waldo from '../media/waldo.png';
import wanda from '../media/wanda.png';
import odlaw from '../media/odlaw.png';
import wizard from '../media/wizard.png';


const Header = () => {

  return (
    <div className='header'>
      <div className='characters'>
        <img src={waldo} alt='waldo'/>
        <img src={wanda} alt='wanda'/>
        <img src={odlaw} alt='odlaw'/>
        <img src={wizard} alt='wizard'/>
      </div>
      <div className='timer'>00:00:00</div>
    </div>
    
  )

};

export default Header;