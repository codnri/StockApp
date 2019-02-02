const stocks = (state = { stockList: [] }, action) => {
  switch (action.type) {
    case "ADD_STOCK":
      return {
        stockList: [...state.stockList, action.stock]
      };
    case "REMOVE_STOCK":
      // console.log("reducer " + action.id);
      let new_stockList = state.stockList.filter(el => el.id !== action.id);
      console.log(new_stockList);
      return {
        stockList: new_stockList
      };
    // 初期条件を忘れずに書く
    default:
      return state;
  }
};
export default stocks;
