document.querySelector('.share-button').addEventListener('click', function() {

    // Get values from inputs
    const manifestUri = document.getElementById('manifestUri').value;
    const clearKey = document.getElementById('clearKey').value;

    // Check if inputs are empty
    if (!manifestUri || !clearKey) {
        const shareButton = document.querySelector('.share-button');
        shareButton.style.backgroundColor = 'red'; // Change button color to red

        // Revert to original color after 1 second
        setTimeout(() => {
            shareButton.style.backgroundColor = '';
        }, 1000);

        console.warn('Please fill in both input fields.'); // Log a warning
        return; // Exit the function if inputs are empty
    }

    // Construct the final link
    const finalLink = `${manifestUri}|drmScheme=clearkey&drmLicense=${clearKey}`;

    // Encode the link to base64
    const base64Link = btoa(finalLink);

    // Build the full link
    const fullLink = `https://azrotv.com/extras/shaka-player/?id=${base64Link}`;

    // Copy the link to clipboard
    navigator.clipboard.writeText(fullLink).then(() => {
        console.log('Link copied successfully: ', fullLink);

        // Change the button color to green
        const shareButton = document.querySelector('.share-button');
        shareButton.style.backgroundColor = 'green';

        // Add 'Copied' text
        shareButton.innerText = 'Copied';

        // Revert to original color and text after 2 seconds
        setTimeout(() => {
            shareButton.style.backgroundColor = '';
            shareButton.innerText = 'Share'; // or the original text you want to use
        }, 2000);

    }).catch(err => {
        console.error('Failed to copy the link: ', err);
    });
});

// Decode
document.addEventListener('DOMContentLoaded', function() {
    // Get the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const encodedId = urlParams.get('id');

    if (encodedId) {
        // Decode Base64
        const decodedLink = atob(encodedId);

        // Extract values
        const parts = decodedLink.split('|');
        if (parts.length === 2) {
            const manifestUri = parts[0];
            const drmParams = parts[1].split('&');
            let clearKey = '';

            // Search for clearKey value
            drmParams.forEach(param => {
                if (param.startsWith('drmLicense=')) {
                    clearKey = param.split('=')[1];
                }
            });

            // Fill inputs with extracted values
            document.getElementById('manifestUri').value = manifestUri;
            document.getElementById('clearKey').value = clearKey;
        }
    }
});
