import {BtnRemove} from "./BtnRemove.tsx";
import styled from 'styled-components';

interface TodoItemProps {
  id: number;
  description: string;
  done: boolean;
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
}

const BoxItem = styled.div`
  box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.4);
`


export function TodoItem({ id, description, done, onToggle, onRemove }: TodoItemProps) {
  const containerClass = done
    ? "bg-indigo-900 w-full rounded-box p-3 flex items-center"
    : "bg-indigo-700 w-full rounded-box p-3 flex items-center";

  const textLineThrough = done
    ? "flex-grow line-through"
    : "flex-grow"

  return (
    <BoxItem className={containerClass}>
      <span className="pr-4">
        <input
          type="checkbox"
          checked={done}
          onChange={() => onToggle(id)}
        />
      </span>

      <span className={textLineThrough}>{description}</span>

      <BtnRemove onClick={() => onRemove(id)} contentTxt="X" addClass="btn btn-error btn-outline btn-xs ml-4" />
    </BoxItem>
  );
}
