/** Reveal `.fade-in` elements inside `root` (or the whole document). */
export function revealFadeInElements(root: ParentNode = document): void {
  const nodes = root.querySelectorAll(".fade-in:not(.visible)");
  if (!nodes.length) return;

  if (!("IntersectionObserver" in window)) {
    nodes.forEach((el) => el.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.05, rootMargin: "0px 0px -20px 0px" }
  );

  nodes.forEach((el) => observer.observe(el));
}
