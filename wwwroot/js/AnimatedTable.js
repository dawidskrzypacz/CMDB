class AnimatedTable {
  addFadeInAnimation() {
    document.getElementById("animated-table").classList.add("fade-in");
  }
}
const _animatedTable = new AnimatedTable();

document.addEventListener("DOMContentLoaded", function () {
  _animatedTable.addFadeInAnimation();
});
