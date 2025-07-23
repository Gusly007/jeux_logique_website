type Item = {
    id: number;
    value: string;
  };
  
  type Action =
    | { type: "add"; payload: string }
    | { type: "delete"; payload: number }
    | { type: "move_up"; payload: number }
    | { type: "move_down"; payload: number };
  
  export const todoReducer = (state: Item[], action: Action): Item[] => {
    switch (action.type) {
      case "add":
        return [...state, { id: state.length, value: action.payload }];
  
      case "delete":
        return state.filter((item) => item.id !== action.payload);
  
      case "move_up": {
        const index = state.findIndex((item) => item.id === action.payload);
        if (index <= 0) return state;
        const newItems = [...state];
        [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
        return newItems;
      }
  
      case "move_down": {
        const index = state.findIndex((item) => item.id === action.payload);
        if (index === -1 || index === state.length - 1) return state;
        const newItems = [...state];
        [newItems[index + 1], newItems[index]] = [newItems[index], newItems[index + 1]];
        return newItems;
      }
  
      default:
        return state;
    }
  };
  