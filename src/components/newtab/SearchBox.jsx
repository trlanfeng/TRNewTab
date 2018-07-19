import React from "react";
import ReactDom from "react-dom";

// 搜索框组件
class SearchBox extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div class="container search_box">
        <div class="row">
          <div class="col search_bar">
            <div class="search_input mx-auto">
              <img src="images/default.png" alt="" class="search_icon" />
              <input
                type="text"
                class="form-control"
                placeholder="通过 百度 来搜索"
              />
              <button class="search_button">搜索</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
