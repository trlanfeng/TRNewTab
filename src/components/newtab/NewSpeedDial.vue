<template>
      <!-- Modal -->
    <form id="newSD">
        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="myModalLabel">添加</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="exampleInputPassword1">名称：</label>
                            <input type="text" class="form-control" id="new_name" placeholder="不填写则默认显示网址">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">网址：</label>
                            <input type="url" class="form-control" id="new_url" placeholder="请填入网址" required="required">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <!-- <button id="button_getPageInfo" type="button" class="btn btn-info">获取</button> -->
                        <button id="button_add_cancle" type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                        <button id="button_add_speeddial" type="button" class="btn btn-primary">添加</button>
                    </div>
                </div>
            </div>
        </div>
    </form>
</template>
