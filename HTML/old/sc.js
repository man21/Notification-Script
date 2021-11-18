

const observer = new MutationObserver(mutations => {

    mutations.forEach(({ addedNodes }) => {
        addedNodes.forEach(node => {

            // For each added script tag
            if (node.nodeType === 1 && node.tagName === 'SCRIPT') {

                 const src = node.src || ''
                // const type = node.type


               // console.log(src == "test2109.herokuapp.com")

                // var data;
                // const arr = [/test2109.herokuapp.com/ ]
                // arr.map(e =>{
                //   var x= src.match(e)
                //   if(x){
                //     data = x
                //     return
                //   }
                // })

                // if(data){
                //     console.log("2222222222222")
                //     node.type = "javascript/blocked"

                //     console.log(node, "%%%%%%%%%%%%")
                // }

                
                node.type = "javascript/blocked"

                 console.log(node, "%%%%%%%%%%%%")


                // // Firefox has this additional event which prevents scripts from beeing executed
                // const beforeScriptExecuteListener = function (event) {
                //     // Prevent only marked scripts from executing
                //     if (node.getAttribute('type') === 'javascript/blocked')
                //         event.preventDefault()
                //     node.removeEventListener('beforescriptexecute', beforeScriptExecuteListener)
                // }
                // node.addEventListener('beforescriptexecute', beforeScriptExecuteListener)

                // If the src is inside your blacklist

                // if (needsToBeBlacklisted(src, type)) {
                //     // Do some stuff that will prevent the script tag loading ;)
                //     // (See below…)

                //     console.log(node, "================================")

                //     node.type = "javascript/blocked";


                // }
            }
        })
    })
})

// Starts the monitoring
observer.observe(document.documentElement, {
    childList: true,
    subtree: true
})



function needsToBeBlacklisted(src, type) {

    // console.log(src, type, "$$$$$$$$$$$")

    var data;
    const arr = [/cdn.dashly.app/, /cdn.dashly.app1/ ]
    arr.map(e =>{
      var x= src.match(e)
      if(x){
        data = x
        return
      }
    })
    
    return  data ? true : false

}