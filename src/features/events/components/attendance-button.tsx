import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useState } from "react";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { usePostAttendingEvent } from "../api/post-attending-event";
import { useDeleteAttendingEvent } from "../api/delete-attending-event";
import { useUser } from "../../../lib/auth";
import { CreateBookmarkRequest } from "../../../types/api";

type AttendanceButtonProps = {
  eventId: string;
  isAttendingInit: boolean;
  totalAssistantsInit: number;
};

export const AttendanceButton: FC<AttendanceButtonProps> = ({
  eventId,
  isAttendingInit,
  totalAssistantsInit,
}) => {
  const userId = useUser().data?.id;
  const [isAttending, setIsAttending] = useState<boolean>(isAttendingInit);
  const [totalAssistants, setTotalAssistants] =
    useState<number>(totalAssistantsInit);

  const postAttendingEventMutation = usePostAttendingEvent();
  const deleteAttendingEventMutation = useDeleteAttendingEvent();

  const deleteAttendance = () => {
    deleteAttendingEventMutation.mutate(
      { userId: userId!, eventId },
      {
        onSuccess: () => {
          setIsAttending(false);
          setTotalAssistants((prev: number) => prev - 1);
          Swal.fire(
            "Eliminado",
            "Has dejado de asistir a esta exposición.",
            "success"
          );
        },
        onError: (err) => {
          Swal.fire("Error", err.message, "error");
        },
      }
    );
  };

  const addAttendance = async () => {
    const request: CreateBookmarkRequest = {
      eventId,
    };
    try {
      await postAttendingEventMutation.mutateAsync({
        userId: userId!,
        data: request,
      });
      setIsAttending(true);
      setTotalAssistants((prev: number) => prev + 1);
      Swal.fire(
        "¡Asistencia confirmada!",
        "Has confirmado tu asistencia a esta exposición.",
        "success"
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      Swal.fire("Error", err, "error");
    }
  };

  const toggleAttendance = () => {
    if (isAttending) {
      Swal.fire({
        title: "¿Estás seguro?",
        text: "Dejarás de asistir a esta exposición.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, dejar de asistir",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          deleteAttendance();
        }
      });
    } else {
      addAttendance();
    }
  };

  return (
    <Button
      variant={isAttending ? "danger" : "success"}
      className="w-100 rounded-pill"
      onClick={toggleAttendance}
      disabled={postAttendingEventMutation.isPending}
    >
      <FontAwesomeIcon icon={isAttending ? faMinus : faPlus} className="me-2" />
      {postAttendingEventMutation.isPending
        ? "Cargando..."
        : isAttending
        ? `Dejar de asistir (${totalAssistants})`
        : `Voy a asistir (${totalAssistants})`}
    </Button>
  );
};
