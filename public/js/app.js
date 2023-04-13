console.log('Client side JS file loaded!');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const msg1 = document.getElementById('msg1');
const msg2 = document.getElementById('msg2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    //console.log(location);
    msg1.textContent = 'Loading... ';
    msg2.textContent = '';

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            //console.log(data);
            if (data.error) {
                //console.log(data.error);
                msg1.textContent = data.error;
            } else {
                //console.log(data.location);
                //console.log(data.forecast);
                msg1.textContent = data.location;
                msg2.textContent = data.forecast;
            }
        });
    });
});
