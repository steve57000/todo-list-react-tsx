import { useState } from "react";

interface SearchBarProps {
  onAdd: (newItem: string) => void;
}

export function SearchBar({ onAdd }: SearchBarProps) {
  const [inputValue, setInputValue] = useState("");

  const handleAdd = () => {
    if (inputValue.trim()) {
      onAdd(inputValue);
      setInputValue("");
    }
  };

  return (
    <div className="flex">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Ajouter une tâche"
        className="border p-2 w-full rounded"
      />
      <button
        onClick={handleAdd}
        className="bg-blue-500 text-white p-2 rounded"
      >
        +
      </button>
    </div>
  );
}