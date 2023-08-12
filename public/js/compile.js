let compile_button = document.getElementById("compile_button")
let language_change = document.getElementById("language");

let lang_ace_arr = [
    [ 'c', "ace/mode/c_cpp"],
    ['cpp', "ace/mode/c_cpp"],
    ['java', "ace/mode/java"],
    ['js', "ace/mode/javascript"],
    ['python', "ace/mode/python"],

] ;
let lang_ace_map = new Map(lang_ace_arr);

let theme_arr = [
    ['Ambiance', 'ace/theme/ambiance'],
    ['Chaos', 'ace/theme/chaos'],
    ['Chrome', 'ace/theme/chrome'],
    ['Cloud9 Day', 'ace/theme/cloud9_day'],
    ['Cloud9 Night Low Color', 'ace/theme/cloud9_night_low_color'],
    ['Cloud9 Night', 'ace/theme/cloud9_night'],
    ['Clouds Midnight', 'ace/theme/clouds_midnight'],
    ['Clouds', 'ace/theme/clouds'],
    ['Cobalt', 'ace/theme/cobalt'],
    ['Crimson Editor', 'ace/theme/crimson_editor'],
    ['Dawn', 'ace/theme/dawn'],
    ['Dracula', 'ace/theme/dracula'],
    ['Dawn', 'ace/theme/dawn'],
    ['Dreamweaver', 'ace/theme/dreamweaver'],
    ['Eclipse', 'ace/theme/eclipse'],
    ['Github Dark', 'ace/theme/github_dark'],
    ['Github', 'ace/theme/github'],
    ['Gob', 'ace/theme/go'],
    ['Monokai', 'ace/theme/monokai'],
    ['Twilight', 'ace/theme/twilight'],
    ['Solarized Dark', 'ace/theme/solarized_dark'],
    ['Solarized Light', 'ace/theme/solarized_light'],
    ['Terminal', 'ace/theme/terminal'],
    ['Tomorrow', 'ace/theme/tomorrow'],
    ['Tomorrow Night', 'ace/theme/tomorrow_night'],
    ['Xcode', 'ace/theme/xcode']
];
let theme_map = new Map(theme_arr);

// editor set up
var editor = ace.edit("editor")
editor.setTheme("ace/theme/monokai")
editor.session.setMode("ace/mode/text")

const lang_key = [
    ["js", 
`//Code goes here....
console.log("Hello World!")`],
    ["python", 
`#Code goes here....
print("Hello World!")`],
    ['java',
`
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

if(compile_button){
    compile_button.addEventListener("click", (e)=>{
        let language = document.getElementById("language");
        let result = document.getElementById("result");
        
        if( language && language.value !== "Select"){
            let data = {
                code : editor.getValue(),
                language: language.value
            }
            result.value = "Please wait......"
            result.style.color = "yellow"
            // console.log(code.value)
            // console.log(language.value)
            console.log(editor.getValue());
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
   
    if(lang_selected){
        if(lang_map.has(lang_selected.value)){
            
            if(lang_ace_map.has(lang_selected.value)){
                editor.session.setMode(lang_ace_map.get(lang_selected.value))
                editor.setValue(lang_map.get(lang_selected.value))
            }
            
        }else{
            editor.setValue("Code goes here.....")
        }
    }
}

function changeTheme(){
    let theme_selected = document.getElementById("theme");
    console.log(theme_selected.value);
    console.log(theme_map.get(theme_selected.value))
    if(theme_selected && theme_map.has(theme_selected.value)){
        console.log("theme must be changed")
        editor.setTheme(theme_map.get(theme_selected.value))
        console.log(theme_map.get(theme_selected.value))
    }
}

window.onload =(e) =>{
    let select_theme = document.getElementById('theme');
    if(select_theme){
        //select_theme.appendChild(option);
        for(let i=0;i<theme_arr.length;i++){
            //let arr = theme_map_arr[i];
            let option = document.createElement('option');
            option.value = theme_arr[i][0];
            option.innerText = theme_arr[i][0];
            select_theme.appendChild(option);
        }
    }
}

