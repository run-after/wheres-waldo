import '../styles/Header.css';
import waldo from '../media/waldo.png';
import wanda from '../media/wanda.png';
import odlaw from '../media/odlaw.png';
import wizard from '../media/wizard.png';


const Header = () => {

  return (
    <div className='header'>
      <div className='character-container'>
        <h6>Characters</h6>
        <div className='characters'>
          <img id='waldo-img' src={waldo} alt='waldo'/>
          <img id='wanda-img' src={wanda} alt='wanda'/>
          <img id='odlaw-img' src={odlaw} alt='odlaw'/>
          <img id='wizard-img' src={wizard} alt='wizard'/>
        </div>
        
      </div>
      <div className='timer'>00:00:00</div>{/* This is a placeholder. Will have a timer from backend */}
    </div>
    
  )

};

export default Header;