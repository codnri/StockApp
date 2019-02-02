import React from "react";
import Select from "react-select";
import { connect } from "react-redux";
import { addStock, removeStock } from "../actions/stocks";
import uuid from "uuid";
import AsyncSelect from "react-select/lib/Async";
import _ from "lodash";

const API_KEY = "";

class StockSearcher extends React.Component {
  defaultStock = {
    symbol: "",
    name: "",
    id: "",
    market_price: 0,
    transactions: []
  };

  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      keyword: "",
      selected_stock: this.defaultStock,
      candidate_stocks: []
    };
  }

  //for AsyncSelect
  handleChange = option => {
    console.log("handleChange");

    let tmp_stock = _.cloneDeep(this.state.selected_stock);
    tmp_stock.name = option.name;
    tmp_stock.symbol = option.symbol;
    console.log("option..", option);
    console.log("tmp_stock..", option);
    this.setState({
      selected_stock: tmp_stock
    });
    console.log("log..", this.state.selected_stock);
  };

  handleInputChange = (newValue: string) => {
    console.log("handleInputChange");
    const inputValue = newValue.replace(/\W/g, "");
    this.setState({ inputValue });
    console.log("inputValue ", inputValue);
    return inputValue;
  };
  loadOptions = (inputValue, callback) => {
    if (!inputValue) {
      return callback([]);
    }
    console.log("loadOptions");

    setTimeout(() => {
      console.log("searching", inputValue);
      const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&apikey=${API_KEY}&keywords=${inputValue}`;
      // console.log(url);

      fetch(url)
        .then(res => res.json())
        .then(
          result => {
            console.log(result);

            this.setState({
              candidate_stocks: this.convertFechedStocks(result.bestMatches)
            });
            const options = this.state.candidate_stocks;
            console.log("options", options);
            return callback(options);
          },
          error => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        );
      // callback(this.filterStocks(inputValue));
    }, 500);
  };

  convertFechedStocks = fetchedData => {
    const stocks = fetchedData.map(el => {
      const stock = {};
      stock.symbol = el["1. symbol"];
      stock.name = el["2. name"];

      return {
        value: stock.symbol,
        label: stock.symbol + ":" + stock.name,
        name: stock.name,
        symbol: stock.symbol
      };
    });
    return stocks;
  };

  onChangeSearchBox = e => {
    this.setState({
      keyword: e.target.value
    });
  };

  clickAddButton = e => {
    if (
      !this.state.selected_stock.symbol ||
      !this.state.selected_stock.symbol
    ) {
      console.log("nothing has been selected");
      return;
    }
    let tmp_stock = _.cloneDeep(this.state.selected_stock);
    tmp_stock.id = uuid();
    console.log(this.state.candidate_stocks.length);
    this.props.addStock(tmp_stock);
    //after cleaning
    this.setState({
      selected_stock: this.defaultStock,
      candidate_stocks: [],
      inputValue: ""
    });
    // const input_value = document.getElementById("searchbox").value;
    // const [selected_symbol] = this.state.candidate_stocks.filter(
    //   el => el["1. symbol"] == input_value
    // );
    // console.log("selected_symbol");
    // console.log(selected_symbol);

    // if (this.state.candidate_stocks.length == 0 || !selected_symbol) {
    //   console.log("invalid search word");
    //   return;
    // }
    // console.log("result");

    // //selected_stockに値を代入していく
    // let selected_stock = {};
    // selected_stock.symbol = selected_symbol["1. symbol"];
    // selected_stock.name = selected_symbol["2. name"];
    // selected_stock.market_price = selected_symbol["5. marketOpen"];
    // console.log(selected_stock);
    // this.setState({ selected_stock });
    //document.getElementById("output-test-text").innerHTML = "hoge";
  };

  clickSearchButton = e => {
    let keyword = this.state.keyword.toUpperCase();
    console.log(this.state.keyword);
    if (!keyword) {
      return;
    }
    const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&apikey=${API_KEY}&keywords=${keyword}`;
    // console.log(url);

    fetch(url)
      .then(res => res.json())
      .then(
        result => {
          console.log(result);

          this.setState({
            isLoaded: true,
            candidate_stocks: result.bestMatches
          });
          console.log(this.state.candidate_stocks);
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  };
  // onFocus = () => { this.setState({ searchValue: null }) }

  render() {
    const { selectedOption } = this.state;

    return (
      <div className="container">
        <div className="input-group">
          <AsyncSelect
            cacheOptions
            loadOptions={this.loadOptions}
            //key={JSON.stringify(this.state.selected_stock)}
            //value={this.state.selected_stock}
            // onFocus={this.onFocus}
            placeholder="Search Stocks..."
            defaultOptions
            onInputChange={this.handleInputChange}
            onChange={this.handleChange}
            className="col-sm-6"
          />

          {/*
          <div id="searchbox-group">
            <input
              type="text"
              className="form-control-lg"
              id="searchbox"
              placeholder="Search Stocks..."
              onChange={this.onChangeSearchBox}
              autoComplete="off"
              list="candidate"
            />

            <datalist id="candidate">
              {this.state.candidate_stocks.map((el, index) => (
                <option key={index} value={el["1. symbol"]}>
                  {el["1. symbol"]}:{el["2. name"]}
                </option>
              ))}
            </datalist>
          </div>
          */}
          <span className="input-group-btn">
            <button
              type="button"
              className="btn btn-outline-dark bt-lg"
              onClick={this.clickAddButton}
            >
              ADD <i className="fas fa-hand-holding-usd" />
            </button>
          </span>
        </div>
        <div id="output-test-text">
          {this.state.selected_stock.symbol} {this.state.selected_stock.name}
        </div>
        <div />
      </div>
    );
  }
}

// export default StockSearcher;
const mapStateToProps = (state, props) => {
  return {
    stockState: state.stocksReducer
  };
};
const mapDispatchToProps = dispatch => {
  return {
    addStock: stock => dispatch(addStock(stock)),
    removeStock: stock => dispatch(removeStock(stock))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StockSearcher);
