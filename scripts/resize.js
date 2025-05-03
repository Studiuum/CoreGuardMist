// Function to print the screen dimensions
function printScreenDimensions() {
    const width = window.innerWidth;
    const height = window.innerHeight;
  
    console.log(`Screen width: ${width}px`);
    console.log(`Screen height: ${height}px`);
}
  
// Call the function
printScreenDimensions();

// You can also call this function whenever the window is resized
window.addEventListener('resize', printScreenDimensions);