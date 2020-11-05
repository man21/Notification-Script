 // function setCookies(name, values, path){

    //                 var d = new Date();
    //                 d.setTime(d.setTime() + (4*24*60*60*1000))

    //                 let expires = "expires="+ d.toUTCString();

    //                 let sec= '';

    //                 if(this._cookie_secure ==2){
    //                     if(location.protocol){
    //                         if(location.protocol == "https:"){ 
    //                             sec= ';secure';
    //                         }
    //                     }
    //                 } else if(this._cookie_secure == true){

    //                     sec= ';secure';

    //                 }

    //                 document.cookie = name+ "="+ JSON.stringify(value)+ ";" +expires+ "; path=" + path + sec
                
    // }

//     function getCookies(name){

        
//         name = name+"="
//         const cookies = document.cookie.split(";")

//         // console.log(cookies, "!!!!!!!!!!!!!!!!")

//         for(var i = 0; i < cookies.length; i++) {
//             var cookie = cookies[i]

//             if(cookie.indexOf(name) == 1){
//             name = cookie.split('=')[0];
//             value = cookie.split('=')[1];

//             console.log({name: name, key : value},"-------------------------")
//                //return 
//         }
        
//         // Return null if not found
//         return null;

//     }

//     return {
//         notificationdisplay: function notificationdisplay(type, config, containerStyle, iconStyle, alignment) {
//             notificationDisplay(type, config, containerStyle, iconStyle, alignment);
//         }
//     };
// };
