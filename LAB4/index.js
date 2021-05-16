fetch('https://2020147502.github.io/HomeworkRepository/LAB4/product.json').then(function (response) {
    return response.json();
}).then(function (json) {
    let products = json;
    initialize(products);
}).catch(function (err) {
    console.log('Fetch problem: ' + err.message);
});
function initialize(products) {
    const category = document.querySelector('#category');
    const search = document.querySelector('#search');
    const searchBtn = document.querySelector('button');
    const main = document.querySelector('main');
    let lastCategory = category.value;
    let lastSearch = '';
    let categoryGroup;
    let finalGroup;
    finalGroup = products;
    updateDisplay();
    categoryGroup = [];
    finalGroup = [];
    searchBtn.onclick = selectCategory;

    function selectCategory(e) {
        e.preventDefault();
        categoryGroup = [];
        finalGroup = [];
        if (category.value === lastCategory && search.value.trim() === lastSearch) {
            return;
        } else {
            lastCategory = category.value;
            lastSearch = search.value.trim();
            if (category.value === 'All') {
                categoryGroup = products;
                selectProducts();
            } else {
                let lowerCaseType = category.value.toLowerCase();
                for (let i = 0; i < products.length; i++) {
                    if (products[i].type === lowerCaseType) {
                        categoryGroup.push(products[i]);
                    }
                }
                selectProducts();
            }
        }
    }
    function selectProducts() {
        if (search.value.trim() === '') {
            finalGroup = categoryGroup;
            updateDisplay();
        } else {
            let lowerCaseSearchTerm = search.value.trim().toLowerCase();
            for (let i = 0; i < categoryGroup.length; i++) {
                if (categoryGroup[i].name.indexOf(lowerCaseSearchTerm) !== -1) {
                    finalGroup.push(categoryGroup[i]);
                }
            }
            updateDisplay();
        }

    }
    function updateDisplay() {
        while (main.firstChild) {
            main.removeChild(main.firstChild);
        }
        if (finalGroup.length === 0) {
            const para = document.createElement('p');
            para.textContent = 'No results to display!';
            main.appendChild(para);
        } else {
            for (let i = 0; i < finalGroup.length; i++) {
                fetchBlob(finalGroup[i]);
            }
        }
    }
    function fetchBlob(product) {
        let url = 'image/' + product.image;
        fetch(url).then(function (response) {
            console.log(response.blob);
            return response.blob();
        }).then(function (blob) {
            let objectURL = URL.createObjectURL(blob);
            showProduct(objectURL, product);
        });
    }
    function showProduct(objectURL, product) {
        const section = document.createElement('section');
        const heading = document.createElement('h2');
        const para = document.createElement('p');
        const image = document.createElement('img');
        section.setAttribute('class', product.type);
        heading.textContent = product.name.replace(product.name.charAt(0), product.name.charAt(0).toUpperCase());
        para.textContent = '$' + product.price.toFixed(2);
        image.src = objectURL;
        image.alt = product.name;
        main.appendChild(section);
        section.appendChild(heading);
        section.appendChild(para);
        section.appendChild(image);
        main
    }
}