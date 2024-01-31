const Validator = (options) => {
  var seletorRules = {};
  const validate = (inputElement, rule) => {
    var errorElement = inputElement.parentElement.querySelector(options.error);
    var errorMessage;
    var rules = seletorRules[rule.selector];
    for (var i = 0; i < rules.length; i++) {
      errorMessage = rules[i](inputElement.value);
      if (errorMessage) break;
    }

    if (errorMessage) {
      errorElement.innerText = errorMessage;
      inputElement.parentElement.classList.add('invalid');
    } else {
      errorElement.innerText = '';
      inputElement.parentElement.classList.remove('invalid');
    }
  };

  var formElement = document.querySelector(options.form);
  if (formElement) {
    formElement.onsubmit = (e) => {
      e.preventDefault();
      options.rules.forEach((rule) => {
        var inputElement = document.querySelector(rule.selector);
        validate(inputElement, rule);
      });
    };

    options.rules.forEach((rule) => {
      var inputElement = document.querySelector(rule.selector);

      if (Array.isArray(seletorRules[rule.selector])) {
        seletorRules[rule.selector].push(rule.test);
      } else {
        seletorRules[rule.selector] = [rule.test];
      }

      if (inputElement) {
        inputElement.onblur = () => {
          validate(inputElement, rule);
        };

        inputElement.oninput = () => {
          var errorElement = inputElement.parentElement.querySelector(
            options.error,
          );
          errorElement.innerText = '';
          inputElement.parentElement.classList.remove('invalid');
        };
      }
    });
  }
};

Validator.isRequired = (selector) => {
  return {
    selector: selector,
    test: (value) => {
      return value.trim() ? undefined : 'Please enter this field';
    },
  };
};

Validator.isEmail = (selector) => {
  return {
    selector: selector,
    test: (value) => {
      var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return regex.test(value) ? undefined : `Please enter the correct email address`;
    },
  };
};


Validator.isPassword = (selector) => {
  return {
    selector: selector,
    test: (value) => {
      // Regex này kiểm tra ít nhất một ký tự in hoa và một ký tự đặc biệt
      var regex = /^(?=.*[A-Z])(?=.*[!@#$&*]).*$/;
      return regex.test(value) ? undefined : `Password must have at least one capital letter and one special character`;
    },
  };
};


Validator.isMinLength = (selector, min) => {
  return {
    selector: selector,
    test: (value) => {
      return value.trim().length >= min
        ? undefined
        : `Minimum please ${min} characters or more`;
    },
  };
};


Validator.isMaxLength = (selector, max) => {
  return {
    selector: selector,
    test: (value) => {
      return value.trim().length <= max
        ? undefined
        : `Please enter max ${max} characters`;
    },
  };
};

Validator.isConfirmed = (selector, getConfirmValue) => {
  return {
    selector: selector,
    test: (value) => {
      return value.trim() == getConfirmValue()
        ? undefined
        : `Passwords are inconsistent`;
    },
  };
};

export default Validator;
