/**
 * Assignment 6
 * Name: Hao Zhang
 * myjs.js
 */
var MyObject = {
    myPresidentsList: undefined,
    option: {
        method: "GET",
        type: "",
        url: "http://schwartzcomputer.com/ICT4570/Resources/USPresidents.json",
        data: undefined
    },
    init: function(){
        this.ajax(this.option, 30000, this.callback);
    },
    ajax: function(option, timeout, callback){
        var request = new XMLHttpRequest();
        var timedout = false;
        var timer = setTimeout(function(){
            timedout = true;
            request.abort();
        }, timeout);
        request.open(option.method, option.url);
        request.onreadystatechange = function () {
            if(timedout){
                return;
            }
            clearTimeout(timer);
            if (request.readyState === 4 && callback) {
                callback(request.responseText);
            }else{
                return;
            }
        };
        request.getResponseHeader("Content-Type", option.type);
        if (option.method !== "GET") {
            request.send(JSON.stringify(option.data));
        } else {
            request.send();
        }
    },
    callback: function(data){
        var presidentsData = JSON.parse(data);
        MyObject.myPresidentsList = presidentsData.presidents.president;
        MyObject.renderTable(MyObject.myPresidentsList);
    },
    renderTable: function(presidentList){
        var table = document.getElementsByTagName("tbody").item(0);
        presidentList.forEach(function(curVal, index, arr){
            var tr = document.createElement("tr");
            tr.classList.add("info");
            for(var el in curVal){
                if(curVal.hasOwnProperty(el)){
                    if(el === "number"){
                        var th = document.createElement("th");
                        th.textContent = curVal[el];
                        tr.appendChild(th);
                    }
                    if(
                        el === "name"
                        || el === "date"
                        || el === "took_office"
                        || el === "left_office"
                    ){
                        var td = document.createElement("td");
                        td.textContent = curVal[el];
                        tr.appendChild(td);
                    }
                }
            }
            table.appendChild(tr);
        });
    }
}
MyObject.init();