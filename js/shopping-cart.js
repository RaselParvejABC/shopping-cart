const countFieldChangedEvent = new Event("count-field-changed", {
  bubbles: true,
});

Array.from(document.querySelectorAll("button.btn")).forEach((button) => {
  button.addEventListener("click", function () {
    // Getting Associated Input Field and its Value
    const countInputFieldToChange =
      this.parentNode.querySelector("input.count-field");
    const countInputFieldCurrentValue = countInputFieldToChange.valueAsNumber;

    // Deciding what to Add 1 or -1
    const addend = this.classList.contains("btn-plus") ? 1 : -1;

    // Calculating New Value for Associated Input Field
    const countInputFieldNewValue = countInputFieldCurrentValue + addend;

    // Checking if New Value for Associated Input Field is Valid
    if (countInputFieldNewValue < 0) {
      //Invalid New Value
      return;
    }
    //Setting the Valid New Value
    countInputFieldToChange.value = countInputFieldNewValue;
    countInputFieldToChange.dispatchEvent(countFieldChangedEvent);
  });
});

Array.from(document.querySelectorAll("input.count-field")).forEach(
  (countField) => {
    countField.addEventListener("input", function () {
      const newValue = this.valueAsNumber;
      console.log(newValue);
      if (Number.isNaN(newValue)) {
        this.value = 0;
        return;
      }
      this.value = Number(this.value);
      this.dispatchEvent(countFieldChangedEvent);
    });

    countField.addEventListener("count-field-changed", function () {
      //Setting Total Price for this Item
      const totalPriceForThisItemElement =
        this.parentNode.parentNode.querySelector(".total-price-for-this-item");
      const perItemPrice = Number(
        totalPriceForThisItemElement.dataset.perItemPrice
      );
      const numberOfItems = this.valueAsNumber;
      totalPriceForThisItemElement.textContent = perItemPrice * numberOfItems;

      calculateTotal();
    });
  }
);

function calculateTotal() {
  //Setting Sub-Total Price for all Items

  const subtotal = Array.from(
    document.querySelectorAll(".total-price-for-this-item")
  ).reduce(
    (sumUptoThisFar, currentElement) =>
      sumUptoThisFar + Number(currentElement.textContent),
    0
  );
  const tax = Math.ceil(subtotal * 0.1);
  const total = subtotal + tax;

  document.querySelector(".subtotal-amount").textContent = subtotal;
  document.querySelector(".tax-amount").textContent = tax;
  document.querySelector(".total-amount").textContent = total;

  const shouldCheckOutButtonBeDisabled = total <= 0;

  document.querySelector("button.check-out").disabled =
    shouldCheckOutButtonBeDisabled;
}

Array.from(document.querySelectorAll("img.remove-item")).forEach(
  (removeButton) => {
    removeButton.addEventListener("click", function () {
      const cartItemToBeDeleted = this.closest(".cart-item");
      cartItemToBeDeleted.remove();
      calculateTotal();
    });
  }
);
