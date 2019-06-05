  /* MODULE 1  */
var budgetController = (function () { //Iefe(Immediately Evoked Function Expression) private variables

var Expense = function(id, description, value){ //Constructor for Expenses
   this.id = id;
   this.description = description;
   this.value = value;
};

var Income = function(id, description, value){ //Constructor for Incomes
   this.id = id;
   this.description = description;
   this.value = value;
};

/*****DATA STRUCTURE AS ARRAY TO STORE DATA ***/
var data = { //naming exp and inc same as the value in HTML file 
    allitems: {
      exp: [],
      inc: []
    },

    totals: {
      exp: 0,
      inc: 0
    }
}
/*************************************************/

return{
  addItem: function(type, des, val){ //From getInput Method
    var newItem,ID;
    //Every newly entered input should have an ID 
    //example: arr= [1,2,3,4,5] Next id = 6, therefore ID = lastID + 1
     if(data.allitems[type].length > 0){
       ID = data.allitems[type][data.allitems[type].length - 1].id + 1; 
     }else{
       ID = 0;
     }
    
    //Create New Item based on 'inc' or 'exp' type (See HTML)
    if(type === 'exp'){
       newItem = new Expense(ID, des, val);
    }else if(type === 'inc'){
       newItem = new Income(ID, des, val);
    }

    //Push them into the Data object
    data.allitems[type].push(newItem);

    //Return new Element
    return newItem;
  }
};
})();

  /* MODULE 2 */
  var UIController = (function () {

      var DOMStrings = { //For Making hardcoded selector groups more easy to work on
          inputType: '.add__type',
          inputDesc: '.add__description',
          inputValue: '.add__value',
          inputBtn: '.add__btn',
          incomeContainer: '.income__list',
          expenseContainer: '.expenses__list'
      };
       //For Controlling the UI
      return{
          getInput: function () { //getInput is a Public method and I am using Closure
              return{
                  type: document.querySelector(DOMStrings.inputType).value, //for +,-
                  description: document.querySelector(DOMStrings.inputDesc).value,
                  value: parseFloat(document.querySelector(DOMStrings.inputValue).value) //Converts string to float
              };
          },
        /********DOM MANIPULATION*******/
addListItem: function(obj, type){
var html, newHTML, element;
 //Creating HTML string with placeholder Text
         if(type === 'inc'){
           element = DOMStrings.incomeContainer; //Class in the HTML file
html = '<div class="item clearfix" id="income-%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
       }
        else if(type === 'exp'){
          element = DOMStrings.expenseContainer; //class in the HTML file
html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
       }
       //Replace the placeholder with actual data
       newHTML = html.replace('%id%', obj.id);
       newHTML = newHTML.replace('%description%', obj.description);
       newHTML = newHTML.replace('%value%', obj.value);
      
       //Insert the HTML into the DOM
         document.querySelector(element).insertAdjacentHTML('beforeend',newHTML); 
          },
  
       //Clear the input fields once filled
          clearFields: function(){
             var fields, fieldsArr;

             fields = document.querySelectorAll(DOMStrings.inputDesc + ', ' + DOMStrings.inputValue);
             fieldsArr = Array.prototype.slice.call(fields); //Treating fields as Array

             fieldsArr.forEach(function(current, index, array){
               current.value = "";
             }); 
             fieldsArr[0].focus(); //Focuses back the the first index(Description) after filling and entering previous time
          },

          getDOMstrings: function () { //closure for DOMstrings or Exposing the function to public
               return DOMStrings;
          }
      };
  })();

      // GLOBAL APP CONTROLLER
  /* MODULE 3 for connecting those 2 seperate Modules */
  var controller = (function (budgetCtrl, UICtrl) {
      var setupEventListeners = function(){

      document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem); //Passing Functions as arguments

      document.addEventListener('keypress', function (e) {

          if(e.keyCode === 13 || e.which === 13){ //Keycode for Return Key
              ctrlAddItem();
          }

      });

    };

      var DOM = UICtrl.getDOMstrings(); //using the above getDomStrings to this module

      var updateBudget = function() {
        
        // 1. Calculate budget

        // 2. Return the Budget

        // 3. Display the Budget in the UI
      };

      var ctrlAddItem = function () {
        var Input, newItem;
          // 1. Get the Field input Data
          input = UICtrl.getInput(); // Using the public method getInput from Module 2

          if(input.description !== "" && !isNaN(input.value) && input.value > 0){
         
          // 2. Add the item to budget controller
          newItem = budgetCtrl.addItem(input.type, input.description, input.value); //using Public method addItem from Module 1

          // 3. Add the Item to UI
          UICtrl.addListItem(newItem, input.type); //newItem is an object & input.type is the Type [addListItem(obj, type)]
          
          // 4. Clear Field
          UICtrl.clearFields();

          // 5. Calculate & Update Budget
          updateBudget();

        }
          
      };

      return { //For Intialising the function at the launch of the program
        init: function(){
          console.log("Application is working");
          setupEventListeners();
        }
      }

  })(budgetController, UIController);

 /*****START THE APPLICATION*******/
  controller.init();
/******IMPORTANT CODE************/ 
