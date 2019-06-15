require.config({
    baseUrl:'/',
    paths:{
        jquery:'libs/jquery/jquery-3.2.1.min',
        header:'js/model/header',
        footer:'js/model/footer',
        swiper:'libs/swiper/js/swiper.min',
        url:'js/model/url',
        // template 是用来渲染数据的，{{}}
        template:'libs/art-template/template-web',
        cookie: 'libs/jquery-plugins/jquery.cookie',
        zoom: 'libs/jquery-plugins/jquery.elevateZoom-3.0.8.min',
        fly: 'libs/jquery-plugins/jquery.fly'
    },
    // 垫片，给不满足于AMD规范的插件但又依赖于别的模块
    shim : {
        "swiper":{
            deps:['jquery']
        },
        "cookie": {
            deps: ['jquery']
        },
        "zoom": {
            deps: ['jquery']
        },
        "fly": {
            deps: ['jquery']
        }
    }
})