define(['jquery'], () => {
    class Header{
        constructor () {
            this.container = $("#header-container");
            this.load().then(() => {
                // 操作header里面的事件
                this.changeShopNum();
            })
        }
        load(){
            return new Promise(resolve => {
                this.container.load('/html/model/header.html', () => {
                    resolve();
                });
            })
        }
        
        changeShopNum () {
            // 取到localstorage里面的数据
            let localstorage = JSON.parse(localStorage.getItem('cart'));
            //console.log(localstorage);
            let arr = [];
            localstorage.map(function(item, index){
                //console.log(item);
                //console.log(item.cartNum);
                arr.push(item.cartNum);
                return arr;
            })
            //console.log(arr);
            let i = 0;
            for(var value of arr){
                i += value;
            }
            //console.log(i);
            $(".shopNum").html(i);
        }
    }
    return new Header();
});