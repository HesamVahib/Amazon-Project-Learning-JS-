const xhr = new XMLHttpRequest();

xhr.addEventListener('load', () => {
    console.log(xhr.responseText);
});

xhr.open('GET', 'https://supersimplebackend.dev/images/apple.jpg');
xhr.send();
