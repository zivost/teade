function getPong(payload, callback){
    let ifPing = payload.data;
    if(ifPing === "ping"){
        return callback(null, "pong");
    }else{
        return callback("not ping");
    }
}
exports.getPong = getPong;