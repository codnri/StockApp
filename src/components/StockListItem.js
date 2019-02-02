import React from "react";
import moment from "moment";

class StockListItem extends React.Component {
  constructor(props) {
    super(props);
    //this.num = this.props.num
    // this.stock = this.props.stock;

    this.state = {
      new_transaction: {
        purchase_date: 0,
        purchase_price: 0,
        quantity: 0
      },
      editing_stock: {}
    };
  }

  onChangePurchaseDate = e => {
    const tmp_transaction = { ...this.state.new_transaction };
    tmp_transaction.purchase_date = e.target.value;
    this.setState({ new_transaction: tmp_transaction });
  };
  onChangeQuantity = e => {
    const tmp_transaction = { ...this.state.new_transaction };
    tmp_transaction.quantity = e.target.value;
    this.setState({ new_transaction: tmp_transaction });
  };
  onChangePrice = e => {
    const tmp_transaction = { ...this.state.new_transaction };
    tmp_transaction.purchase_price = e.target.value;
    this.setState({ new_transaction: tmp_transaction });
  };

  sum = arr => {
    var sum = 0;
    arr.forEach(function(elm) {
      sum += elm;
    });
    return sum;
  };
  getTotalValue = e => {
    return (
      this.sum(this.props.stock.transactions.map(t => t.quantity)) *
      this.props.stock.market_price
    );
  };
  getProfit = e => {
    const totalCost = this.sum(
      this.props.stock.transactions.map(t => t.quantity * t.purchase_price)
    );
    return this.getTotalValue() - totalCost;
  };

  clickDelButton = e => {
    // console.log("clickDelButton");
    return this.props.clickDelButton(e);
  };
  render() {
    return (
      <>
        <tbody>
          <tr>
            <td
              className="clickable"
              data-toggle="collapse"
              data-target={"#group-of-rows-" + this.props.num}
              aria-expanded="false"
              aria-controls={"group-of-rows-" + this.props.num}
            >
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <i className="fas fa-plus-square" aria-hidden="true" />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </td>
            <td>{this.props.stock.symbol}</td>
            <td>{this.props.stock.name}</td>
            <td>{this.props.stock.market_price}</td>
            <td>
              {this.props.stock.transactions.length > 0 && this.getTotalValue()}
            </td>
            <td>
              {this.props.stock.transactions.length > 0 && this.getProfit()}
            </td>
            <td>
              <i
                id={this.props.stock.id}
                className="fas fa-trash-alt fa-xs"
                onClick={this.clickDelButton}
              />
            </td>
          </tr>
        </tbody>
        <tbody id={"group-of-rows-" + this.props.num} className="collapse">
          {this.props.stock.transactions.length > 0 &&
            this.props.stock.transactions.map((transaction, index) => {
              return (
                <tr key={index}>
                  <td>
                    <a href="">Edit</a> | <a href="">Del</a>
                  </td>
                  <td>
                    {moment(transaction.purchase_date).format("YYYY/MM/DD")}
                  </td>
                  <td>{transaction.quantity}</td>
                  <td>@{transaction.purchase_price}</td>
                  <td>{transaction.quantity * transaction.purchase_price}</td>
                </tr>
              );
            })}

          <tr>
            <td>
              <div className="btn btn-outline-dark btn-sm">Add</div>
            </td>
            <td>
              <input
                type="number"
                value={this.state.new_transaction.purchase_date}
                onChange={this.onChangePurchaseDate}
              />
            </td>
            <td>
              <input
                type="number"
                id={"qwantity-" + this.props.num}
                value={this.state.new_transaction.quantity}
                onChange={this.onChangeQuantity}
              />
            </td>
            <td>
              @
              <input
                type="number"
                id={"price-" + this.props.num}
                value={this.state.new_transaction.purchase_price}
                onChange={this.onChangePrice}
              />
            </td>
            <td>
              {this.state.new_transaction.quantity *
                this.state.new_transaction.purchase_price}
            </td>
            <td />
          </tr>
        </tbody>
      </>
    );
  }
}

// const StockListItem = ({ stock, num }) => (
//   <>
//     <tbody>
//       <tr
//         className="clickable"
//         data-toggle="collapse"
//         data-target={"#group-of-rows-" + num}
//         aria-expanded="false"
//         aria-controls={"group-of-rows-" + num}
//       >
//         <td>
//           &nbsp;&nbsp; <i className="fas fa-plus-square" aria-hidden="true" />&nbsp;&nbsp;
//         </td>
//         <td>{stock.symbol}</td>
//         <td>{stock.name}</td>
//         <td>{stock.market_price}</td>
//         <td>XXXX</td>
//         <td>XXXX</td>
//       </tr>
//     </tbody>
//     <tbody id={"group-of-rows-" + num} className="collapse">
//       {stock.transactions.map((transaction, index) => {
//         return (
//           <tr key={index}>
//             <td>
//               <a href="">Edit</a> | <a href="">Del</a>
//             </td>
//             <td>{moment(transaction.purchase_date).format('YYYY/MM/DD')}</td>
//             <td>{transaction.quantity}</td>
//             <td>@{transaction.purchase_price}</td>
//             <td>{transaction.quantity * transaction.purchase_price}</td>
//           </tr>
//         );
//       })}

//       <tr>
//         <td>
//           <div className="btn btn-outline-dark btn-sm">Add</div>
//         </td>
//         <td>
//           <input type="number" />
//         </td>
//         <td>
//           <input type="number" />
//         </td>
//         <td>
//           @<input type="number" />
//         </td>
//         <td>XXXX</td>
//         <td />
//       </tr>
//     </tbody>
//   </>
// );

export default StockListItem;
