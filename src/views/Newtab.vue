<template>
    <div>
        <div class="topbar">
            <button id="new_button" @click="isCreateShow=true">
                <img src="~/assets/images/add.png">
                <span>新增</span>
            </button>
            <button id="edit_button" @click="toggleEditMode()">
                <img src="../assets/images/edit.png">
                <span>管理</span>
            </button>
            <button id="setting_button" @click="isSettingShow=true">
                <img src="../assets/images/setting.png">
                <span>设置</span>
            </button>
        </div>
        <div class="search_box">
            <img src="../assets/images/default.png" alt="" class="search_icon">
            <input type="text" class="form-control" v-model="keywords" placeholder="通过 百度 来搜索">
            <button class="search_button" @click="search">搜索</button>
        </div>
        <div id="SpeedDialContainer">
            <draggable v-model="userdata.list" :options="draggableOptions" class="SpeedDialBox" @end="sdMoved">
                <div v-for="(item,index) in userdata.list" :key="index" class="speeddial col-12 col-sm-4 col-md-3 col-lg-3">
                    <a :href="item.url" class="block" :title="item.name">
                        <div class="icon">
                            <img class="drag_handle" v-if="isEditMode" src="../assets/icons/drag.png" alt="拖拽移动">
                            <img class="icon_img" :src="item.url | getFavIconUrl" :alt="item.name" @load="imgLoad($event)"
                                @error="imgError($event)">
                            <span class="word">{{item.name | getFirstWord}}</span>
                        </div>
                        <span class="title">{{item.name}}</span>
                    </a>
                    <div :id="'delete_button_'+index" v-if="isEditMode" class="close_button"><img src="../assets/images/delete.png"></div>
                </div>
            </draggable>
        </div>
        <div class="create_box my-modal" v-show="isCreateShow">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="myModalLabel">添加</h5>
                        <button type="button" class="close" @click="isCreateShow=false">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="exampleInputPassword1">名称：</label>
                            <input type="text" class="form-control" v-model="create_name" placeholder="不填写则默认显示网址">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">网址：</label>
                            <input type="url" class="form-control" v-model="create_url" placeholder="请填入网址" required="required">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <!-- <button id="button_getPageInfo" type="button" class="btn btn-info">获取</button> -->
                        <button type="button" class="btn btn-default" @click="isCreateShow=false">
                            取消
                        </button>
                        <button type="button" class="btn btn-primary" @click="createSpeedDial">添加</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="setting_box my-modal" id="modal_settings" v-show="isSettingShow">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <ul class="nav nav-pills" id="myTab" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab"
                                    aria-controls="home" aria-selected="true">常规</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab"
                                    aria-controls="profile" aria-selected="false">搜索</a>
                            </li>
                        </ul>
                        <button type="button" class="close" @click="isSettingShow=false">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col">
                                    <div class="tab-content" id="myTabContent">
                                        <div class="tab-pane fade show active" id="home" role="tabpanel"
                                            aria-labelledby="home-tab">
                                            <div class="form-group">
                                                <label>壁纸类型：</label>
                                                <select id="bgTypeSelector" class="form-control">
                                                    <!-- <option value="0">使用第三方壁纸（每日更换）</option> -->
                                                    <option value="1">使用必应官方地址（每日更换，无法缓存）</option>
                                                    <option value="2">使用网络图片地址</option>
                                                    <option value="3">使用本地图片</option>
                                                </select>
                                            </div>
                                            <div class="networkImage">
                                                <div class="form-group">
                                                    <label>网络图片地址：</label>
                                                    <input type="text" class="form-control" id="networkImageUrl"
                                                        placeholder="请填写网络图片地址">
                                                </div>
                                            </div>
                                            <div class="localImage">
                                                <div class="form-group">
                                                    <label>选择本地图片：</label>
                                                    <input type="file" class="form-control-file" id="bgSelector">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                            <div class="form-group">
                                                <label>是否开启搜索：</label>
                                                <input type="checkbox" class="switch-search float-right" checked>
                                            </div>
                                            <div class="search_settings">
                                                <div class="form-group">
                                                    <label>搜索名称：</label>
                                                    <input type="text" class="form-control" id="search_title"
                                                        placeholder="请填写搜索名称">
                                                </div>
                                                <div class="form-group">
                                                    <label>搜索地址：</label>
                                                    <input type="text" class="form-control" id="search_url" placeholder="请填写搜索地址">
                                                </div>
                                                <div class="form-group">
                                                    <label>图标地址：</label>
                                                    <input type="text" class="form-control" id="search_icon"
                                                        placeholder="请填写图标地址">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <!-- <button id="button_add_cancle" type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                        <button id="button_add_speeddial" type="button" class="btn btn-primary">添加</button> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
    import Newtab from "~/assets/scripts/Newtab";
    export default Newtab;
</script>