export function lockPageScroll() {
  const { style } = document.body;
  const offset = window.scrollY;

  style.position = "fixed";
  style.insetInline = "0";
  style.top = `${-offset}px`;

  return () => {
    style.position = "";
    style.insetInline = "";
    style.top = "";
    window.scrollTo({ top: offset, behavior: "instant" });
  };
}
