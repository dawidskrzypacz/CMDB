class DeleteModal {
  constructor(modalId, confirmButtonId) {
    this.modal = document.getElementById(modalId);
    this.confirmDeleteBtn = document.getElementById(confirmButtonId);
    this.itemIdToDelete = null;

    this.init();
  }

  init() {
    this.modal.addEventListener("show.bs.modal", (event) =>
      this.onShowModal(event)
    );
    this.confirmDeleteBtn.addEventListener("click", () =>
      this.onConfirmDelete()
    );
  }

  onShowModal(event) {
    const button = event.relatedTarget;
    this.itemIdToDelete = button.getAttribute("data-id");
    const deleteUrl = button.getAttribute("data-url");
    this.confirmDeleteBtn.setAttribute("data-url", deleteUrl);
  }

  onConfirmDelete() {
    const form = document.createElement("form");
    form.method = "post";
    form.action =
      this.confirmDeleteBtn.getAttribute("data-url") +
      "/" +
      this.itemIdToDelete;

    document.body.appendChild(form);
    form.submit();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  new DeleteModal("deleteModal", "confirmDeleteBtn");
});
