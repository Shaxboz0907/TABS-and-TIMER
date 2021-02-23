window.addEventListener('DOMContentLoaded', () => {
    const body = document.querySelector('body');
    let textNodes = [];
    function recursy (element) {
        element.childNodes.forEach(node => {
        
            if (node.nodeName.match(/^H\d/)) { // h1-h2-h3 lardi olish uchun kk
                const obj = {
                    hearder : node.nodeName,
                    content : node.textContent // h lardagi content (yozuvlarni olish) 
                };
                textNodes.push(obj);              
            } else {                
                recursy(node);
            }
        });
    }

    recursy(body);
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify(textNodes)
    })
    .then(response => response.json())
    .then(json => console.log(json));  
});