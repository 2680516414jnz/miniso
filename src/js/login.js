require(['./config'], () => {
    require(['url', 'header', 'footer'], (url, header)=>{
        class Login{
           constructor(){
            this.bandEvent();
           }

           bandEvent(){
            $("#submit-btn").on('click', () => {
                let username = $("#username").val();
                let password = $("#password").val();
            //   发送请求
                $.ajax({
                    url:url.basePhpUrl + 'user/login.php',
                    type:"post",
                    data: {username, password} ,
                    success: data => {
                        if (data.res_code === 1) {
                            alert(data.res_message);
                            window.open("http://localhost:2333/index.html", '_self');
                        }else{
                            alert(data.res_message);
                        }
                    },
                    dataType: 'json'
                })

            })
           }
           
        }
        return new Login();
    })
})