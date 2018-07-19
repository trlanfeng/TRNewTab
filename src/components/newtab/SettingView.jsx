// 设置组件

class SettingView extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div
        class="modal fade"
        id="modal_settings"
        tabindex="-1"
        role="dialog"
        aria-labelledby="modal_settings_label"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <ul class="nav nav-pills" id="myTab" role="tablist">
                <li class="nav-item">
                  <a
                    class="nav-link active"
                    id="home-tab"
                    data-toggle="tab"
                    href="#home"
                    role="tab"
                    aria-controls="home"
                    aria-selected="true"
                  >
                    常规
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    id="profile-tab"
                    data-toggle="tab"
                    href="#profile"
                    role="tab"
                    aria-controls="profile"
                    aria-selected="false"
                  >
                    搜索
                  </a>
                </li>
              </ul>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="container-fluid">
                <div class="row">
                  <div class="col">
                    <div class="tab-content" id="myTabContent">
                      <div
                        class="tab-pane fade show active"
                        id="home"
                        role="tabpanel"
                        aria-labelledby="home-tab"
                      >
                        <div class="form-group">
                          <label>壁纸类型：</label>
                          <select id="bgTypeSelector" class="form-control">
                            <option value="0">
                              使用第三方壁纸（每日更换）
                            </option>
                            <option value="1">
                              使用必应官方地址（每日更换，无法缓存）
                            </option>
                            <option value="2">使用网络图片地址</option>
                            <option value="3">使用本地图片</option>
                          </select>
                        </div>
                        <div class="networkImage">
                          <div class="form-group">
                            <label>网络图片地址：</label>
                            <input
                              type="text"
                              class="form-control"
                              id="networkImageUrl"
                              placeholder="请填写网络图片地址"
                            />
                          </div>
                        </div>
                        <div class="localImage">
                          <div class="form-group">
                            <label>选择本地图片：</label>
                            <input
                              type="file"
                              class="form-control-file"
                              id="bgSelector"
                            />
                          </div>
                        </div>
                      </div>
                      <div
                        class="tab-pane fade"
                        id="profile"
                        role="tabpanel"
                        aria-labelledby="profile-tab"
                      >
                        <div class="form-group">
                          <label>是否开启搜索：</label>
                          <input
                            type="checkbox"
                            class="switch-search float-right"
                            checked
                          />
                        </div>
                        <div class="search_settings">
                          <div class="form-group">
                            <label>搜索名称：</label>
                            <input
                              type="text"
                              class="form-control"
                              id="search_title"
                              placeholder="请填写搜索名称"
                            />
                          </div>
                          <div class="form-group">
                            <label>搜索地址：</label>
                            <input
                              type="text"
                              class="form-control"
                              id="search_url"
                              placeholder="请填写搜索地址"
                            />
                          </div>
                          <div class="form-group">
                            <label>图标地址：</label>
                            <input
                              type="text"
                              class="form-control"
                              id="search_icon"
                              placeholder="请填写图标地址"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer" />
          </div>
        </div>
      </div>
    );
  }
}
