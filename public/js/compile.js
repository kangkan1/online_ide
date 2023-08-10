let compile_button = document.getElementById("compile_button")
let language_change = document.getElementById("language");
const lang_key = [
    ["js", 'console.log("Hello World!")'],
    ["python", 'print("Hello World!")'],
    ['java', `
    // class name should be Main
    //Code goes here......
    class Main{
        public static void main(String []args){
            System.out.println("Hello World!");
        }
    }`],
    ['cpp', 
    `//Code goes here......
    #include <iostream>
    using namespace std;
    
    int main() {
      cout << "Hello World!"<<endl;
      return 0;
    }`
    ],
    [
        'c',
        `//Code goes here......
        #include <stdio.h>
        
        int main(){
            printf("Hello World!");
            return 0;
        }`
    ]

  ];
let lang_map = new Map(lang_key)

// language_change.addEventListener("click", (e)=>{
//     console.log("lang changed")
//     let lang = e.target.value
//     let input = document.getElementById("code")
//     console.log(lang)
//     if(lang_map.has(lang)){
//         input.value = lang_map.get(lang)
//     }
// });
if(compile_button){
    compile_button.addEventListener("click", (e)=>{
        let code = document.getElementById("code");
        let language = document.getElementById("language");
        let result = document.getElementById("result");
        
        if(code && language && language.value !== "Select"){
            let data = {
                code : code.value,
                language: language.value
            }
            console.log(code.value)
            console.log(language.value)
            let xhttp = new XMLHttpRequest();
            xhttp.open("POST", "compile", true);
            xhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                // Typical action to be performed when the document is ready:
                // document.getElementById("demo").innerHTML = xhttp.responseText;
                    console.log(xhttp.responseText)
                    let response = JSON.parse(xhttp.responseText)
                    if(response.status === 'ok'){
                        result.value = response.result
                        result.style.color = "green"
                    }else if(response.status === 'fail'){
                        result.value = response.result
                        result.style.color = 'red'
                    }
                
                }
            };
            
            xhttp.send(JSON.stringify(data));
        }else{
            if(language && language.value === "Select")
                alert("Please select a language")
        }
    })
}

function changeLang(){
    let lang_selected = document.getElementById("language");
    let code = document.getElementById("code");
    if(lang_selected){
        if(lang_map.has(lang_selected.value)){
            code.value = lang_map.get(lang_selected.value)
        }else{
            code.value = "//Code goes here......"
        }
    }
}