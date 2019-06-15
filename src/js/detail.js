require(['./config'], ()=>{
    // 引入config以后就有短名称了
    require(['template','url','header', 'footer', 'fly', 'zoom'], (template, url, header)=>{
   // 写详情页的逻辑
    class Detail{
        constructor(){
           this.init();
          //  console.log(typeof this,222)

        }
      init(){
        // 获取携带点击跳转携带的id
        let id = Number(location.search.slice(4));
        this.id = id;
        // 根据id,发送请求,获得数据存在resp里面
        $.get(url.baseUrl + 'detail/get', {id}, resp => {
          // 获取到的数据
          if(resp.res_code === 200){
            //resp.res_body.id = this.id; 
            this.data = {
              id : id,
              name : resp.res_body.detail_title,
              price : resp.res_body.detail_price,
              imag:resp.res_body.re_img
            }
            //console.log(this.data);
            this.render(resp.res_body);
            this.shopNumDown();
            this.shopNumUp();
          }
        })
        //console.log(this);
      }
      // 接收传送过来的参数resp.res_body
      render(resp) {
        let html = template("template-container", {resp})
        //console.log(html);
        $("#wrap-container").html(html);
        this.zoom();
        this.addCart();
      }

      // 加入购物车
      addCart(){
        // 存this指针
        //let _this = this;
        $("#ButtonAddCart").on('click', () => {
          // 获得输入之后的购物车数量
           this.data = {
             ...this.data,
             cartNum : Number($("#cartNum").val())
           }
          let cartList = localStorage.getItem('cart');//第一次为空
          // 判断是否含有数据
          if(cartList){
            // 如果包含了购物车数据
            cartList = JSON.parse(cartList);
            let i = -1;
            let isExist = cartList.some((cart, index) => {
              i = index;
              return cart.id === this.data.id;
            })
            //console.log(isExist);//true
            if(isExist){
              cartList[i].cartNum += this.data.cartNum;
            }else{
              cartList.push(this.data);
            }
            localStorage.setItem('cart', JSON.stringify(cartList));
          }else{
            //没有存过购物车为空
            //创建空数组来进行存当前一条的数据
            var arr = [];
            arr[0] = this.data;
            //console.log(arr[0],111);
            let str = JSON.stringify(arr);
            //console.log(str);
            localStorage.setItem('cart', str);
          }
          $('<img src="http://s2.hgcang.com/bsimg/ec/public/images/f0/df/f0df1ac84be8f1850dbabfcc83e0c06a.png" style="width:60px;height:60px">')
          .fly({
            start: $("#ButtonAddCart").offset(),
            end: $("#addcartimg").offset(),
             // autoPlay: true, //是否直接运动,默认true
            // speed: 1.1, //越大越快，默认1.2
            //vertex_Rtop：100, //运动轨迹最高点top值，默认20
            onEnd: function(){
              console.log(this)
              this.destroy();
            } //结束回调
          })
          header.changeShopNum();
        })
      }

      //点击改变数量
      shopNumDown(){
        let _this = this;
        $(".count").on('click', ".less", function(){
          let value = $(this).siblings(".cart-num").val();
          value--;
          if(value <= 1){
            value = 1;
          }else{}
          $(this).siblings(".cart-num").val(value);
        }) 
           
     }
     // 增加数量
     shopNumUp(){
        let _this = this;
        $(".count").on('click', ".more", function(){
          let value = $(this).siblings(".cart-num").val();
          value++;
          $(this).siblings(".cart-num").val(value);
        })
     }

      zoom() {
        //装容器的盒子
        $(".zoom-img").elevateZoom({
            gallery: 'gal1', //ul父级盒子的id
            cursor: 'pointer',
            borderSize: '1',
            galleryActiceClass: 'active',
            borderColor: '#f2f2f2'
        });
    }

    }
    
    return new Detail();
    })

})