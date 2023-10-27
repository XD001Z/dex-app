import React from 'react';
import { Link } from 'react-router-dom';

const AnimeCard = ({ img, _id, dexNum }) => {
  return (
    <Link to={`/anime/${_id}`}>
      <div className='grid-item'>
          <h5 className='grid-header'>{dexNum}</h5>
          <img className='grid-img' src={img} alt="image" />
      </div>
    </Link>
  )
}

export default AnimeCard;