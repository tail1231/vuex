import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: [], //所有的任务列表
    inputValue: 'aaa', //文本框的内容
    nextId: 5, //下一个id
    viewVal: 'all'
  },
  mutations: {
    initList(state, list) {
      state.list = list
    },
    changeInputValue(state, val) {
      console.log('changeInputValue', val)
      state.inputValue = val
    },
    //添加列表项
    addItemToList(state) {
      const obj = {
        id: state.nextId,
        info: state.inputValue.trim(),
        done: false
      }
      state.list.push(obj)
      state.nextId++
      state.inputValue = ''
    },
    removeItem(state, i) {
      const o = state.list.findIndex(x => x.id == i)
      if (o != -1) {
        state.list.splice(o, 1)
      }
    },
    checkboxChangeHandle(state, obj) {
      const i = state.list.findIndex(x => x.id == obj.id)
      if (i != -1) {
        state.list[i].done = obj.checked
      }
    },
    clean(state) {
      state.list = state.list.filter(x => x.done === false)
    },
    changeViewValue(state, val) {
      console.log(state, val)
      state.viewVal = val
      switch (val) {
        case 'all':
          console.log(this);
          this.dispatch('getList')
          break
        case 'unDone':
          state.list = state.list.filter(x => x.done === false)
          break
        case 'done':
          state.list = state.list.filter(x => x.done === true)
          break
      }
    }
  },
  actions: {
    getList(context) {
      axios.get('/list.json').then(({ data }) => {
        console.log(data)
        context.commit('initList', data)
      })
    }
  },
  modules: {},
  getters: {
    showList(state) {
      return state.list
    },
    unDoneLength(state) {
      return state.list.filter(x => x.done === false).length
    },
    infoList(state) {
      if (state.viewVal === 'all') {
        return state.list
      }
      if (state.viewVal === 'unDone') {
        return state.list.filter(x => x.done === false)
      }
      if (state.viewVal === 'done') {
        return state.list.filter(x => x.done === true)
      }
      return state.list
    }
  }
})
