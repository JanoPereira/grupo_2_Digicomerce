let principalImage = document.getElementById('principal');

let otherImages = document.querySelectorAll('.other-images');

for(let i = 1;i<otherImages.length;i++){
    let img= otherImages[i];
  
    img.addEventListener('click',()=>{
      let aux = principalImage.getAttribute('src');
      principalImage.src = img.getAttribute('src');
      img.src = aux;
    })
};

