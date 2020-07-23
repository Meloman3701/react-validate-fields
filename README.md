# React validate fields v1.1.0

This library provides hooks for react application to validate any type of fields.

### Installation

```sh
$ npm i react-validate-fields --save
```
### Usage

Import the module to your component
```javascript
import { useValidator, rules } from 'react-validate-fields'
```

Define validation rules. You can use existing rules from the libraty or define your own rules
```javascript
const validateRules = {
    email: {
        isEmail: (value) => rules.email(value),     // rule from library
        custom: (value) => {                        // user defined rule
            return true
        },
        asyncRule: (value) => {
            return new Promise((resolve, reject) => { 
                fetch('get-data')
                    .then(() => resolve())
                    .catch(() => reject())
            })
        }
    }
}
```

Defiine validation messages.
```javascript
const validateMessages = {
    email: {
        isEmail: (value) => 'Email is not valid',
        custom: () => 'Custom rule is not passed',
        asyncRule: () => 'Async rule is not passed'
    }
}
```

Apply this rules to your component.
```javascript
function App() {
    const [value, setValue] = useState('')
    const { validate, errors, isValid } = useValidator(validateRules, validateMessages)

    const onChangeHandler = useCallback((e) => {
        setValue(e.target.value)
    }, [])

    const onClickButton = () => {
        validate({
            email: value        // you can pass any variable you want (boolean | string | object | function | etc. )
        }).then((errors) => {
            // all fields are valid
        })
    }

    return (
        <div className="App">
            <Input errors={errors['email']} onChange={onChangeHandler} value={value} />
            <Button onClick={onClickButton}>send form</Button>

            {isValid &&
                <div>form is valid</div>
            }
        </div>
    );
}
```