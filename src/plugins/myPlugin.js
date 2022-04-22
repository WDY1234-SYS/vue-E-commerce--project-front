//对外暴露一定是对象
let myPlugins= {}

myPlugins.install = function(Vue,options){
    Vue.directive(options.name, function (element,params) {
        element.innerHTML = params.value.toUpperCase();       
    });
}

export default myPlugins;
