import {BtnRemove} from "./BtnRemove.tsx";

interface TodoItemProps {
  id: number;
  description: string;
  done: boolean;
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
}

export function TodoItem({ id, description, done, onToggle, onRemove }: TodoItemProps) {
  const containerClass = done
    ? "bg-indigo-900 w-full rounded-box p-3 flex items-center"
    : "bg-indigo-700 w-full rounded-box p-3 flex items-center";

  return (
    <div className={containerClass}>
      <span className="pr-4">
        <input
          type="checkbox"
          checked={done}
          onChange={() => onToggle(id)}
        />
      </span>

      <span className="flex-grow">{description}</span>

      <BtnRemove onClick={() => onRemove(id)} />
    </div>
  );
}
