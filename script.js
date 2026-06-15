const selectTag=document.querySelectorAll("select");
const transferBtn=document.querySelector("#transfer");
const fromtext=document.querySelector("#fromtext");
const totext=document.querySelector("#totext");
const icons=document.querySelectorAll("img");


selectTag.forEach((tag,id)=>{

for(const countriescode in countries){
    let selected;
    if(id==0 && countriescode=="en-GB"){
        selected="selected";
    }
    else if(id==1 && countriescode=="hi-IN"){
        selected="selected";
    }

    
    let option= `<Option value="${countriescode}" ${selected}>${countries[countriescode]}</Option>` ;
    tag.insertAdjacentHTML("beforeend",option);

    }
});

transferBtn.addEventListener(("click"),()=>{
    let text=fromtext.value;
    let    translateFrom=selectTag[0].value;
    let   translateto=selectTag[1].value;
    const apiurl=`https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateto}`;
    fetch(apiurl)
         .then(res=>res.json())
         .then(data=>{

        totext.value=data.responseData.translatedText;

    })
    .catch(err=>{
        console.log(err);
    });

});

icons.forEach(icon=>{
    icon.addEventListener("click",(e)=>{
        const target=e.target;
        if(target.classList.contains("copy")){
            if(target.id=="from_text"){
                navigator.clipboard.writeText(fromtext.value);
            }
            else{
                navigator.clipboard.writeText(totext.value);
            }
        }
        else{
            let utterance;
            if(target.id="from_text"){
                utterance=new SpeechSynthesisUtterance(fromtext.value)
                utterance.lang=selectTag[0].value;
            }
            else{
                utterance=new SpeechSynthesisUtterance(totext.value)
                utterance.lang=selectTag[0].value;
            }
            speechSynthesis.speak(utterance);
            
            
        }
    });
});

