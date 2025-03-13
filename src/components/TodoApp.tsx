// TodoApp.tsx
import { useState } from "react";
import { SearchBar } from "./SearchBar";
import { TodoItem } from "./TodoItem";
import  data  from "../data/todolist"
interface Todo {
  id: number;
  description: string;
  done: boolean;
}

export function TodoApp() {
  const [itemList, setItemList] = useState<Todo[]>(data);

  const addItem = (newItem: string) => {
    if (newItem.trim()) {
      const newTask: Todo = {
        id: Date.now(),
        description: newItem,
        done: false,
      };
      setItemList([...itemList, newTask]);
    }
  };

  const toggleDone = (id: number) => {
    setItemList(itemList.map(item => item.id === id ? { ...item, done: !item.done } : item));
  };

  const removeItem = (id: number) => {
    setItemList(itemList.filter(item => item.id !== id));
  };

  const sortedItems = [...itemList].sort((a, b) => Number(a.done) - Number(b.done));

  return (
    <>
      <SearchBar onAdd={addItem} />
      <div className="my-5 flex-column gap-5 w-full text-left">
        {sortedItems.map((item) => (
          <TodoItem
            key={item.id}
            id={item.id}
            description={item.description}
            done={item.done}
            onToggle={toggleDone}
            onRemove={removeItem}
          />
        ))}
      </div>
    </>
  );
}