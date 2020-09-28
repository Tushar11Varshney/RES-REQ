let TypeContent=document.getElementById("TypeContent");
let customParambox=document.getElementById("customParambox");
let reqJsonbox=document.getElementById("reqJsonbox");
let jsonRadio=document.getElementById("jsonRadio");
let paramsRadio=document.getElementById("paramsRadio");
let addparam=document.getElementById("addparam");
let newparam=document.getElementById("params");
let get=document.getElementById("get");
let post=document.getElementById("post");
let totalparam=2;

showPost();
function hidePost()
{
    TypeContent.style.display="none";
    customParambox.style.display="none";
    reqJsonbox.style.display="none";
}
get.addEventListener("click",hidePost);

function showPost()
{
    TypeContent.style.display="block";
    customParambox.style.display="none";
    reqJsonbox.style.display="block";
}
post.addEventListener("click",showPost);

jsonRadio.addEventListener("click",function(){
    customParambox.style.display="none";
    reqJsonbox.style.display="block";
});

paramsRadio.addEventListener("click",function(){
    customParambox.style.display="block";
    reqJsonbox.style.display="none";
})

addparam.addEventListener("click",function(){
    string=`<div class="row my-2">
            <label for="parameters" class="col-sm-2 col-form-label">Parameter ${totalparam}</label>
            <div class="col">
                <input type="text" class="form-control" id="keyparameter${totalparam}" placeholder="Enter parameter ${totalparam} key">
            </div>
            <div class="col">
                <input type="text" class="form-control" id="valueparameter${totalparam}" placeholder="Enter parameter ${totalparam} value">
            </div>
            <button type="button" class="btn btn-primary"  data-toggle="modal" data-target="#Modal${totalparam}">-</button>
         </div>
         <div class="modal fade" id="Modal${totalparam}" tabindex="-1" role="dialog" aria-labelledby="ModalLabel${totalparam}" aria-hidden="true">
         <div class="modal-dialog" role="document">
           <div class="modal-content">
             <div class="modal-header">
               <h5 class="modal-title" id="ModalLabel${totalparam}">Please Confirm</h5>
             </div>
             <div class="modal-body">
               Are you sure you want to delete this parameter?
             </div>
             <div class="modal-footer">
               <button type="button" class="btn btn-primary" id="${totalparam}" data-dismiss="modal" onclick="remove(this.id)">Yes,Delete</button>
               <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
             </div>
           </div>
         </div>
     </div>
     </div>`;
     let div=document.createElement("div");
     div.setAttribute("id","parameter"+totalparam);
     div.innerHTML=string;
     newparam.appendChild(div);
    // newparam.innerHTML+=html; //add krne pr saari bhri field khali krdega
    totalparam++;
});

function remove(myid)
{
    let a=document.getElementById("parameter"+myid);
    newparam.removeChild(a);
}

let screenResponse=document.getElementById("response");
function getData()
{
    screenResponse.innerHTML="Please wait..Fetching response...";  //or .value can be used
    let url=document.getElementById("urlbox").value;
    fetch(url).then(response=>{
        return response.text();
    }).then(data=>{
        screenResponse.innerHTML=data;
        Prism.highlightAll();
    })
}

function postData()
{
    screenResponse.innerHTML="Please wait..Fetching response...";
    let url=document.getElementById("urlbox").value;
    let content=document.querySelector("input[name='contentType']:checked").value;
    let data;
    if(content=="json")
    {
        let jsondata=document.getElementById("jsondata");
        data=jsondata.value;
    }
    if(content=="params")
    {
        data={};
        for (let index = 1; index <totalparam; index++) {
            if(document.getElementById("parameter"+index)!=undefined)
            {
                let key=document.getElementById("keyparameter"+index).value;
                let value=document.getElementById("valueparameter"+index).value;
                data[key]=value;
            }
        }
        data=JSON.stringify(data);                       //send as a string
    }
    let param={
        method: 'POST',
        headers: {
            "Content-type": "application/json; charset=UTF-8"
    },
        body:data
    }
    fetch(url,param).then(response=>response.text())                                 
         .then(data=>screenResponse.innerHTML=data);
         Prism.highlightAll();
}

let submit=document.getElementById("submit");
submit.addEventListener("click",function(){
    let req=document.querySelector("input[name='reqType']:checked").value;
    if(req=="get")
    {
        getData();
    }
    else if(req=="post")
    {
        postData();
    }
});
