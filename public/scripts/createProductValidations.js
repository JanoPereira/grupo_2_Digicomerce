window.addEventListener('load', () => {
    console.log('Llegue');
    const form = document.querySelector('.formulario');

    validateName = (name) => {
        let errorMsg = '';
        if (name.length == 0) {
            errorMsg = `<p class="error">El nombre es obligatorio</p>`;
        } else if (name.length < 5) {
            errorMsg = `<p class="error">El nombre debe contener al menos 5 caracteres</p>`;
        };
        return errorMsg;
    };
    validateDescription = (description) => {
        let errorMsg = '';
        if (description.length < 20) {
            errorMsg = `<p class="error">La descripcion es obligatoria, y tiene que tener al menos 20 caracteres</p>`;
        }
        return errorMsg;
    };
    validateImage = (file) => {
        let acceptedExtensions = ['.jpg', '.jpeg', '.gif', '.png'];
        let cont = 0;
        let errorMsg = '';
        if (file.length > 0) {
            acceptedExtensions.forEach(extension => {
                file.includes(extension) ? cont += 1 : null
            });
            cont == 0 ? errorMsg = `<p class="error">Archivo no valido</p>` : null;
        }
        
        return errorMsg;
    };

    validatePrice = (price) => {
        let errorMsg = '';
        if (price <= 0) {
            errorMsg = `<p class="error">El precio tiene que ser mayor a 0 </p>`;
        }
        
        return errorMsg;
    };

    form.addEventListener('submit', (event) => {
        let errors = 0;
        
        // INPUTS
        const name = document.querySelector('#name');
        const image = document.querySelector('#image');
        const description = document.querySelector('#description');
        const price = document.querySelector('#price');
        // DIVS
        const nameErrors = document.querySelector('.name-errors');
        const imageErrors = document.querySelector('.image-errors');
        const descriptionErrors = document.querySelector('.description-errors');
        const priceErrors = document.querySelector('.price-errors');

        // NAME VALIDATION
        let nameValidation = validateName(name.value);
        if (nameValidation) {
            nameErrors.innerHTML = nameValidation
            name.classList.add('invalid')
            console.log('toy en nameError');
            errors += 1;
        } else {
            nameErrors.innerHTML = '';
            name.classList.remove('invalid')
        }

        // DESCRIPTION VALIDATION
        let descriptionValidation = validateDescription(description.value);
        if (descriptionValidation) {
            descriptionErrors.innerHTML = descriptionValidation
            description.classList.add('invalid');
            errors += 1;
        } else {
            descriptionErrors.innerHTML = '';
            description.classList.remove('invalid')
        }


        // image VALIDATION
        let imageValidation = validateImage(image.value);
        if (imageValidation) {
            imageErrors.innerHTML = imageValidation
            image.classList.add('invalid');
            errors += 1;
        } else {
            imageErrors.innerHTML = '';
            image.classList.remove('invalid')
        }

        // price VALIDATION
        let priceValidation = validatePrice(price.value);
        if (priceValidation) {
            priceErrors.innerHTML = priceValidation
            price.classList.add('invalid');
            errors += 1;
        } else {
            priceErrors.innerHTML = '';
            price.classList.remove('invalid')
        }



        errors != 0 ? event.preventDefault() : null;
    })
})