import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';

interface CardProps {
  image?: string;
  title: string;
  location: string;
  rating: number;
  reviews: number;
  description: string;
  onClick?: () => void;
  className?: string;
}

export const Card: FC<CardProps> = ({ image, title, location, rating, reviews, description, onClick, className = '' }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div className={`card border-0 ${className}`} onClick={handleClick}>
      <div className='row g-0'>
        {image && (
          <div className='col-3'>
            <img 
              src={image} 
              className='img-fluid rounded-start h-100' 
              alt={title}
              style={{ objectFit: 'cover' }}
            />
          </div>
        )}
        <div className={image ? 'col-9' : 'col-12'}>
          <div className='card-body'>
            <h5 className='card-title'>{title}</h5>
            <p className='card-text text-muted mb-0'>{location}</p>
            <div className='d-flex align-items-center gap-1'>
              <p className='card-text text-muted mb-0'>{rating}</p>
              <FontAwesomeIcon icon={faStar} color='yellow' />
              <p className='card-text text-muted mb-0'>({reviews})</p>
            </div>
            <p className='card-text text-truncate'>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
