import { useState } from "react";
import { TodoList } from "./TodoApp";

interface SearchBarProps {
  todoLists: TodoList[];
  onCreateList: (title: string) => void;
  onAddItem: (listId: number, description: string) => void;
}

export function SearchBar({ todoLists, onCreateList, onAddItem }: SearchBarProps) {
  // Pour la création d’une liste
  const [newListTitle, setNewListTitle] = useState("");

  // Pour l’ajout d’un item
  const [selectedListId, setSelectedListId] = useState<number | null>(null);
  const [newItemDesc, setNewItemDesc] = useState("");

  const handleCreateList = () => {
    if (newListTitle.trim()) {
      onCreateList(newListTitle);
      setNewListTitle("");
    }
  };

  const handleAddItem = () => {
    if (selectedListId === null) return;
    if (newItemDesc.trim()) {
      onAddItem(selectedListId, newItemDesc);
      setNewItemDesc("");
    }
  };

  return (
    <div className="space-y-4">
      {/* Section pour créer une nouvelle liste */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Créer une nouvelle liste"
          className="border p-2 w-full rounded"
          value={newListTitle}
          onChange={(e) => setNewListTitle(e.target.value)}
        />
        <button
          onClick={handleCreateList}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Créer
        </button>
      </div>

      {/* Section pour ajouter un item à une liste existante */}
      {todoLists.length > 0 && (
        <div className="flex gap-2 items-center">
          <select
            value={selectedListId ?? ""}
            onChange={(e) => {
              const val = e.target.value;
              setSelectedListId(val ? Number(val) : null);
            }}
            className="border p-2 rounded"
          >
            <option value="">Choisir une liste</option>
            {todoLists.map((list) => (
              <option key={list.id} value={list.id}>
                {list.title}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Ajouter un item"
            className="border p-2 w-full rounded"
            value={newItemDesc}
            onChange={(e) => setNewItemDesc(e.target.value)}
          />

          <button
            onClick={handleAddItem}
            className="bg-green-600 text-white p-2 rounded"
          >
            Ajouter
          </button>
        </div>
      )}
    </div>
  );
}
