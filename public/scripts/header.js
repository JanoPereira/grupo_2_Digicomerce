window.addEventListener('load',()=>{
    console.log('estoy en script');
    const button = document.querySelector('.user-menu');
    const menuOptionsLogged = document.querySelector('.menu-list-logged');
    const menuOptionsUnlogged = document.querySelector('.menu-list-unlogged');
    button.addEventListener('click',()=>{
        console.log('di click')
        menuOptionsLogged?.classList.toggle('hidden');
        menuOptionsUnlogged?.classList.toggle('hidden');
    })
})