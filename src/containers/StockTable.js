import React from "react";
import { connect } from "react-redux";
import { addStock } from "../actions/stocks";
import StockListItem from "../components/StockListItem";
class StockTable extends React.Component {
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

  componentWillMount() {
    const crm = {
      symbol: "CRM",
      name: "Salesforce.com",
      market_price: 150,

      id: "qfaqefrqfgvwqeg",
      transactions: [
        {
          purchase_date: 1111,
          purchase_price: 140,
          quantity: 10
        },
        {
          purchase_date: 2222,
          purchase_price: 130,
          quantity: 20
        }
      ]
    };
    const appl = {
      symbol: "APPL",
      name: "Apple",
      market_price: 170,
      purchase_date: 160,
      id: "qfaqefrqfgvwq--eg",
      transactions: [
        {
          purchase_date: 3333,
          purchase_price: 160,
          quantity: 10,
          id: "qfaqef333gvwaca--ee"
        },
        {
          purchase_date: 4444,
          purchase_price: 150,
          quantity: 10,
          id: "qfaqef333gvwaca--ee"
        }
      ]
    };
    this.props.addStock(crm);
    this.props.addStock(appl);
  }
  render() {
    return (
      <div className="container">
        {console.log(this.props.stockState.stockList)}
        <table className="table table-responsive table-hover">
          <thead>
            <tr>
              <th />
              <th>SYM</th>
              <th>Name</th>
              <th>Mkt Price</th>
              <th>Total Value</th>
              <th>Profit</th>
            </tr>
          </thead>
          {this.props.stockState.stockList.length != 0 &&
            this.props.stockState.stockList.map((stock, index) => {
              return <StockListItem key={index} stock={stock} num={index} />;
            })}
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    stockState: state.stocksReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addStock: stock => dispatch(addStock(stock))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StockTable);
