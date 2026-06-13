const API = "http://localhost:5000";

async function uploadFile(){

    const fileInput =
    document.getElementById("fileInput");

    if(fileInput.files.length===0){
        alert("Select a file");
        return;
    }

    const formData = new FormData();

    formData.append(
        "document",
        fileInput.files[0]
    );

    await fetch(`${API}/upload`,{
        method:"POST",
        body:formData
    });

    loadFiles();
}

async function loadFiles(){

    const response =
    await fetch(`${API}/files`);

    const files =
    await response.json();

    const fileList =
    document.getElementById("fileList");

    fileList.innerHTML="";

    files.forEach(file=>{

        fileList.innerHTML += `
        <div class="card">
            <h3>${file.filename}</h3>
            <p class="size">
                Size: ${file.size} bytes
            </p>
            <p class="ext">
                Extension: ${file.extension}
            </p>
        </div>
        `;
    });
}

loadFiles();