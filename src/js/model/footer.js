define(['jquery'], () => {
    class Footer{
        constructor () {
            this.container = $("#footer-container");
            this.load().then(() => {
                // 操作header里面的事件
                this.search();
            })
        }
        load(){
            return new Promise(resolve => {
                this.container.load('/html/model/footer.html', () => {
                    resolve();
                });
            })
        }
        
        search () {

        }
    }


    return new Footer();
});