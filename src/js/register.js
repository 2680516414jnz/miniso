require(['./config'], () => {
    require(['url','header','footer'], (url, header) => {
        //console.log($("#registerBtn"));
        class Register{
            constructor(){
                //this.temp = $("#registerBtn");
                this.bandEvent();
            }

            bandEvent () {
                //console.log( this.temp);
                //this.temp.addClass("register");
                
                $("#submit-btn").on('click', () =>{
                    let username = $("#username").val();
                    let password = $("#password").val();
                    
                    /* console.log(username);
                    console.log(password); */
                    $.ajax({
                        url:url.basePhpUrl + 'user/register.php',
                        type:"post",
                        data: {username, password} ,
                        success: data => {
                            if (data.res_code === 1) {
                                 alert(data.res_message);
                                 window.open("http://localhost:2333/html/login.html", '_self');
                            }
                        },
                        dataType: 'json'
                    })
                })
            }
        }
        return new Register();
    })
})