
var c=document.getElementById("myCanvas")
var width=(window.innerWidth/2)
var height=window.innerHeight/2;
c.width=2*width;
c.height=2*height;

c.style.left="170px"
c.style.top="0px"
c.style.position="absolute"
var graphics=c.getContext("2d")
graphics.translate(width,height);
graphics.save()
var big=0
var components=[]
function draw(){
    graphics.clearRect(-width,-height,width*2,height*2)
    if(width>height){
        big=width
    }else{
        big=height
    }
    for (var i=0;i<big;i++){
        graphics.save()
        
        if((i)%10==0){
    
            graphics.lineWidth=2;
        }else{
            graphics.lineWidth=0.5
        }
    
      
        graphics.beginPath();
        graphics.moveTo(i*20,-big);
        graphics.lineTo(i*20,big);
        graphics.stroke();
        graphics.beginPath();
        graphics.moveTo(-i*20,-big);
        graphics.lineTo(-i*20,big);
        graphics.stroke();
    
    
        graphics.beginPath();
        graphics.moveTo(-big,i*20);
        graphics.lineTo(big,i*20)
        graphics.stroke();
        graphics.beginPath();
        graphics.moveTo(-big,-i*20);
        graphics.lineTo(big,-i*20)
        graphics.stroke();
        graphics.restore();
    }
    graphics.restore()
    
    for(var i=0;i<width;i++){
        graphics.save()
        graphics.translate(-0.2,10)
        graphics.font="10px Arial"
        graphics.fillText(i,i*20,0)
        graphics.fillText(-i,-i*20,0)
        graphics.restore()
    }
    drawPath()
}

function func(x,component){
   // console.log(component)
    var eqi=[]
    var i=0
    while (component.length!=0){
       if(component[i]!="+"&&component[i]!="-"&&component[i]!="*"&&component[i]!="/"&&component[i]!="^"&&component[i]!="sqrt"&&component[i]!="("&&component[i]!=")"&&component[i]!="x" &&component[i]!="sin"&&component[i]!="cos"&&component[i]!="tan"){
        eqi.push(parseFloat(component[i]))
        component.splice(0,1)
        }
        else if(component[i]=="x"){
            eqi.push(x)
            component.splice(0,1)
        }else if(component[i]=="+"){
            if(component[i+1]!="+"&&component[i+1]!="-"&&component[i+1]!="*"&&component[i+1]!="/"&&component[i+1]!="^"&&component[i+1]!="sqrt"&&component[i+1]!="("&&component[i+1]!=")"&&component[i+1]!="x"&&component[i+1]!="sin"&&component[i+1]!="cos"&&component[i+1]!="tan"){
            eqi[eqi.length-1]+=parseFloat(component[i+1])
            component.splice(i,i+1)
            }else if(component[i+1]=="x"){
                eqi[eqi.length-1]+=x
                component.splice(i,i+1)
            }else if(component[i+1]=="("){
                var all=[]
                var final=0
                var v=i+2
                var run=true
                while(v<component.length&&run){
                    if(component[v]!=")"){
                        all.push(component[v])
                    v++;
                    }else{
                        final=v
                       run=false
                    }
                   
                }
                var ret=func(x,all)
                if(component[final+1]=="^"){
                    final+=2;
                    if(component[final]!="("){
                        if(component[final]!="x"){
                            ret=ret**parseFloat(component[final])
                        }else{
                            ret=ret**x
                        }
                        
                    }else{
                        var all2=[]
                        final++
                        for (var t=final;t<component.length;t++){
                            if(component[t]!=")"){
                                all2.push(component[t])
                            }else{
                                final=t;
                                break;
                            }
                        }
                        ret=ret**func(x,all2)
                    }
                }
                eqi[eqi.length-1]+=ret
                component.splice(0,final)
            }
            component.splice(0,1)
        }else if(component[i]=="-"){
            if(component[i+1]!="+"&&component[i+1]!="-"&&component[i+1]!="*"&&component[i+1]!="/"&&component[i+1]!="^"&&component[i+1]!="sqrt"&&component[i+1]!="("&&component[i+1]!=")"&&component[i+1]!="x"&&component[i+1]!="sin"&&component[i+1]!="cos"&&component[i+1]!="tan"){
            eqi[eqi.length-1]-=parseFloat(component[i+1])
            component.splice(i,i+1)
            }else if(component[i+1]=="x"){
                eqi[eqi.length-1]-=x
                component.splice(i,i+1)
            }else if(component[i+1]=="("){
                var all=[]
                var final=0
                var v=i+2
                var run=true
                while(v<component.length&&run){
                    if(component[v]!=")"){
                        all.push(component[v])
                    v++;
                    }else{
                        final=v
                       run=false
                    }
                   
                }
                var ret=func(x,all,1)
                if(component[final+1]=="^"){
                    final+=2;
                    if(component[final]!="("){
                        if(component[final]!="x"){
                            ret=ret**parseFloat(component[final])
                        }else{
                            ret=ret**x
                        }
                        
                    }else{
                        var all2=[]
                        final++
                        for (var t=final;t<component.length;t++){
                            if(component[t]!=")"){
                                all2.push(component[t])
                            }else{
                                final=t;
                                break;
                            }
                        }
                        ret=ret**func(x,all2)
                    }
                }
                eqi[eqi.length-1]-=ret
                component.splice(0,final)
            }
            component.splice(0,1)
        }else if(component[i]=="*"){
            if(component[i+1]!="+"&&component[i+1]!="-"&&component[i+1]!="*"&&component[i+1]!="/"&&component[i+1]!="^"&&component[i+1]!="sqrt"&&component[i+1]!="("&&component[i+1]!=")"&&component[i+1]!="x"&&component[i+1]!="sin"&&component[i+1]!="cos"&&component[i+1]!="tan"){
            eqi[eqi.length-1]*=parseFloat(component[i+1])
            component.splice(i,i+1)
            }else if(component[i+1]=="x"){
                eqi[eqi.length-1]*=x
                component.splice(i,i+1)
            }else if(component[i+1]=="("){
                var all=[]
                var final=0
                var v=i+2
                var run=true
                while(v<component.length&&run){
                    if(component[v]!=")"){
                        all.push(component[v])
                    v++;
                    }else{
                        final=v
                       run=false
                    }
                   
                }
                var ret=func(x,all)
                if(component[final+1]=="^"){
                    final+=2;
                    if(component[final]!="("){
                        if(component[final]!="x"){
                            ret=ret**parseFloat(component[final])
                        }else{
                            ret=ret**x
                        }
                        
                    }else{
                        var all2=[]
                        final++
                        for (var t=final;t<component.length;t++){
                            if(component[t]!=")"){
                                all2.push(component[t])
                            }else{
                                final=t;
                                break;
                            }
                        }
                        ret=ret**func(x,all2)
                    }
                }
                eqi[eqi.length-1]*=ret
                component.splice(0,final)
            }
            component.splice(0,1)
        }else if(component[i]=="/"){
            if(component[i+1]!="+"&&component[i+1]!="-"&&component[i+1]!="*"&&component[i+1]!="/"&&component[i+1]!="^"&&component[i+1]!="sqrt"&&component[i+1]!="("&&component[i+1]!=")"&&component[i+1]!="x"&&component[i+1]!="sin"&&component[i+1]!="cos"&&component[i+1]!="tan"){
            eqi[eqi.length-1]/=parseFloat(component[i+1])
            component.splice(i,i+1)
            }else if(component[i+1]=="x"){
                eqi[eqi.length-1]/=x
                component.splice(i,i+1)
            }else if(component[i+1]=="("){
                var all=[]
                var final=0
                var v=i+2
                var run=true
                while(v<component.length&&run){
                    if(component[v]!=")"){
                        all.push(component[v])
                    v++;
                    }else{
                        final=v
                       run=false
                    }
                   
                }
                var ret=func(x,all)
                if(component[final+1]=="^"){
                    final+=2;
                    if(component[final]!="("){
                        if(component[final]!="x"){
                            ret=ret**parseFloat(component[final])
                        }else{
                            ret=ret**x
                        }
                        
                    }else{
                        var all2=[]
                        final++
                        for (var t=final;t<component.length;t++){
                            if(component[t]!=")"){
                                all2.push(component[t])
                            }else{
                                final=t;
                                break;
                            }
                        }
                        ret=ret**func(x,all2)
                    }
                }
                eqi[eqi.length-1]/=ret
                component.splice(0,final)
            }
            component.splice(0,1)
        }else if(component[i]=="^"){
            if(component[i+1]!="+"&&component[i+1]!="-"&&component[i+1]!="*"&&component[i+1]!="/"&&component[i+1]!="^"&&component[i+1]!="sqrt"&&component[i+1]!="("&&component[i+1]!=")"&&component[i+1]!="x"&&component[i+1]!="sin"&&component[i+1]!="cos"&&component[i+1]!="tan"){
            eqi[eqi.length-1]=eqi[eqi.length-1]**parseFloat(component[i+1])
            component.splice(i,i+1)
            }else if(component[i+1]=="x"){
                eqi[eqi.length-1]=eqi[eqi.length-1]**x
                component.splice(i,i+1)
            }else if(component[i+1]=="("){
                var all=[]
                var final=0
                var v=i+2
                var run=true
                while(v<component.length&&run){
                    if(component[v]!=")"){
                        all.push(component[v])
                    v++;
                    }else{
                        final=v
                       run=false
                    }
                   
                }
                var ret=func(x,all)
                if(component[final+1]=="^"){
                    final+=2;
                    if(component[final]!="("){
                        if(component[final]!="x"){
                            ret=ret**parseFloat(component[final])
                        }else{
                            ret=ret**x
                        }
                        
                    }else{
                        var all2=[]
                        final++
                        for (var t=final;t<component.length;t++){
                            if(component[t]!=")"){
                                all2.push(component[t])
                            }else{
                                final=t;
                                break;
                            }
                        }
                        ret=ret**func(x,all2)
                    }
                }
                eqi[eqi.length-1]=eqi[eqi.length]**ret
                component.splice(0,final)
            }
            component.splice(0,1)
        }else if(component[i]=="("){
            var all=[]
            final=1;
            for (var t=final;t<components.length;t++){
                if(component[t]!=")"){
                    all.push(component[t]);
                }else{
                    final=t;
                    break;
                }
            }
            eqi.push(func(x,all))
            component.splice(0,final+1)
        }else if(component[i]=="sin"){
            var all=[]
            final=1;
            for (var t=1;t<component.length;t++){
                if(component[t]!=")"){
                    all.push(component[t])
                }else{
                    final=t+1
                    break
                }
                
            }
            eqi.push(Math.sin(func(x,all)))
                component.splice(0,final);
        }else if(component[i]=="cos"){
            var all=[]
            final=1;
            for (var t=1;t<component.length;t++){
                if(component[t]!=")"){
                    all.push(component[t])
                }else{
                    final=t+1
                    break
                }
              
            }
            eqi.push(Math.cos(func(x,all)))
            component.splice(0,final);
        }else if(component[i]=="tan"){
            var all=[]
            final=1;
            for (var t=1;t<component.length;t++){
                if(component[t]!=")"){
                    all.push(component[t])
                }else{
                    final=t+1
                    break
                }
               
            }
            eqi.push(Math.tan(func(x,all)))
            component.splice(0,final);
        }
    }
    return(eqi[0])
    
}


function circle() {
	graphics.beginPath();
	graphics.arc(0,0,5,5, 0, 2*Math.PI);
	graphics.closePath();
	graphics.fill()
}

function drawPath(){
    graphics.save()
    graphics.lineWidth=2;
    graphics.strokeStyle="red"
    var scale=0.01
    if(components.length>0){
for(var i=-100;i<=100;i+=scale){
    var temp=[...components]
    var temp2=[...components]
    graphics.beginPath();
    graphics.moveTo((i-scale)*20,-func(i-scale,temp)*20);
    graphics.lineTo(i*20,-func(i,temp2)*20)
    graphics.stroke()
}
    }
graphics.restore()
}

document.getElementById("button").addEventListener("click",function(){
    var inp=document.getElementById("equation").value.toLocaleLowerCase()
    components=[]
    var curr=""
    for (var i=0;i<inp.length;i++){
        if(inp[i]!="*" &&inp[i]!="-"&&inp[i]!="+"&&inp[i]!="^"&&inp[i]!="(" &&inp[i]!="x" &&inp[i]!=")" &&inp[i]!="/"){
            curr+=inp[i]
        }else{
            if(curr.length>0){
                if(curr.toLocaleLowerCase().includes("sqrt") &&curr.length>4){
                    var num=""
                    for (var j=0;j<curr.length;j++){
                        if(curr[j].toLocaleLowerCase()!="s"){
                            num+=curr[j]
                        }else{
                            components.push(num)
                            components.push("*")
                            components.push("sqrt")
                        }
                    }
                }else if(curr.toLocaleLowerCase().includes("sin") &&curr.length>3){
                    var num=""
                    for (var j=0;j<curr.length;j++){
                        if(curr[j].toLocaleLowerCase()!="s"){
                            num+=curr[j]
                        }else{
                            components.push(num)
                            components.push("*")
                            components.push("sin")
                        }
                    }
                    
                }else if(curr.toLocaleLowerCase().includes("cos") &&curr.length>3){
                    var num=""
                    for (var j=0;j<curr.length;j++){
                        if(curr[j].toLocaleLowerCase()!="c"){
                            num+=curr[j]
                        }else{
                            components.push(num)
                            components.push("*")
                            components.push("cos")
                        }
                    }
                }else if(curr.toLocaleLowerCase().includes("tan") &&curr.length>3){
                    var num=""
                    for (var j=0;j<curr.length;j++){
                        if(curr[j].toLocaleLowerCase()!="t"){
                            num+=curr[j]
                        }else{
                            components.push(num)
                            components.push("*")
                            components.push("tan")
                        }
                    }
                }

                else{
            components.push(curr)
                }
            }
            components.push(inp[i])
            curr=""
        }
        
    }
    if(curr.length>0){
        components.push(curr)
    }
    for (var i=0;i<components.length;i++){
        if(components[i]=="sqrt"){
            components.splice(i,i+1)
            for (var v=i;i<components.length;v++){
                if(components[v]==")"){
                    components.splice(v+1,0,"^")
                    components.splice(v+2,0,"0.5")
                    break;
                }
            }
        }
    }
draw()
//console.log(components)
//var temp00=[...components]
//console.log(func(2,temp00,9))

})

draw()