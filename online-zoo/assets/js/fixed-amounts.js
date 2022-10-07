class DonateAmounts {
  constructor(list, input) {
    this.list = list;
    this.input = input;
    this.fixedAmountsValues = Array.from(list, node => node.value);
  }
  handleInput() {
    this.input.value = this.input.value.slice(0, 4);
    if (this.fixedAmountsValues.includes(this.input.value)) {
      for (const input of this.list) {
        if (this.input.value === input.value) {
          input.checked = true;
          break;
        }
      }
    } else {
      for (const input of this.list) {
        if (input.checked) {
          input.checked = false;
          break;
        }
      }
    }
    this.renderChecked();
  }
  renderChecked() {
    for (const node of this.list) {
      if (node.checked) {
        node.parentNode.classList.add("fixed-amounts-radio-wrapper-checked");
        this.input.value = node.value;
      } else {
        node.parentNode.classList.remove("fixed-amounts-radio-wrapper-checked");
      }
    }
  }
}

const amounts = new DonateAmounts(
  document.getElementsByName("fixed-amounts"),
  document.getElementsByClassName("another-amount")[0]
);
amounts.list.forEach(node =>
  node.addEventListener("input", amounts.renderChecked.bind(amounts))
);
amounts.input.addEventListener("input", amounts.handleInput.bind(amounts));

/* console.log(fixedAmounts.getList().lastElementChild); */
