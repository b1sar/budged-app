class UI {
  constructor() {
    this.budgetFeedback = document.querySelector(".budget-feedback");
    this.expenseFeedback = document.querySelector(".expense-feedback");
    this.budgetForm = document.getElementById("budget-form");
    this.budgetInput = document.getElementById("budget-input");
    this.budgetAmount = document.getElementById("budget-amount");
    this.expenseAmount = document.getElementById("expense-amount");
    this.balance = document.getElementById("balance");
    this.balanceAmount = document.getElementById("balance-amount");
    this.expenseForm = document.getElementById("expense-form");
    this.expenseInput = document.getElementById("expense-input");
    this.amountInput = document.getElementById("amount-input");
    this.expenseList = document.getElementById("expense-list");
    this.itemList = [];
    this.itemID = 0;

    this.childs=[];
  }

  static budged = 0;
  static totalExpenses = 0;
  static currentBalance = 0;

  //submit budged method
  submitBudgedForm(){
    const value = this.budgetInput.value;
    if(value==='' || value <0){
      this.budgetFeedback.classList.add('showItem');//add showItem class dynamically
      this.budgetFeedback.innerHTML = "<p>Value cannot be empty or negative</p>";
      setTimeout(()=>{
        this.budgetFeedback.classList.remove('showItem');//remove the showItem after 4 seconds
      },4000)
    }
    else {
      this.budgetAmount.textContent = value;//sets the budged
      this.budgetInput.value = ''; //reset the form input to blank
      UI.budged = value;
      this.showBalance();
      //TODO: Budged formunu da ortadan kaldır, ve form kaldırıldıktan sonra bu formu tekrar geri 
      // getirecek bir buton koy.
    }
  }

  showBalance()
  {
    console.log("showBalance called");
    const total = this.calcTotalExpense();
    this.balanceAmount.textContent = total;
    if(total<0)
    {
      this.balance.classList.remove('showGreen', 'showBlack');
      this.balance.classList.add('showRed');
    }
    else if(total>0)
    {
      this.balance.classList.remove('showRed', 'showBlack');
      this.balance.classList.add('showGreen');
    }
    else if(total==0)
    {
      this.balance.classList.remove('showGreen', 'showRed');
      this.balance.classList.add('showBlack');
    }

    
  }

  calcTotalExpense()
  {
    let total = UI.budged-UI.totalExpenses;
    return total;
  }

  submitExpenseForm()
  {
    const expenseValue = this.expenseInput.value;
    const amountValue = this.amountInput.value;
    if(expenseValue ==='' ||amountValue === '' || amountValue<0 )
    {
      this.expenseFeedback.classList.add('showItem');
      this.expenseFeedback.innerHTML = "<p>Value cannot be empty and blabla</p>";
      setTimeout(()=>{
        this.expenseFeedback.classList.remove('showItem');//remove the showItem after 4 seconds
      },4000)
    }
    else
    {
      UI.totalExpenses += parseInt(amountValue);
      this.expenseAmount.textContent = UI.totalExpenses;

      let expense = {
        id: this.itemID,
        title: expenseValue,
        amount:amountValue
      }
      this.itemID++;
      this.itemList.push(expense);
      this.addExpense(expense);
      this.showExpense();
      this.showBalance();

      this.amountInput.value = "";
      this.expenseInput.value = "";
    }
  }

  addExpense(expense)
  {
    console.log('addExpense')
    const div = document.createElement('div');
    div.classList.add('expense');
    div.id =expense.id;
    const html=`<div class="expense-item d-flex justify-content-between align-items-baseline">

         <h6 class="expense-title mb-0 text-uppercase list-item">${expense.title}</h6>
         <h5 class="expense-amount mb-0 list-item">${expense.amount}</h5>

         <div class="expense-icons list-item">

          <a href="#" class="edit-icon mx-2" data-id="${expense.id}">
           <i class="fas fa-edit"></i>
          </a>
          <a href="#" class="delete-icon" data-id="${expense.id}">
           <i class="fas fa-trash"></i>
          </a>
         </div>
        </div>
      `;
    div.innerHTML=html;
    this.expenseList.appendChild(div);
    this.childs.push(div);


  }


  removeExpenseListElement(id)
  {

  }
  editExpenseListElement(id)
  {

  }

  showExpense()
  {
    console.log("showExpense called");
    this.expenseAmount.textContent = UI.totalExpenses;
    console.log(UI.totalExpenses.toString());
  }


  editExpense(theExpense)
  {
    const id = parseInt(theExpense.dataset.id);
    const expense = theExpense.parentElement.parentElement.parentElement;

    //remove the expense that is going to be edited
    this.expenseList.removeChild(expense);

    
    let currentExpense = "";

    //remove the expense from the item list
    this.itemList = this.itemList.filter((element)=>{
      if(element.id==id){
        currentExpense = element;
      }
      return element.id !==id;
    })

    this.amountInput.value = currentExpense.amount;
    this.expenseInput.value = currentExpense.title;
   
    console.log(currentExpense);
  }

  deleteExpense(theExpense)
  {
    const expense = theExpense.parentElement.parentElement.parentElement;

    //delete the element
    this.expenseList.removeChild(expense);
  }

}

function eventListeners(){
  const budgedForm = document.getElementById('budget-form');
  const expenseForm = document.getElementById('expense-form');
  const expenseList = document.getElementById('expense-list');
  
  const ui = new UI();

  budgedForm.addEventListener('submit', (event)=>{
    event.preventDefault();//sayfanın yenilenmesini önler
    ui.submitBudgedForm();
  })

  expenseForm.addEventListener('submit', (event)=>{
    event.preventDefault();
    ui.submitExpenseForm();
  })

  expenseList.addEventListener('click', (event)=>{
    console.log(event.target.parentElement);
    if(event.target.parentElement.classList.contains('edit-icon'))
    {
      console.log('geldi');
      ui.editExpense(event.target.parentElement);
      console.log(event.target);
    }
    else if(event.target.parentElement.classList.contains('delete-icon'))
    {
      ui.deleteExpense(event.target.parentElement);
    }
  })
}

document.addEventListener('DOMContentLoaded', ()=>{
  eventListeners();
})
