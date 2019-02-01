import uuid from "uuid";
export const addStock = stock => ({
  type: "ADD_STOCK",
  id: uuid(),
  stock
});
