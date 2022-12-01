window.addEventListener('load',()=>{
    const button = document.querySelector('.user-menu');
    const menuOptionsLogged = document.querySelector('.menu-list-logged');
    const menuOptionsUnlogged = document.querySelector('.menu-list-unlogged');
    button.addEventListener('click',()=>{
        menuOptionsLogged?.classList.toggle('hidden');
        menuOptionsUnlogged?.classList.toggle('hidden');
    });
    
})