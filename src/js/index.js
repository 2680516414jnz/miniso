require(['./config'], ()=>{
    // 引入config以后就有短名称了
    require(['template','url', 'swiper', 'header', 'footer'], (template, url, Swiper)=>{
   // 写首页的逻辑
    class Index{
        constructor(){
            this.swiper()
            this.newProduct()
        }
        // 轮播图
        swiper(){
            var mySwiper = new Swiper ('.swiper-container', {
                // direction: 'vertical', // 垂直切换选项
                loop: true, // 循环模式选项
                
                // 如果需要分页器
                pagination: {
                  el: '.swiper-pagination',
                },
                
                // 如果需要前进后退按钮
                navigation: {
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
                },
                
              })        
        }
        // 新品
        newProduct() {
            // 发送ajax请求
            $.get(url.baseUrl + 'banner/get', resp => {
                //console.log(resp);
                if(resp.res_code == 200){
                    this.render(resp.res_body.newWrap);
                }
            });
        }
        render(resp){
            console.log(resp);
            let html = template("main-template", {resp})
            console.log(html);
            $("#main-container").html(html);
        }
    }
    
    return new Index();
    })

})