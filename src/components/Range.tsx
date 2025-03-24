import { FC, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

interface RangeProps {
  min?: number;
  max?: number;
  initialValue?: number;
  className?: string;
  hideWhenMaxValue?: boolean;
}

export const Range: FC<RangeProps> = ({
  min = 0,
  max = 100,
  initialValue = 50,
  className = "",
  hideWhenMaxValue = false,
}) => {
  const [value, setValue] = useState<number>(initialValue);

  const openModal = async () => {
    const { value: newValue } = await MySwal.fire({
      title: "Seleccione un rango",
      html: `
        <div class="d-flex flex-column align-items-center">
          <div class="position-relative my-3" style="width: 80%;">
            <input id="swal-range" type="range" min="${min}" max="${max}" value="${value}" class="form-range w-100" />
            <span
              id="swal-tooltip"
              class="position-absolute text-white text-nowrap rounded"
              style="top: -30px; left: 0; transform: translateX(-50%); background-color: #333; padding: 2px 6px; font-size: 0.8rem;"
            >
              ${value}€
            </span>
          </div>
          <div class="d-flex justify-content-between" style="width: 80%;">
            <span>${min}€</span>
            <span>${max}€</span>
          </div>
        </div>
      `,
      showCancelButton: true,
      focusConfirm: false,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Aceptar",
      preConfirm: () => {
        const slider = document.getElementById(
          "swal-range"
        ) as HTMLInputElement;
        return slider ? slider.value : null;
      },
      didOpen: () => {
        const slider = document.getElementById(
          "swal-range"
        ) as HTMLInputElement;
        const tooltip = document.getElementById("swal-tooltip") as HTMLElement;
        if (slider && tooltip) {
          const updateTooltip = () => {
            tooltip.textContent = slider.value + "€";
            const percent = (Number(slider.value) - min) / (max - min);
            const sliderWidth = slider.getBoundingClientRect().width;
            const left = percent * sliderWidth;
            tooltip.style.left = left + "px";
          };
          slider.addEventListener("input", updateTooltip);
          updateTooltip();
        }
      },
    });
    if (newValue !== undefined && newValue !== null) {
      setValue(Number(newValue));
    }
  };

  return (
    <button
      onClick={openModal}
      className={`btn rounded-pill shadow-sm text-nowrap ${className}`}
    >
      Precio {(value < max || !hideWhenMaxValue) && ` ${value}`}€
    </button>
  );
};
