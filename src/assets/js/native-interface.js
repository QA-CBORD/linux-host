        var NativeInterface = (function(window){

            // object for storing references to our promise-objects
            var promises = {};
            
            // generates a unique id, not obligator a UUID
            function generateUUID() {
                var d = new Date().getTime();
                var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                    var r = (d + Math.random()*16)%16 | 0;
                    d = Math.floor(d/16);
                    return (c=='x' ? r : (r&0x3|0x8)).toString(16);
                    });
                return uuid;
            };
            function getNativeData(methodName) {
                var promise = new Promise(function(resolve, reject) {
                    // we generate a unique id to reference the promise later
                    // from native function
                    var promiseId = generateUUID();
                    // save reference to promise in the global variable
                    promises[promiseId] = { resolve, reject};
                    try {
                        // call native function
                        window.webkit.messageHandlers.JSListener.postMessage({promiseId: promiseId, methodName: methodName}); 
                    }
                    catch(exception) {
                        alert(exception);
                    }
                });
                return promise;
            }
            return {
                getSessionId: function(){
                    return getNativeData('getSessionId');
                },
                getUserInfo: function(){
                    return getNativeData('getUserInfo');
                },
                getInstitutionId: function(){
                    return getNativeData('getInstitutionId');
                },
                getDestinationPage: function(){
                    return getNativeData('getDestinationPage');
                },
                
                // this function is called by native methods
                // @param promiseId - id of the promise stored in global variable promises
                resolvePromise: function (promiseId, data, error) {
                    if (error){
                        promises[promiseId].reject(data);
                    } else{
                        promises[promiseId].resolve(data);
                    }
                    // remove reference to stored promise
                    delete promises[promiseId];
                }
            };
        })(window);