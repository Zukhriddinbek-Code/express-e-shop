const deleteProduct = (btn) => {
  const csrf = btn.parentNode.querySelector("[name=_csrf]").value;
  const prodId = btn.parentNode.querySelector("[name=productId]").value;

  fetch("/admin/product/" + prodId, {
    method: "DELETE",
    headers: {
      "csrf-token": csrf,
    },
  })
    .then((result) => console.log(result))
    .catch((err) => console.log(err));
};
