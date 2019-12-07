import errorModal from './error-dialog'

export default {
    install(Vue) {
        Vue.component('errorModal', errorModal)
    }
}
