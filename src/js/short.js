export function GetApiCall(param) {
    return new Promise((resolve, reject) => {
        //do something here
    });
}

var origin = shortRef
    .child("newUrl")
    .equalTo(param)
    .on("value", function (snapshot) {
        console.log(snapshot.val());
        snapshot.forEach(function (data) {
            console.log(data.key);
        });
    });