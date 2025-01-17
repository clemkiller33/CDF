document.addEventListener('DOMContentLoaded', function() {
    // Function to get the value of a query parameter
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    // Get the value of the 'q' parameter
    const query = getQueryParam('q');
    let index = 0;
    if (query) {
        // Send a request to the API
        fetch(`${server}?token=${token}&key=${key}&api=search&action=${query}`)
        .then(response => response.json())
        .then(data => {
            // Handle the data received from the API
            console.log(data.data);
            // You can add code here to display the data on the page
            const grid = document.getElementById('grid_recherche');
            data.data.forEach(result => {
                const div = document.createElement('div');
                div.className = 'signalement id_' + data.data[index].id;
                div.onclick = () => { window.location.href = "signalement.html?id=" + result.id; };

                let description = data.data[index].description.substring(0, 20);

                // Convert SQL datetime to date and time
                let datetime = new Date(data.data[index].post);
                let date = datetime.toISOString().split('T')[0];
                let time = datetime.toTimeString().split(' ')[0];

                if (description.length > 20) {
                    description += '...';
                }

                div.innerHTML = 
                `<div class="text">
                    <h3>${data.data[index].titre}</h3>
                    <h4>${data.data[index].city_zip}</h4>
                    <p>${description}</p>
                </div>
                <div class="date_heure">
                    <p>${date}</p>
                    <p>${time}</p>
                </div>`; // Adjust this to match the structure of your data
                grid.appendChild(div);
                
                index += 1;
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    } else {
        fetch(`${server}?token=${token}&key=${key}&api=search`)
            .then(response => response.json())
            .then(data => {
                // Handle the data received from the API
                console.log(data.data);
                // You can add code here to display the data on the page
                const grid = document.getElementById('grid_recherche');
                data.data.forEach(result => {
                    const div = document.createElement('div');
                    div.className = 'signalement id_' + data.data[index].id;
                    div.onclick = () => { window.location.href = "signalement.html?id=" + result.id; };

                    let description = data.data[index].description.substring(0, 20);

                    // Convert SQL datetime to date and time
                    let datetime = new Date(data.data[index].post);
                    let date = datetime.toISOString().split('T')[0];
                    let time = datetime.toTimeString().split(' ')[0];

                    if (description.length > 20) {
                        description += '...';
                    }

                    div.innerHTML = 
                    `<div class="text">
                        <h3>${data.data[index].titre}</h3>
                        <h4>${data.data[index].city_zip}</h4>
                        <p>${description}</p>
                    </div>
                    <div class="date_heure">
                        <p>${date}</p>
                        <p>${time}</p>
                    </div>`; // Adjust this to match the structure of your data
                    grid.appendChild(div);
                    
                    index += 1;
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }
});