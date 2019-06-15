require(['./config'], ()=>{
    // 引入config以后就有短名称了
    
    require(['template','url', 'header', 'footer'], (template, url)=>{
   // 写列表页的逻辑
    class List{
        constructor(){
           this.init();
        }
        init(){
            $.get(url.baseUrl + 'list/get', resp => {
               // console.log(resp);
                if(resp.res_code === 200)
                this.render(resp.res_body);
            })
        }
        render(resp){
            //console.log(resp);
            let html = template("bigwrap-container", {resp})
            //console.log(html);
            $("#bigWrap").html(html);
        }
    }
    
    return new List();
    })

})