import { faLock, faMessage, faUnlock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC, useState } from 'react';

interface UserCardProps {
  user: string;
  totalComments: number;
  deletedComments: number;
  isEnabledInit: boolean;
  className?: string;
}

export const UserCard: FC<UserCardProps> = ({ user, totalComments, deletedComments, isEnabledInit, className = '' }) => {
  const [isEnabled, setIsEnabled] = useState(isEnabledInit);

  const handleEnable = () => {
    setIsEnabled(true)
  };

  const handleDisable = () => {
    setIsEnabled(false)
  };

  return (
    <div className={`row align-items-center flex-md-column flex-row text-start text-md-center p-3 ${className}`}>
      <div className='col'>
        <h1>{user}</h1>
        <p className='m-0'>{totalComments} comentarios</p>
        {deletedComments > 0 && (
          <p className='text-danger m-0'>{deletedComments} comentarios eliminados</p>
        )}
      </div>
      <div className='col-6 col-md-5 d-flex flex-md-row flex-column gap-2 justify-content-center mt-3'>
        {(totalComments > 0 || deletedComments > 0) && (
          <button className='btn btn-dark px-0 px-md-3 shadow rounded-pill text-nowrap'>
            <FontAwesomeIcon icon={faMessage} /> Comentarios
          </button>
        )}
        {isEnabled ?
          <button className='btn btn-danger px-0 px-md-3 shadow rounded-pill text-nowrap' onClick={handleDisable}>
            <FontAwesomeIcon icon={faLock} /> Deshabilitar
          </button>
        :
          <button className='btn btn-success px-0 px-md-3 shadow rounded-pill text-nowrap' onClick={handleEnable}>
            <FontAwesomeIcon icon={faUnlock} /> Habilitar
          </button> 
        }
      </div>
    </div>
  );
};
