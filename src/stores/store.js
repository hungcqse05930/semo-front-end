/* eslint-disable */
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'
import router from '../router/index.js'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [createPersistedState()],
    state: {
        // token: VueCookie.get('token') || null
        user: {
            id: null,
            token: null,
            img_dir: null,
            info: {}
        },
        new_user: {
            phone: ''
        },
        new_identity: {
            front_img_url: '',
            back_img_url: '',
            name: '',
            number: '',
            date_dist: '',
        }
    },
    getter: {
        user: state => state.user,
        token: state => state.user.token,
        new_user: state => state.new_user,
        phone: state => state.new_user.phone,
        first_bids: state => state.user.first_bids
    },
    mutations: {
        SET_UP_SESSION: (state, user) => {
            state.user = user
        },
        SET_USER_ID: (state, id) => {
            state.user.id = id
        },
        DESTROY_SESSION: (state) => {
            state.user.id = null
            state.user.token = null
            state.user.img_dir = null
        },
        // SIGN UP
        SET_SIGN_UP_PHONE: (state, phone) => {
            state.new_user.phone = phone
        },
        // SET_USER_BIDS
        SET_USER_BIDS: (state, isFirstBid) => {
            state.user.bids = isFirstBid
        }
    },
    actions: {
        LOGIN: ({ commit, state }, user) => {
            return new Promise((ressolve, reject) => {
                axios.post(`/user/login`, user)
                    .then(response => {
                        if (response.status === 200) {
                            commit('SET_UP_SESSION', response.data)

                            axios.get(`/auction_bid/countBid/${state.user.id}`).then(response => {
                                commit("SET_USER_BIDS", response.data.times > 0 ? false : true)
                            })
                        }
                        ressolve(true)
                    })
                    .catch(error => {
                        if (error.response.status === 500) {
                            error.message = "Có vẻ số điện thoại này chưa được đăng ký ở semo. Bạn hãy kiểm tra lại đi."
                        } else if (error.response.status === 401) {
                            error.message = "Hãy kiểm tra mật khẩu của bạn nhé!"
                        }
                        reject(error)
                    })
            })
        },
        LOGOUT: ({ commit, state }) => {
            if (state.user.token !== null) {
                commit('DESTROY_SESSION')
            }
        },
        SEARCH: ({ commit }, keyword) => {
            router.push({ path: '/search/' + keyword.keyword })
        },
        SIGN_UP_PHONE: ({ commit }, user) => {
            commit('SET_SIGN_UP_PHONE', user.phone)
            router.push({ path: "/register/otp" });
        },
        SIGN_UP_PASSWORD: ({ state }, user) => {
            return new Promise((ressolve, reject) => {
                axios.post('/user/signup', {
                    phone: state.new_user.phone,
                    password: user.password
                }).then(() => {
                    ressolve(true)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        SIGN_UP_INFO: ({ state }, info) => {
            return new Promise((ressolve, reject) => {
                axios.put('/user/info', {
                    id: state.user.id,
                    name: info.name,
                    dob: info.dob,
                    gender: info.gender
                }).then(() => {
                    ressolve(true)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        CHANGE_FIRST_BIDS: ({ commit }) => {
            commit("SET_USER_BIDS", false)
        }
    }
});