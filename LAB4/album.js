fetch('https://2020147502.github.io/HomeworkRepository/LAB4/product.json').then(function (response) {
    return response.json();
}).then(function (json) {
    let products = json;
}).catch(function (err) {
    console.log('Fetch problem: ' + err.message);
});
const image = document.createElement('img');
image.alt = items.name;
image.src = "'https://2020147502.github.io/HomeworkRepository/LAB4/' + product.src;"