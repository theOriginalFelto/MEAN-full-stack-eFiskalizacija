window.onload=function(){
    document.getElementById("logoId")?.addEventListener("change", function() {
        const reader = new FileReader();
        reader.readAsDataURL(this.files[0]);
    
        reader.addEventListener("load", () => {
            //console.log(reader.result);
            var img = new Image();
            img.onload = function(){
                let visina = img.height;
                let sirina = img.width;
                if (sirina > 100 && sirina < 300 && visina > 100 && visina < 300) {
                    localStorage.setItem("slika", reader.result);
                }
            }
            img.src = reader.result;
        });
    });
}

