import Vue from 'vue'
import Vuex from 'vuex'
// import mutations from './mutations'
// import actions from './actions'


Vue.use(Vuex);
var that = this;
var state = {
    index : 1,
    user : '',
}
const mutations = {
    donIndex(state){
        state.index++;
    }
}

const actions = {
    donIndex:(context)=>{
        context.commit('donIndex');
    },

}

const getters = {
    index:(state)=>{return state.index},
    user:(state)=>{return state.user},
    picUrl:(state)=>{return state.user.headPic}
}

export default new Vuex.Store({
        state,
		mutations,
        actions,
        getters
	
})