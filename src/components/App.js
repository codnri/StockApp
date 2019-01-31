import React from "react";
import StockTable from "../containers/StockTable";
const App = () => {
  return (
    <div className="App">
      <h1>Hello StockApp </h1>
      {
        // <StockSearcher />
        //<StockSummary />
      }
      <StockTable />
    </div>
  );
};

export default App;
