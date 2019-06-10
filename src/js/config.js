require.config({
    baseUrl:'/',
    paths:{
        jquery:'libs/jquery/jquery-3.2.1.min',
        header:'js/model/header',
        footer:'js/model/footer',
        swiper:'libs/swiper/js/swiper.min',
        url:'js/model/url',
        template:'libs/art-template/template-web'
    },
    // 垫片，给不满足于AMD规范的插件但又依赖于别的模块
    shim : {
        "swiper":{
            deps:['jquery']
        }
    }
})