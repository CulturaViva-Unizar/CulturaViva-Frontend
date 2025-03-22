import { faLock, faMessage, faUnlock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC, useState } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'; // Importa los estilos de SweetAlert2

export interface UserCardProps {
  user: string;
  totalComments: number;
  deletedComments: number;
  isEnabledInit: boolean;
  className?: string;
}

export const UserCard: FC<UserCardProps> = ({
  user,
  totalComments,
  deletedComments,
  isEnabledInit,
  className = ''
}) => {
  const [isEnabled, setIsEnabled] = useState(isEnabledInit);

  const handleDisable = () => {
    Swal.fire({
      title: '¡ATENCIÓN!',
      html: `
        <p>Se va a deshabilitar la cuenta del usuario <b>${user}</b></p>
        <select id="reasonSelect" class="form-select mt-3">
          <option value="">Motivo</option>
          <option value="razon1">Razón 1</option>
          <option value="razon2">Razón 2</option>
          <option value="razon3">Razón 3</option>
        </select>
      `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Deshabilitar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
      customClass: {
        confirmButton: 'btn btn-danger ms-2',  // Estilo Bootstrap para el botón de confirmar
        cancelButton: 'btn btn-secondary'       // Estilo Bootstrap para el botón de cancelar
      },
      buttonsStyling: false, // Permite usar las clases personalizadas de Bootstrap
      preConfirm: () => {
        const selectElement = document.getElementById('reasonSelect') as HTMLSelectElement;
        const selectedValue = selectElement.value;
        if (!selectedValue) {
          // Forzamos a que el usuario elija un motivo
          Swal.showValidationMessage('Por favor, selecciona un motivo');
        }
        return { reason: selectedValue };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        // Aquí podrías enviar el motivo al backend si es necesario
        console.log('Motivo seleccionado:', result.value?.reason);
        setIsEnabled(false);
      }
    });
  };

  const handleEnable = () => {
    Swal.fire({
      title: '¡ATENCIÓN!',
      text: `Se va a volver a habilitar la cuenta del usuario '${user}'`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Habilitar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
      customClass: {
        confirmButton: 'btn btn-success ms-2', // Estilo Bootstrap para el botón de confirmar
        cancelButton: 'btn btn-secondary'      // Estilo Bootstrap para el botón de cancelar
      },
      buttonsStyling: false
    }).then((result) => {
      if (result.isConfirmed) {
        setIsEnabled(true);
      }
    });
  };

  return (
    <div className={`d-flex align-items-center flex-md-column flex-row text-start text-md-center p-3 ${className}`}>
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
        {isEnabled ? (
          <button
            className='btn btn-danger px-0 px-md-3 shadow rounded-pill text-nowrap'
            onClick={handleDisable}
          >
            <FontAwesomeIcon icon={faLock} /> Deshabilitar
          </button>
        ) : (
          <button
            className='btn btn-success px-0 px-md-3 shadow rounded-pill text-nowrap'
            onClick={handleEnable}
          >
            <FontAwesomeIcon icon={faUnlock} /> Habilitar
          </button>
        )}
      </div>
    </div>
  );
};
