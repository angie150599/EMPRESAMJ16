console.log("Web PRO cargada");
document.addEventListener("DOMContentLoaded", () => {
  const cont = document.querySelectorAll("#contenedor");

  if (cont.length === 0) {
    console.warn("No hay elementos con id #contenedor");
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, {
    threshold: 0.1
  });

  cont.forEach(bloque => observer.observe(bloque));
});

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelectorAll("#contenedor2");

  if (container.length === 0) {
    console.warn("No hay elementos con id #contenedor2");
    return;
  }

  const observ = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, {
    threshold: 0.1
  });

  container.forEach(contenedor => observ.observe(contenedor));
});