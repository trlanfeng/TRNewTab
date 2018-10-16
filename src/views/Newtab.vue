<template>
    <div>
        <div class="bg" :style="bgStyle"></div>
        <div class="topbar">
            <button @click="isCreateShow=true">
                <img src="../assets/images/add.png">
                <span>新增</span>
            </button>
            <button @click="toggleEditMode()">
                <img src="../assets/images/edit.png">
                <span>管理</span>
            </button>
            <button @click="isSettingShow=true">
                <img src="../assets/images/setting.png">
                <span>设置</span>
            </button>
        </div>
        <div class="search_box" v-show="userdata.isSearchOpen">
            <img :src="userdata.searchIcon" :alt="userdata.searchTitle" class="search_icon">
            <input
                type="text"
                @keyup.enter="search"
                class="form-control"
                v-model="keywords"
                :placeholder="'通过 '+ userdata.searchTitle +' 来搜索'"
            >
            <button class="search_button" @click="search">搜索</button>
        </div>
        <div id="SpeedDialContainer">
            <draggable
                v-model="userdata.list"
                :options="draggableOptions"
                class="SpeedDialBox"
                @end="moveItem"
            >
                <div
                    v-for="(item,index) in userdata.list"
                    :key="index"
                    class="col-12 col-sm-4 col-md-3 col-lg-3"
                >
                    <div class="speeddial" :class="{move:isEditMode}">
                        <div class="info">
                            <a :href="item.url" class="block" :title="item.name">
                                <div class="icon">
                                    <img
                                        class="icon_img"
                                        :src="item.url | getFavIconUrl"
                                        :alt="item.name"
                                        @load="imgLoad($event)"
                                        @error="imgError($event)"
                                    >
                                    <span class="word">{{item.name | getFirstWord}}</span>
                                </div>
                                <span class="title">{{item.name}}</span>
                            </a>
                            <div @click="removeItem(index)" v-if="isEditMode" class="close_button">
                                <img src="../assets/images/delete.png">
                            </div>
                        </div>
                        <div class="other" v-if="isEditMode">
                            <div class="drag">
                                <img class="drag_handle" src="../assets/icons/drag.png" alt="拖拽移动">
                            </div>
                            <div class="link">{{item.url}}</div>
                        </div>
                    </div>
                </div>
            </draggable>
        </div>
        <div class="create_box my-modal" v-show="isCreateShow">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">添加</h5>
                        <button type="button" class="close" @click="isCreateShow=false">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label>名称：</label>
                            <input
                                type="text"
                                class="form-control"
                                v-model="create_name"
                                placeholder="不填写则默认显示网址"
                            >
                        </div>
                        <div class="form-group">
                            <label>网址：</label>
                            <input
                                type="url"
                                class="form-control"
                                v-model="create_url"
                                placeholder="请填入网址"
                                required="required"
                            >
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" @click="isCreateShow=false">取消</button>
                        <button type="button" class="btn btn-primary" @click="createSpeedDial">添加</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="setting_box my-modal" v-show="isSettingShow">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <ul class="nav nav-pills">
                            <li class="nav-item">
                                <span
                                    class="nav-link"
                                    :class="{active:settingIndex==0}"
                                    @click="settingIndex=0"
                                >壁纸</span>
                            </li>
                            <li class="nav-item">
                                <span
                                    class="nav-link"
                                    :class="{active:settingIndex==1}"
                                    @click="settingIndex=1"
                                >搜索</span>
                            </li>
                        </ul>
                        <button type="button" class="close" @click="isSettingShow=false">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="tab-pane" v-show="settingIndex==0">
                            <div class="form-group">
                                <label>壁纸类型：</label>
                                <select
                                    class="form-control"
                                    v-model="userdata.bgType"
                                    @change="bgTypeChange"
                                >
                                    <!-- <option value="0">使用第三方壁纸（每日更换）</option> -->
                                    <option :value="1">使用必应官方地址（每日更换）</option>
                                    <option :value="2">使用网络图片地址</option>
                                    <option :value="3">使用本地图片</option>
                                </select>
                            </div>
                            <div class="networkImage" v-show="userdata.bgType==2">
                                <div class="form-group">
                                    <label>网络图片地址：</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        v-model="userdata.bgUrl"
                                        placeholder="请填写网络图片地址"
                                    >
                                </div>
                            </div>
                            <div class="localImage" v-show="userdata.bgType==3">
                                <div class="form-group">
                                    <label>选择本地图片：</label>
                                    <input
                                        type="file"
                                        @change="localBackground($event)"
                                        class="form-control-file"
                                    >
                                </div>
                            </div>
                            <div class="blur_range">
                                <div class="form-group">
                                    <label for="customRange1">模糊度：{{userdata.bgBlur}}</label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        step="1"
                                        v-model="userdata.bgBlur"
                                        class="custom-range"
                                        id="customRange1"
                                    >
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane" v-show="settingIndex==1">
                            <div class="form-group switcher_box">
                                <label>是否开启搜索：</label>
                                <toggle-button
                                    class="switcher"
                                    :speed="150"
                                    :height="32"
                                    :width="55"
                                    v-model="userdata.isSearchOpen"
                                />
                            </div>
                            <div class="search_settings">
                                <div class="form-group">
                                    <label>搜索名称：</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        v-model="userdata.searchTitle"
                                        placeholder="请填写搜索名称"
                                    >
                                </div>
                                <div class="form-group">
                                    <label>搜索地址：</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        v-model="userdata.searchUrl"
                                        placeholder="请填写搜索地址（例如：https://www.baidu.com/s?wd=）"
                                    >
                                </div>
                                <div class="form-group">
                                    <label>图标地址：</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        v-model="userdata.searchIcon"
                                        placeholder="请填写图标地址（例如：https://www.baidu.com/favicon.ico）"
                                    >
                                </div>
                            </div>
                        </div>
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