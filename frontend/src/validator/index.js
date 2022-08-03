import { defineRule } from 'vee-validate';

export default function registerGlobalFieldValidationRules() {

     defineRule('required', value => {
        if (!value || !value.length) {
          return 'Required field';
        }
        return true;
      });
      
     defineRule('email', value => {
        // Field is empty, should pass
         // if the field is empty
         if (!value) {
            return "Email required";
          }
          // if the field is not a valid email
          const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
          if (!regex.test(value)) {
            return "Invalid email adresse";
          }
          // All is good
          return true;
      });

      defineRule('minLength', (value, [limit]) => {
        // The field is empty so it should pass
        if (!value || !value.length) {
          return true;
        }
        if (value.length < limit) {
          return `Minimum ${limit} characters`;
        }
        return true;
      });

      defineRule('numeric', (value) => {
        // The field is empty so it should pass
        if(!/^[0-9]*$/.test(value)) {
            return 'Only digits'
        }
        return true;
        });


      defineRule('between', (value, [min, max]) => {
        // The field is empty so it should pass
        if (!value || !value.length) {
          return true;
        }
        const numericValue = Number(value);
        if (numericValue <= min) {
          return `Greater than or equal to ${min}`;
        }
        if (numericValue >= max) {
          return `Less than or equal to ${max}`;
        }
        return true;
      });
}
