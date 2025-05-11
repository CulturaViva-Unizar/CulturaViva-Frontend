import { FC } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

interface RangeProps {
  value: number;
  onChange: (newValue: number) => void;
  min?: number;
  max?: number;
  className?: string;
  hideWhenMaxValue?: boolean;
}

export const Range: FC<RangeProps> = ({
  value,
  onChange,
  min = 0,
  max = 100,
  className = "",
  hideWhenMaxValue = false,
}) => {
  console.log(value);
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
            tooltip.style.left = `${percent * sliderWidth}px`;
          };
          slider.addEventListener("input", updateTooltip);
          updateTooltip();
        }
      },
    });
    if (newValue !== undefined && newValue !== null) {
      onChange(Number(newValue));
    }
  };

  return (
    <button
      onClick={openModal}
      className={`btn rounded-pill text-nowrap ${className}`}
    >
      Precio {(value !== null && value < max || !hideWhenMaxValue) && ` ${value}`}€
    </button>
  );
};
