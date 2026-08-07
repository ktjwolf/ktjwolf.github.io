window.addEventListener('DOMContentLoaded', function() {
    const rows = document.querySelectorAll('#photo-grid .row');
  
    rows.forEach(row => {
        let imagesLoaded = 0; // counter for loaded images
        const images = row.querySelectorAll('img');
        
        // initially hide entire row
        row.classList.add('hidden');

        // store image aspect ratios
        const aspectRatios = new Map();

        images.forEach(img => {
            const loadImage = () => {
                const aspectRatio = img.naturalWidth / img.naturalHeight;
                aspectRatios.set(img, aspectRatio);
                imagesLoaded++;

                // check all images in row are loaded
                if (imagesLoaded === images.length) {
                    resizeImages(row, aspectRatios);
                    // unhide row after resizing images
                    row.classList.remove('hidden');
                }
            };

            if (img.complete && img.naturalHeight !== 0) {
                loadImage();
            } else {
                img.addEventListener('load', loadImage);
            }
        });
    });

    function resizeImages(row, aspectRatios) {
        let totalAspectRatio = 0;
        aspectRatios.forEach(aspectRatio => {
            totalAspectRatio += aspectRatio;
        });

        // get variable image margins
        const style = getComputedStyle(row.querySelector('img'));
        const margins = parseFloat(style.margin) + parseFloat(style.margin); // assume margin has 1 value
        
        // set image width based on aspect ratio
        aspectRatios.forEach((aspectRatio, img) => {
            const percentageWidth = (aspectRatio / totalAspectRatio) * 100;
            img.style.width = `calc(${percentageWidth}% - ${margins}px)`;
        });
    }
});