/**
 * Created by luisandresgurmendez on 16/9/17.
 */



function createCode() {
    var code = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 7; i++)
        code += possible.charAt(Math.floor(Math.random() * possible.length));

    return code;
}



var stop = false;
var codes=[]
while(!stop){
    var code = createCode();
    if(code in codes){
        stop=true
        console.log(codes.length)
        //console.log(codes)
    }else{
        codes.push(code)
    }


}











