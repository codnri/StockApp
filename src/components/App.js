import React from "react";
import StockTable from "../containers/StockTable";
import StockSearcher from "../containers/StockSearcher";
const App = () => {
  return (
    <div className="App">
      <h1>Hello StockApp </h1>
      {
        // <StockSearcher />
        //<StockSummary />
      }
      <br />
      <StockSearcher />
      <br />
      <StockTable />
    </div>
  );
};

export default App;
