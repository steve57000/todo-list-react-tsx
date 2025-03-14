import { useState } from "react";
import { TodoList } from "./TodoApp";
import { TodoItem } from "./TodoItem";
import { BtnRemove } from "./BtnRemove";

interface TodoListCardProps {
  list: TodoList;
  onToggleItemDone: (listId: number, itemId: number) => void;
  onRemoveItem: (listId: number, itemId: number) => void;
  onRemoveList: (listId: number) => void;
}

export function TodoListCard({
  list,
  onToggleItemDone,
  onRemoveItem,
  onRemoveList,
}: TodoListCardProps) {

  // État local pour afficher/masquer le contenu de la liste (accordéon)
  const [isOpen, setIsOpen] = useState(false);

  // Tri local : on affiche d'abord les items non faits, puis les faits
  const sortedItems = [...list.items].sort(
    (a, b) => Number(a.done) - Number(b.done)
  );

  return (
    <div className="grid grid-cols-[3fr_40px] items-center">
      <div className="border rounded shadow-md p-4">
        {/* En-tête de la carte : titre cliquable qui toggle l'ouverture */}
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <h2 className="text-lg font-bold">{list.title}</h2>
          <span>{isOpen ? "▼" : "►"}</span>
        </div>
        {/* Contenu de la liste, visible seulement si isOpen = true */}
        {isOpen && (
          <div className="mt-4 space-y-2">
            {sortedItems.map((item) => (
              <TodoItem
                key={item.id}
                id={item.id}
                description={item.description}
                done={item.done}
                onToggle={(itemId) => onToggleItemDone(list.id, itemId)}
                onRemove={(itemId) => onRemoveItem(list.id, itemId)}
              />
            ))}
          </div>
        )}
      </div>

      <BtnRemove onClick={() => onRemoveList(list.id)} />
  </div>
  );
}
