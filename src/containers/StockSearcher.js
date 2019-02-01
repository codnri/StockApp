import React from "react";

class StockSearcher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stock: {
        symbol: "",
        name: "",
        market_price: 0,
        purchase_date: 0,
        id: ""
      },
      editing_stock: {}
    };
  }
  render() {
    return (
      <div className="container">
        <div className="input-group">
          <input
            type="text"
            className="form-control-lg"
            placeholder="Search Stocks..."
          />
          <span className="input-group-btn">
            <button type="button" className="btn btn-outline-dark bt-lg">
              ADD <i className="fas fa-hand-holding-usd fa-2x" />
            </button>
          </span>
        </div>
      </div>
    );
  }
}

export default StockSearcher;
