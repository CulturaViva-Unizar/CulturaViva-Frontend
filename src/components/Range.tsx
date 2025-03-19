import React, { FC, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

interface RangeProps {
  /** Valor mínimo del slider */
  min?: number;
  /** Valor máximo del slider */
  max?: number;
  /** Valor inicial por defecto */
  defaultValue?: number;
  className?: string;
}

export const Range: FC<RangeProps> = ({ min = 0, max = 100, defaultValue = 50, className = '' }) => {
  const [value, setValue] = useState<number>(defaultValue);

  const openModal = async () => {
    const { value: newValue } = await MySwal.fire({
      title: 'Seleccione un rango',
      html: `
        <div style="display: flex; flex-direction: column; align-items: center;">
          <div style="position: relative; width: 80%; margin: 1rem 0;">
            <input id="swal-range" type="range" min="${min}" max="${max}" value="${value}" class="form-range" style="width: 100%;" />
            <span id="swal-tooltip" style="
              position: absolute;
              top: -30px;
              left: 0;
              transform: translateX(-50%);
              background-color: #333;
              color: #fff;
              padding: 2px 6px;
              border-radius: 4px;
              font-size: 0.8rem;
            ">${value}€</span>
          </div>
          <div style="width: 80%; display: flex; justify-content: space-between;">
            <span>${min}€</span>
            <span>${max}€</span>
          </div>
        </div>
      `,
      showCancelButton: true,
      focusConfirm: false,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Aceptar',
      preConfirm: () => {
        const slider = document.getElementById('swal-range') as HTMLInputElement;
        return slider ? slider.value : null;
      },
      didOpen: () => {
        const slider = document.getElementById('swal-range') as HTMLInputElement;
        const tooltip = document.getElementById('swal-tooltip') as HTMLElement;
        if (slider && tooltip) {
          const updateTooltip = () => {
            tooltip.textContent = slider.value + '€';
            const percent = (Number(slider.value) - min) / (max - min);
            const sliderWidth = slider.getBoundingClientRect().width;
            const left = percent * sliderWidth;
            tooltip.style.left = left + 'px';
          };
          slider.addEventListener('input', updateTooltip);
          updateTooltip();
        }
      }
    });
    if (newValue !== undefined && newValue !== null) {
      setValue(Number(newValue));
    }
  };

  return (
    <div
      onClick={openModal}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        borderRadius: '9999px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        cursor: 'pointer',
        justifyContent: 'space-between',
      }}
      className={className}
    >
      <span>Precio</span>
      <span>{`${value}€`}</span>
    </div>
  );
};
