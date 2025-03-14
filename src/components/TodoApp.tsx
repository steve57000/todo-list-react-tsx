import { useState, useEffect } from "react";
import { SearchBar } from "./SearchBar";
import { TodoListCard } from "./TodoListCard";

// -------------------------
// Types
// -------------------------
export interface Todo {
  id: number;
  description: string;
  done: boolean;
}

export interface TodoList {
  id: number;
  title: string;
  items: Todo[];
}

// -------------------------
// Composant principal
// -------------------------
export function TodoApp() {
  const [todoLists, setTodoLists] = useState<TodoList[]>(() => {
    // Charger la liste depuis localStorage au démarrage
    const savedData = localStorage.getItem("todoLists");
    return savedData ? JSON.parse(savedData) : [];
  });

  // Sauvegarder dans localStorage à chaque mise à jour des listes
  useEffect(() => {
    localStorage.setItem("todoLists", JSON.stringify(todoLists));
  }, [todoLists]);

  // -------------------------
  // Fonctions de modification
  // -------------------------
  const createNewList = (title: string) => {
    if (!title.trim()) return;
    const newList: TodoList = {
      id: Date.now(),
      title,
      items: [],
    };
    setTodoLists((prevLists) => [...prevLists, newList]);
  };

  const removeList = (listId: number) => {
    setTodoLists((prevLists) => prevLists.filter((l) => l.id !== listId));
  };

  const addItemToList = (listId: number, description: string) => {
    if (!description.trim()) return;
    setTodoLists((prevLists) =>
      prevLists.map((list) =>
        list.id === listId
          ? {
            ...list,
            items: [
              ...list.items,
              { id: Date.now(), description, done: false },
            ],
          }
          : list
      )
    );
  };

  const toggleItemDone = (listId: number, itemId: number) => {
    setTodoLists((prevLists) =>
      prevLists.map((list) =>
        list.id === listId
          ? {
            ...list,
            items: list.items.map((item) =>
              item.id === itemId
                ? { ...item, done: !item.done }
                : item
            ),
          }
          : list
      )
    );
  };

  const removeItem = (listId: number, itemId: number) => {
    setTodoLists((prevLists) =>
      prevLists.map((list) =>
        list.id === listId
          ? {
            ...list,
            items: list.items.filter((item) => item.id !== itemId),
          }
          : list
      )
    );
  };

  // -------------------------
  // Rendu
  // -------------------------
  return (
    <div className="p-5 max-w-lg mx-auto space-y-8">
      {/* Barre de recherche pour créer une liste ou ajouter un item à une liste */}
      <SearchBar
        todoLists={todoLists}
        onCreateList={createNewList}
        onAddItem={addItemToList}
      />

      {/* Affichage de toutes les listes sous forme de cartes */}
      <div className="space-y-5">
        {todoLists.map((list) => (
          <TodoListCard
            key={list.id}
            list={list}
            onToggleItemDone={toggleItemDone}
            onRemoveItem={removeItem}
            onRemoveList={removeList}
          />
        ))}
      </div>
    </div>
  );
}
