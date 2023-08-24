const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const linkElements = document.querySelectorAll("a");

linkElements.forEach(link => {
  let interval = null;
  let isAnimating = false;

  link.onmouseover = event => {  
    if (isAnimating) return;
    isAnimating = true;

    let iteration = 0;

    clearInterval(interval);

    function animate() {
      link.innerText = link.innerText
        .split("")
        .map((letter, index) => {
          if (index < iteration) {
            return link.dataset.value[index];
          }
        
          return letters[Math.floor(Math.random() * 26)];
        })
        .join("");

      if (iteration >= link.dataset.value.length) {
        clearInterval(interval);
        isAnimating = false;
      } else {
        iteration += 1 / 3;
        interval = setTimeout(animate, 30);
      }
    }

    animate();
  };

  link.onmouseout = () => {
    clearInterval(interval);
    link.innerText = link.dataset.value;
    isAnimating = false;
  };
});

