let compile_button = document.getElementById("compile_button")

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