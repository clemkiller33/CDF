document.addEventListener('DOMContentLoaded', function() {
    // Function to get URL parameter
    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    // Get the "id" parameter from the URL
    var id = getUrlParameter('id');

    // Function to fetch signalement data from API
    function fetchSignalementData(id) {
        fetch(`${server}?token=${token}&key=${key}&api=get&action=${id}`)
            .then(response => response.json())
            .then(data => {
                // Process the data (title, date1, date2, files, description)
                console.log(data);
                data = data.data
                // Example: Display data in the console
                document.querySelector('#sign_title').textContent = data.titre;
                document.querySelector('#sign_date1').textContent = data.post;
                document.querySelector('#sign_date2').textContent = data.date;
                document.querySelector('#sign_description').innerHTML = data.description;
                document.querySelector('#sign_city').textContent = data.city_zip;
                console.log('Title:', data.titre);
                console.log('Date1:', data.date);
                console.log('Date2:', data.post);
                console.log('Files:', data.files);
                console.log('Description:', data.description);
                console.log('Files:', data.files);

                var modalBody = document.querySelector('.modal-body');
            var tabContainer = document.querySelector('.tab');
            // Ensure data.files is an array
            let filesArray = Array.isArray(data.files) ? data.files : JSON.parse(data.files);
            filesArray.forEach((file, index) => {
                // Create button element
                var button = document.createElement('button');
                button.className = 'tablinks';
                button.textContent = `File ${index + 1}`;
                button.setAttribute('onclick', `openCity(event, 'file${index}')`);
                tabContainer.appendChild(button);

                // Create div element
                var div = document.createElement('div');
                div.id = `file${index}`;
                div.className = 'tabcontent';
                // div.innerHTML = `<h3>File ${index + 1}</h3><img src="${file}" alt="File ${index + 1}">`;
                // Si le ficher est une video
                if (file.match(/\.(mp4|webm|ogg)$/)) {
                    div.innerHTML = `<video width="320" height="240" controls><source src="${file}" type="video/mp4">Your browser does not support the video tag.</video>`;
                }
                // Si le fichier est une image
                if (file.match(/\.(jpe?g|png|gif)$/)) {
                    div.innerHTML = `<img width='100%' src="https://api.cdf.mael-cv.me/${file}" alt="File ${index + 1}">`;
                } else {
                    div.innerHTML = `<a href="${file}" target="_blank">Download file ${index + 1}</a>`;
                }
                modalBody.appendChild(div);
            });
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    // Fetch signalement data if id is present
    if (id) {
        fetchSignalementData(id);
    } else {
        document.location.href = 'index.html';
    }
});