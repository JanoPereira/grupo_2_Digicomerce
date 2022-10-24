window.addEventListener('load', () => {
    console.log('llegue');

    const form = document.querySelector('#regist-form');

    validateName = (name) =>{
        let errorMsg = '';
        if(name.length == 0){
            errorMsg = `<p class="error">El nombre es obligatorio</p>`;
        } else if (name.length < 2 ){
            errorMsg = `<p class="error">El nombre debe contener al menos 2 caracteres</p>`;
        };
        return errorMsg;
    };
    validateAvatar = (file) =>{
        let acceptedExtensions = ['.jpg','.jpeg','.gif','.png'];
        let cont = 0;
        let errorMsg='';
        acceptedExtensions.forEach(extension =>{
            file.includes(extension) ? cont+=1 : null
        });
        cont == 0 ? errorMsg = `<p class="error">Archivo no valido</p>`: null;
        return errorMsg;
    };
    
    validateEmail = (email) =>{
        let errorMsg='';
        let regEX = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        if(email.length == 0){
            errorMsg = `<p class="error">El email es obligatorio</p>`;
        } else if (!regEX.test(email)){
            errorMsg = `<p class="error">El email debe ser valido</p>`;
        };
        return errorMsg;
    };

    validatePhone = (phone)=>{
        let errorMsg=''
        let regEx = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/g;
        if(!regEx.test(phone)){
            errorMsg = `<p class="error">Numero de telefono invalido</p>`;
        }
        return errorMsg;
    };

    validatePassword = (password) =>{
        let errorMsg = '';
        let regEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if(password.length == 0){
            errorMsg = `<p class="error">La contraseña es obligatoria</p>`;
        } else if (password.length < 8 ){
            errorMsg = `<p class="error">La contraseña debe contener al menos 8 caracteres</p>`;
        } else if(!regEX.test(password)){
            errorMsg = `<p class="error">La contraseña debe contener al menos 8 caracteres: una mayúscula, una minúscula, un número y un caracter especial</p>`;
        }
        return errorMsg;
    };

    validateRepassword = (repassword,password) =>{
        let errorMsg = '';
        if(repassword != password){
            errorMsg= `<p class="error">Las contraseñas no coinciden </p>`
        }
        return errorMsg;
    };


    form.addEventListener('submit', (event) => {
        let errors = 0;
        // INPUTS
        const name = document.querySelector('#name');
        const avatar = document.querySelector('#avatar');
        const email = document.querySelector('#email');
        const phone = document.querySelector('#phone');
        const password = document.querySelector('#password');
        const repassword = document.querySelector('#repassword');
        // DIVS
        const nameErrors = document.querySelector('.name-errors');
        const avatarErrors = document.querySelector('.avatar-errors');
        const emailErrors = document.querySelector('.email-errors');
        const phoneErrors = document.querySelector('.phone-errors');
        const passwordErrors = document.querySelector('.password-errors');
        const repasswordErrors = document.querySelector('.repassword-errors');
        
        // NAME VALIDATION
        let nameValidation = validateName(name.value);
        if(nameValidation){
            nameErrors.innerHTML=nameValidation
            name.classList.add('invalid')
        } else{
            nameErrors.innerHTML='';
            avatar.classList.remove('invalid')
        }
        
        // AVATAR VALIDATION
        let avatarValidation = validateAvatar(avatar.value);
        if(avatarValidation){
            avatarErrors.innerHTML=avatarValidation
            avatar.classList.add('invalid')
        } else{
            avatarErrors.innerHTML='';
            avatar.classList.remove('invalid')
        }

        // EMAIL VALIDATION
        let emailValidation = validateEmail(email.value);
        if(emailValidation){
            emailErrors.innerHTML=emailValidation
            email.classList.add('invalid')
        } else{
            emailErrors.innerHTML='';
            email.classList.remove('invalid')
        }

        // PHONE VALIDATION
        let phoneValidation = validatePhone(phone.value);
        if(phoneValidation){
            phoneErrors.innerHTML=phoneValidation
            phone.classList.add('invalid')
        } else{
            phoneErrors.innerHTML='';
            phone.classList.remove('invalid')
        }

        // PASSWORD VALIDATION
        let passwordValidation = validatePassword(password.value);
        if(passwordValidation){
            passwordErrors.innerHTML=passwordValidation
            password.classList.add('invalid')
        } else{
            passwordErrors.innerHTML='';
            password.classList.remove('invalid')
        }
        // REPASSWORD VALIDATION
        let repasswordValidation = validateRepassword(repassword.value,password.value);
        if(repasswordValidation){
            repasswordErrors.innerHTML=repasswordValidation
            repassword.classList.add('invalid');
            repassword.value = '';
        } else{
            repasswordErrors.innerHTML='';
            repassword.classList.remove('invalid');
        };

        errors!=0 ? event.preventDefault(): null;
    })
});