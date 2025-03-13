interface TodoItemProps {
  id: number;
  description: string;
  done: boolean;
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
}

export function TodoItem({ id, description, done, onToggle, onRemove }: TodoItemProps) {
  return (
    <div className={!done ? "bg-indigo-700 w-full m-5 rounded-box p-3 flex" : "bg-indigo-900 w-full m-5 rounded-box p-3 flex"}>

      <span className="pr-8">
        <input
          type="checkbox"
          checked={done}
          onChange={() => onToggle(id)}
        />
      </span>
      <span className="flex-grow">{description}</span>

      <button
        onClick={() => onRemove(id)}
        className="btn btn-error btn-outline btn-xs"
      >
        X
      </button>
    </div>
  );
}
