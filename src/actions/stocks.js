import uuid from "uuid";
export const addStock = stock => ({
  type: "ADD_STOCK",
  // id: uuid(),
  stock
});

export const removeStock = stock => ({
  type: "REMOVE_STOCK",
  id: stock.id
});
