import React from "react";
import ReactDom from "react-dom";

// 顶部组件
class TopBar extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div class="container-fluid">
        <div class="row">
          <div class="col control">
            <button id="new_button" data-toggle="modal" data-target="#myModal">
              <img src="./images/add.png" />
              <span>新增1114444</span>
            </button>
            <button id="edit_button">
              <img src="./images/edit.png" />
              <span>管理</span>
            </button>
            <button id="setting_button">
              <img src="./images/setting.png" />
              <span>设置</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = TopBar;