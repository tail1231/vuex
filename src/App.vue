<template>
  <div id="app">
    <a-input
      placeholder="请输入任务"
      class="my_ipt"
      :value="inputValue"
      @change="handleInputChange"
    />
    <a-button type="primary" @click="handleAddItem">添加事项</a-button>

    <a-list bordered :dataSource="infoList" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox
          @change="
            e => {
              handleCheckClick(e, item.id)
            }
          "
          :checked="item.done"
          >{{ item.info }}</a-checkbox
        >
        <!-- 删除链接 -->
        <a slot="actions" @click="handleRemove(item.id)">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div slot="footer" class="footer">
        <!-- 未完成的任务个数 -->
        <span>{{ unDoneLength }}条剩余</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button
            :type="viewVal == 'all' ? 'primary' : 'default'"
            @click="handleBtnClick('all')"
            >全部</a-button
          >
          <a-button
            :type="viewVal == 'unDone' ? 'primary' : 'default'"
            @click="handleBtnClick('unDone')"
            >未完成</a-button
          >
          <a-button
            :type="viewVal == 'done' ? 'primary' : 'default'"
            @click="handleBtnClick('done')"
            >已完成</a-button
          >
        </a-button-group>
        <!-- 把已经完成的任务清空 -->
        <a @click="removeAllDone">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
import { mapGetters, mapState, mapMutations } from 'vuex'
export default {
  name: 'app',
  data() {
    return {}
  },
  created() {
    this.$store.dispatch('getList')
  },
  computed: {
    ...mapGetters(['unDoneLength', 'infoList']),
    ...mapState(['list', 'inputValue', 'viewVal'])
  },
  methods: {
    ...mapMutations([
      'changeInputValue',
      'addItemToList',
      'removeItem',
      'checkboxChangeHandle',
      'clean',
      'changeViewValue'
    ]),
    handleInputChange(e) {
      this.$store.commit('changeInputValue', e.target.value)
      console.log(e.target.value)
    },
    //向列表中新增item项
    handleAddItem() {
      if (this.inputValue.trim().length <= 0) {
        return this.$message.warning('文本框内容不能为空！')
      } else {
        this.addItemToList()
      }
    },
    //删除
    handleRemove(id) {
      this.removeItem(id)
    },
    //点击复选框
    handleCheckClick(e, id) {
      const {
        target: { checked }
      } = e
      let obj = {
        checked: checked,
        id: id
      }
      this.checkboxChangeHandle(obj)
    },
    //清除已完成
    removeAllDone() {
      this.clean()
    },
    //按钮点击
    handleBtnClick(val) {
      // this.$store.dispatch('getList')
      this.changeViewValue(val)
    }
  }
}
</script>

<style scoped>
#app {
  padding: 10px;
}

.my_ipt {
  width: 500px;
  margin-right: 10px;
}

.dt_list {
  width: 500px;
  margin-top: 10px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
