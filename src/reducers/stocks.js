const stocks = (state = { stockList: [] }, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        todoList: [...state.stockList, action.stock]
      };
    // 初期条件を忘れずに書く
    default:
      return state;
  }
};
export default stocks;
