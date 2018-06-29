function getPong(payload, callback){
    var ifPing = payload.data;
    if(ifPing === "ping"){
        return callback(null, "pong");
    }else{
        return callback("not ping");
    }
}
exports.getPong = getPong;