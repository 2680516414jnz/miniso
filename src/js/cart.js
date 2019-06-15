require(['./config'], ()=>{
//     // 引入config以后就有短名称了
    require(['template','url','header', 'footer', 'fly', 'zoom'], (template, url, header)=>{
        class Cart{
            constructor(){
                this.init();
            }
            init(){
                // 取到加入购物车的信息，在localStorage里面
               let data = JSON.parse(localStorage.getItem('cart'));
                this.render(data);
                this.simpleBtn();
                this.shopNumDown();
                this.shopNumUp();
                this.clearShop();
                this.removeLi();
                this.calPrice();
                this.allMoney();
                this.checkAll();
            }
            render(data){
                let html = template("car-template", {data});
               //console.log(html);
                $("#car-container").html(html);
            }
                // 取一个数组里面内容的方式
               // console.log($(".cart-num").eq(0).val())
                // console.log($(".cart-num").eq(1).val());
                // 用循环遍历,循环内容相反，首先是下标index，内容item
                /* $(".cart-num").each((index, item)=>{
                    //console.log($(item).val())
                    // 这是原生数据
                    console.log(item);
                    // 这是jquery取数据的方式
                    console.log($(item));
                    // 取得item里面的内容
                    console.log($(item).val());
                }) */

                //清空购物车
                clearShop(){
                    let _this = this;
                    $("#clearShop").on('click', () => {
                        //console.log($("#clearShop"))
                        localStorage.removeItem('cart');
                        this.render();
                        alert("购物车为空，请重新添加,回到首页");
                        window.open("http://localhost:2333/index.html",'_self');
                        _this.allMoney();
                        header.changeShopNum();
                    })
                } 

                // 删除一个商品
                removeLi(){
                    let _this = this;
                    $(".shoplist").on('click', ".del", function() {
                       // console.log($(this));//$(this)指的是del这个选择器
                        let id = $(this).parents(".shoplist").attr("data-id");
                        //console.log(id)
                        //console.log(id);
                        let cart = localStorage.getItem('cart');
                        cart = JSON.parse(cart);
                        cart = cart.filter(function(index, item){
                            // 过滤掉与if条件不相符的数据，返回剩下的数据
                            if(id !== cart.id){
                                return item;
                            }
                        })
                        localStorage.setItem('cart',JSON.stringify(cart));
                        $(this).parents(".shoplist").remove();
                        _this.allMoney();
                        header.changeShopNum();
                    })
                }
                // 计算单件商品总价
                calPrice(){
                    $(".shopprice").each((index, item)=>{
                        let sun = Number($(item).parent(".price").siblings(".count").find("input").val())*Number(parseFloat($(item).html()));
                        $(item).parent(".price").siblings(".subtotal").html(sun);
                        let i = Number($(item).parent(".price").siblings(".subtotal").html()).toFixed(2);
                        $(item).parent(".price").siblings(".subtotal").html(i);
                    })
                }
                // 计算商品总价
                allMoney(){
                    let sun = [];
                    let i = 0;
                    //console.log($(".item-checkbox"))
                    $(".item-checkbox").each((index, item) => {
                       // console.log($(item).hasClass("x-checkboxC"));
                        if($(item).hasClass("x-checkboxC")){
                            let i = $(item).parent(".shoplist").find(".subtotal").html();
                            sun.push(Number(i))
                        }
                    })
                    for(var value of sun){
                        i += value;                    
                    }
                    i = i.toFixed(2);
                    $("#cartPayCount").html(i);
                }
                // 单选按钮
                simpleBtn(){
                    // 事件委托
                    let _this = this;
                    this.i = 0;
                    $(".shoplist").on('click', ".item-checkbox", function(){
                        //let clickId = Number($(this).parents(".shoplist").attr("data-id"));
                        if($(this).hasClass("x-checkboxC")){
                            $(this).removeClass("x-checkboxC");
                            _this.i--;;
                        }else{
                            $(this).addClass("x-checkboxC");
                            _this.i++;
                        }
                        if(_this.i >= Number($(".item-checkbox").length)){
                            $(".chooseAll").each((index, item)=>{
                                $(item).addClass("x-checkboxC");
                            })
                        }else{
                            $(".chooseAll").each((index, item)=>{
                                $(item).removeClass("x-checkboxC");
                            })
                        }
                        _this.allMoney();
                    })
                }
                // 全选按钮
                checkAll(){
                    //let _this = this;
                    $(".chooseAll").on('click',() => {
                        // 如果点击单选之后，没有全部选中，则把剩下的所有li选中，i的值改为所有的li的长度
                        // 如果点击时都没有选中，则全部选中i的值改为所有的li的长度
                        //如果点击的时候全部选中，则全部取消，i的值改为0;
                        if(this.i < Number($(".item-checkbox").length)){
                            $(".x-checkbox").each((index, item)=>{
                                if(!$(item).hasClass("x-checkboxC")){
                                    $(item).addClass("x-checkboxC");
                                    this.i = Number($(".item-checkbox").length);
                                }
                            })
                        }else{
                            $(".x-checkbox").each((index, item)=>{
                                if($(item).hasClass("x-checkboxC")){
                                    $(item).removeClass("x-checkboxC");
                                    this.i = 0;
                                }
                            })
                        }
                        this.allMoney();
                    })
                }

             //点击变更数量
             shopNumDown(){
                let _this = this;
                // 事件委托
                $(".count").on('click', ".less", function(){
                    //console.log(Number($(this).siblings(".cart-num").val()));
                    // shopnum是商品数目
                    let shopnum = Number($(this).siblings(".cart-num").val());
                    shopnum--;
                    if(shopnum < 1){
                        shopnum = 1;
                    }else{}
                    $(this).siblings(".cart-num").val(shopnum)
                    //console.log(shopnum,33);
                    // 修改localstorage里面的数据
                    let cart = JSON.parse(localStorage.getItem('cart'));
                    //console.log($(this).parents(".shoplist").attr("data-id"))
                    let id = $(this).parents(".shoplist").attr("data-id");
                    //console.log(Number(id));
                    // 判断减少的是哪一条数据
                    cart = cart.map(function (arr) { 
                        //console.log(arr);
                        if(arr.id === Number(id)){
                            arr.cartNum = shopnum;
                        }else{}
                        return arr;
                    })
                    // 把json数据转换成string格式
                    //console.log(JSON.stringify(cart));
                    localStorage.setItem('cart',JSON.stringify(cart));
                    _this.calPrice();
                    _this.allMoney();
                    header.changeShopNum();
                })
             }
             // 增加数量
             shopNumUp(){
                let _this = this;
                $(".count").on('click', ".more", function(){
                    // 获取商品数量
                    let shopnum = Number($(this).siblings(".cart-num").val());
                    // 实现自增
                    shopnum++;
                    $(this).siblings(".cart-num").val(shopnum);
                    let id = $(this).parents(".shoplist").attr("data-id");
                    // 获取localstorage里面的数据
                    let cart = JSON.parse(localStorage.getItem('cart'));
                    // 判断增加的是哪一条数据
                    cart = cart.map(function (arr) {
                        //console.log(arr.id === Number(id))
                        if(arr.id === Number(id)){
                            arr.cartNum = shopnum;
                        }else{}
                        return arr;
                    }) 
                    // 把json数据转换成string格式
                    //console.log(cart);
                    localStorage.setItem('cart',JSON.stringify(cart));
                    _this.calPrice();
                    _this.allMoney();
                    header.changeShopNum();
                })
             }
        }
        return new Cart();
    })
    
})
   