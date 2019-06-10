define(['jquery'], () => {
    class Header{
        constructor () {
            this.container = $("#header-container");
            this.load().then(() => {
                // 操作header里面的事件
                this.search();
            })
        }
        load(){
            return new Promise(resolve => {
                this.container.load('/html/model/header.html', () => {
                    resolve();
                });
            })
        }
        
        search () {

        }
    }


    return new Header();
});