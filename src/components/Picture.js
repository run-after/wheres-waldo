import image from '../media/maps_troy.jpeg';
import '../styles/Picture.css';

const Picture = () => {

  return (
    <div className='picture'>
      <img src={image} />
    </div>
  );
};

export default Picture;