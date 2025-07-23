import React from "react";
type Item = {
    id: number;
    value: string;
  };
  
  type ListProps = {
    items: Item[];
    ulRef: React.RefObject<HTMLUListElement | null>;
    onDelete: (id: number) => void;
    onMoveUp: (id: number) => void;
    onMoveDown: (id: number) => void;
  };
  
  const List: React.FC<ListProps> = ({ items, ulRef, onDelete, onMoveUp, onMoveDown }) => {
    console.log("is rendered");
    return (
      <ul ref={ulRef}>
        {items.map((item) => (
          <li key={item.id}>
            {item.value}
            <button onClick={() => onDelete(item.id)}>delete</button>
            <button onClick={() => onMoveUp(item.id)}>up</button>
            <button onClick={() => onMoveDown(item.id)}>down</button>
          </li>
        ))}
      </ul>
    );
  };
  
  export default React.memo(List);