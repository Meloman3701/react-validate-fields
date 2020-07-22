# React validate fields v1.0.5

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
        isEmail: (value) => rules.email(value),
        custom: (value) => {
            return true
        },
        asyncRule: (value) => {
            return new Promise((resolve, reject) => { 
                fetch('get-data')
                    .then(() => {
                        resolve()
                    })
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
        asyncRule: () => 'Async rules is not passed'
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
            email: value
        }).then(() => {
            // all fields are valid
        })
    }

    return (
        <div className="App">
            <Input errors={errors['email']} onChange={onChangeHandler} value={value} />
            <Button onClick={onClickButton}>send form</Button>

            {isValid &&
                <div>is valid</div>
            }
        </div>
    );
}
```