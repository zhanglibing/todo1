$(function(){
    // var i=0
    var index=0
    var qindex=0
    var todos=[
        // {reminder:2016-10-13,content:"哈哈哈",complete:2016-10-14,state:1,beizhu:""},
        // {content:"哈哈哈",state:1,reminder:2016-10-13,complete:2016-10-14},
    ]
    var newarr=[]

    if(localStorage.todo_data){
        todos=JSON.parse(localStorage.todo_data)
        render()
    }else{
        localStorage.todo_data=JSON.stringify(todos)
        contentStyle()
    }
    //内容背景
    function contentStyle(){
        if(todos.length==0){
            $(".content").addClass("active")
        }else{
            $(".content").removeClass("active")
        }
    }
    //页面绘制
   function render(){
       $.each(todos,function(i,v){
           if(!v.state && v.del==="no"){
               $("<li class="+i+">" +
                   "<div class=reminder-time>"+v.reminder+"</div>" +
                   "<div class=content-text>"+v.content+"</div>" +
                   "<div class=complete-time>"+v.complete+"</div>" +
                   "<div class=deal>" +
                   "<div class=del><div class='icon-font icon-icon70lajitong'></div></div>" +
                   "<div class=set-top><div class='icon-font icon-zhiding'></div></div>" +
                   "<div class=complete><div class='icon-font icon-duigou'></div></div>" +
                   "<div class=bianji><div class='icon-font icon-bi'></div></div>" +
                   "</div></li>").appendTo(".list")
           }
       })
       contentStyle()
   }
    ////////////////////////////////////////新建//////////////////////////////////////
    $(".reminder .add").on("click",function(){
        $(".new-page").addClass("active")
        $(".deal").css("left","10.8rem")
    })

    $(".header .new").on("click",function(){
        if($(".jiahao").hasClass("icon-icon70lajitong")){
            todos=todos.filter(function(v,i){
                return v.state==0
            })
            localStorage.todo_data=JSON.stringify(todos)
            $(".list").empty()
            $.each(todos,function(i,v){
                if(v.state===1){
                    $("<li class="+i+">" +
                        "<div class=reminder-time>"+v.reminder+"</div>" +
                        "<div class=content-text>"+v.content+"</div>" +
                        "<div class=complete-time>"+v.complete+"</div>" +
                        "<div class=deal>" +
                        "<div class=bianji><div class='icon-font icon-bi'></div></div>" +
                        "<div class=complete><div class='icon-font icon-duigou'></div></div>" +
                        "<div class=set-top><div class='icon-font icon-zhiding'></div></div>" +
                        "<div class=del><div class='icon-font icon-icon70lajitong'></div></div>" +
                        "</div></li>").appendTo(".list")
                }
            })
            $(".content").addClass("active")
        }else{
            console.log("add")
            $(".new-page").addClass("active")
            $(".deal").css("left","10.8rem")
        }
    })

    $(".new-page .sure").on("click",function(){
        if($(".special").val()==""){
            $(".special").addClass("move")
                .delay(900)
                .queue(function(){
                    $(".special").removeClass("move")
                    .dequeue()
                })
        }else if($(".end-line").val()==""){
            $(".end-line").addClass("move")
                .delay(900)
                .queue(function(){
                    $(".end-line").removeClass("move")
                        .dequeue()
                })
        }else{
            if($(".new-page").hasClass("xiugai")){
                todos[qindex].reminder= $(".remind-time").val()
                todos[qindex].content= $(".special").val()
                todos[qindex].label= $(".label").val()
                todos[qindex].complete= $(".end-line").val()
            }else{
             todos.push({
                // index:i,
                 del:"no",
                reminder:$(".remind-time").val(),
                content:$(".special").val(),
                complete:$(".end-line").val(),
                label:$(".label").val(),
                state:0
             })
                // i++;
            }
            $(".special").val("")
            $(".end-line").val("")
            $(".remind-time").val("")
            $(".label").val("")
            localStorage.todo_data=JSON.stringify(todos)
            $(".new-page").removeClass("active")
            $(".list").empty()
            render()
        }
    })

    $(".header .fanhui").on("click",function(){
        $(".new-page").removeClass("active")
        $(".special").val("")
        $(".end-line").val("")
        $(".remind-time").val("")
        $(".label").val("")
        $(".list").empty()
        render()
    })
    $(".fenlei").on("touchstart",function(){
        $("")
    })

    ///////////////////////////////主页操作////////////////////////////////////////////
    var left=0
    $(document).on("touchstart",function(){
        left="10.8rem"
        $(".list").find(".deal").removeClass("active").css("left","10.8rem")
    })

    $(".list").on("touchmove","li",function(e){
        $(".deal").toggleClass("active")
        left = e.originalEvent.changedTouches[0].pageX
        $(".deal").css("left","10.8rem")
        $(this).find(".deal").css("left",""+left+"px")
        $(".list").on("touchend","li",function(e){
            if(left < 230){
                $(this).find(".deal").css("left","1.6rem").addClass("active")
            }else{
                $(this).find(".deal").css("left","10.8rem").addClass("active")
            }
        })

    })

    $(".list").on("touchstart",".bianji",function(e){
        qindex= $(this).closest("li").attr("class")
            $(".new-page").toggleClass("active").addClass("xiugai")
            $(".deal").toggleClass("active").css("left","10.8rem")
            $(".special").val($(this).closest("li").find(".content-text").text())
            $(".label").val("")
            $(".end-line").val($(this).closest("li").find(".complete-time").text())
            $(".remind-time").val($(this).closest("li").find(".reminder-time").text())
        })

    $(".list").on("touchstart",".complete",function(e){
        index = $(this).closest("li").attr("class")
        todos[index].state=1
        todos[index].del="yes"
        $(".deal").toggleClass("active").css("left","10.8rem")
        localStorage.todo_data=JSON.stringify(todos)
        $(".list").empty()
        render()
    })

    $(".list ").on("touchstart",".del",function(){
        var index=$(this).closest("li").attr("class")
        todos.splice(index,1)
        $(".deal").toggleClass("active").css("left","10.8rem")
        localStorage.todo_data=JSON.stringify(todos)
        $(".list").empty()
        render()
    })
    
    $(".list ").on("touchstart",".set-top",function(){
        index= $(this).closest("li").index()
        var a=$(this).closest("li").attr("class")
        console.log(a+1)
        console.log(a,index)
        if(index===0){
            return;
        }else{
            $(".deal").toggleClass("active").css("left","10.8rem")
            var shuju=todos[a]
            todos.splice(a,1)
            todos.unshift(shuju)
            localStorage.todo_data=JSON.stringify(todos)
            $(".list").empty()
            render()
        }

    })


    //菜单
    function srender(v){
        $("<li>" +
            "<div class=reminder-time>"+v.reminder+"</div>" +
            "<div class=content-text>"+v.content+"</div>" +
            "<div class=complete-time>"+v.complete+"</div>" +
            "<div class=deal>" +
            "<div class=del><div class='icon-font icon-icon70lajitong'></div></div>" +
            "<div class=set-top><div class='icon-font icon-zhiding'></div></div>" +
            "<div class=complete><div class='icon-font icon-duigou'></div></div>" +
            "<div class=bianji><div class='icon-font icon-bi'></div></div>" +
            "</div></li>").appendTo(".list")
    }
    $(".header .menue").on("click",function(){
        $(".menue-list").addClass("active")
        $(".header .right .new").addClass("active")
        $(".menue-mask").addClass("active")
    })
    $(".menue-mask").on("click",function(){
        $(this).removeClass("active")
        $(".menue-list").removeClass("active")
        $(".header .right .new").removeClass("active")
    })
    $(".menue-list").on("touchmove",function(e){
        var move=e.originalEvent.changedTouches[0].pageX
        // console.log(move)
        $(this).css("left","-"+(9.72 - move/100)+"rem")
        $(this).on("touchend",function(){
            if(move < 200){
                $(this).css("left","-9.72rem")
                    .delay(300)
                    .queue(function(){
                       $(this) .removeClass("active")
                           .dequeue()
                    })
                $(".menue-mask")
                    .delay(300)
                    .queue(function(){
                       $(this).removeClass("active")
                           .dequeue()
                    })
                $(".header .right .new").removeClass("active")
            }else{
                $(this).css("left",0)
            }
        })
    })
    $(".menue-list ul").on("click","li",function(e){
        var text=$(this).find(".fun").text()
        if(text==="已完成"){
            $(".header").css("background","#89C348")
            $(".list").empty()
            $(".jiahao").removeClass("icon-jiahao").addClass("icon-icon70lajitong")
            $.each(todos,function(i,v){
                if(v.del==="yes"){
                    srender(v)
                    $(".content").removeClass("active");
                }
            })
            $(".list").find(".complete").toggleClass("active")
            $(".list").find(".set-top").toggleClass("active")
            $(".list").find(".bianji").toggleClass("active")
        }else if(text==="进行中"){
            $(".header").css("background","#89C348")
            $(".jiahao").removeClass("icon-icon70lajitong").addClass("icon-jiahao")
            $(".list").empty()
            render()
        }else if(text==="娱乐"){
            $(".header").css("background","#f52af3")
            $(".list").empty()
            $.each(todos,function(i,v){
                if(v.label==="娱乐"){
                    srender(v)
                    $(".content").removeClass("active");
                }
            })
        }else if(text==="管理标签"){
            $(".header").css("background","#89C348")
            $(".list").empty()
            $.each(todos,function(i,v){
                if(v.label==="管理标签"){
                    srender(v)
                    $(".content").removeClass("active");
                }
            })
        }else if(text==="工作"){
            $(".header").css("background","#4b15fd")
            $(".list").empty()
            $.each(todos,function(i,v){
                if(v.label==="工作"){
                    srender(v)
                    $(".content").removeClass("active");
                }
            })
        }else if(text==="其他"){
            $(".header").css("background","#474745")
            $(".list").empty()
            $.each(todos,function(i,v){
                if(v.label==="其他"){
                    srender(v)
                    $(".content").removeClass("active");
                }
            })
        }else{
            $(".content").addClass("active")
            $(".list").empty()
        }
        $(".header .current").text(text)
        $(".menue-list").toggleClass("active")
        $(".menue-mask").toggleClass("active")
        $(".header .right .new").toggleClass("active")

    })


    //搜索
    $(".header .search").on("click",function(){
        $(".mask").addClass("active")
    })
    $(".middle input").on("blur",function(){
        // var arr=[];
        var key=$(this).val()
        $(todos).each(function(i,v){
            if(!((v.content.indexOf(key))==-1)){
                // arr.push(v)
                // $(todos).each(function(i,v){
                    if(v.del==="no"){
                        if( v.content == key){
                            $("<li>" +
                                "<div class=reminder-time>"+v.reminder+"</div>" +
                                "<div class=content-text>"+v.content+"</div>" +
                                "<div class=complete-time>"+v.complete+"</div></li>")
                                .appendTo(".mask")
                        }
                    }
                // })
            }else{
                $("<li><div class=reminder-time></div></li>")
                    .appendTo(".mask")
            }
        })

        })
    $(".mask .left").on("click",function(){
        $(".mask").removeClass("active")
    })















})