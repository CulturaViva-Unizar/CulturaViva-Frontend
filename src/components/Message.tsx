import { FC } from "react";

interface MessageProps {
    message: string;
    dateTime: string;
    isOwn: boolean;
  }

export const Message: FC<MessageProps> = ({ message, dateTime, isOwn }) => {
  return (
    <div className={`d-flex flex-row ${isOwn ? 'justify-content-end' : 'justify-content-start'}`}>
      <div>
        <p className={`small p-2 mb-1 rounded-3 ${isOwn ? 'text-white bg-primary' : 'bg-light'}`}>
          {message}
        </p>
        <p className={`small text-muted ${isOwn ? 'float-end' : ''}`}>{dateTime}</p>
      </div>
    </div>
  );
};
