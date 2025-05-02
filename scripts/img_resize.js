window.addEventListener('load', function() {
    // Get the height of .section-details
    const sectionDetails = document.querySelector('.section-details');
    const peppersprayImg = document.querySelector('.pepperspray-img');
    
    // Get the height of .section-details
    const sectionHeight = sectionDetails.offsetHeight;
    console.log(sectionHeight*2)
    // Set the height of .pepperspray-img to match the height of .section-details
    peppersprayImg.style.height = `${sectionHeight}px`;
    peppersprayImg.style.width = `${sectionHeight*1.2}px`;
  });

// Also update the height dynamically if the window is resized
window.addEventListener('resize', function() {
    const sectionDetails = document.querySelector('.section-details');
    const peppersprayImg = document.querySelector('.pepperspray-img');
    
    const sectionHeight = sectionDetails.offsetHeight;
    peppersprayImg.style.height = `${sectionHeight}px`;
});