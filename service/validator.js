const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// get element in form 
function validator(selector, options){
    var formRules = {};

    if(!options){
        options = {};
    }

    function getParent(element, selector){

        while (element.parentElement) {
            if(element.parentElement.matches(selector)){
                return element.parentElement;
            }
            element = element.parentElement;
        }

    }
    
    // rule handling 
    // Quy ước tạo rules :
    //     - nếu có lỗi thì: return 'message'
    //     - nếu không có lỗi thì reuturn: undefined 
    var validatorRules = {
        required: function(value){
            return value ? undefined : 'vui lòng nhập vào đây';
        },
        email: function(value){
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : 'vui lòng nhập email vào đây';
        },
        name: function(value){
            var regex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
            return regex.test(value) ? undefined : 'Hãy nhập tên chính xác'
        }
        ,
        min: function(min){
            return function(value){
                return value.length >= min ? undefined : `bạn phải nhập trên ${min} kí tự`;
            }
        }
    }

// just run whenever have selector of the form 
    var formElement = $(selector);
    if(formElement){
        var inputs = formElement.querySelectorAll('[name][rules]');

        // get the name and take it  value equal rules 

        for(input of inputs){

            var rules = input.getAttribute('rules').split('|');
            

            for(rule of rules){

                var rulueHasValue = rule.includes(':');
                var ruleValue;

                if(rulueHasValue){
                    ruleValue = rule.split(':');
                    rule = ruleValue[0];
                }

                var ruleFunc = validatorRules[rule];

                if(rulueHasValue){
                    ruleFunc = ruleFunc(ruleValue[1]);
                }
                
                if(Array.isArray(formRules[input.name])){
                    formRules[input.name].push(ruleFunc);
                } else{
                    formRules[input.name] = [ruleFunc];
                }

            }

            // listen to validate even (blur, change, ...)
            input.onblur = handleValidate;
            input.oninput = handleClearlidate;
            
        }

        function handleValidate(event){ 
            var rules = formRules[event.target.name];
            var errorMess;
            rules.find((rule) => {
                errorMess = rule(event.target.value);
                return errorMess;
            })
            
            if(errorMess){
                var formGroup = getParent(event.target, '.form-group');
                if(formGroup){
                    formGroup.classList.add('invalid');
                    var formMess = formGroup.querySelector('.form-message');
                    if(formMess){
                        formMess.innerText = errorMess;
                    }
                }
        
            }
            return !errorMess;
        }

        function handleClearlidate(event){
            var formGroup = getParent(event.target, '.form-group');
            if(formGroup.classList.contains('invalid')){
                formGroup.classList.remove('invalid');
                var formMess = formGroup.querySelector('.form-message');
                if(formMess){
                    formMess.innerText = '';
                }
            }
        }

        // handling when submit form
        formElement.onsubmit = function(event) {
            event.preventDefault();

            var isValid = true;

            for(var input of inputs){
                if(!handleValidate({target: input})){
                    isValid = false;
                }
            }

            if(isValid){
                
                if(typeof options.onSubmit === 'function'){    
                    options.onSubmit();
                } else {
                    console.log('oke')
                }
            }
            
        }

    }
}