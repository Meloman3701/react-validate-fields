import {useState} from 'react'

export function useValidator(rules, messages) {
    const [isValid, setIsValid] = useState(false)
    
    const errors_init = Object.keys(rules).reduce((errors, field_name) => {
        errors[field_name] = []
        return errors
    }, [])

    const [errors, setErrors] = useState(errors_init)

    const validate = (fields) => {
        return new Promise((resolve, reject) => {
            let promises = []
            let valid = true
            const errors = {}
            const field_names = Object.keys(fields)

            field_names.map(field_name => {
                errors[field_name] = []
                const field_value = fields[field_name]
                const rules_for_field = rules[field_name]
                const rules_names = Object.keys(rules_for_field)

                rules_names.map(rule_name => {
                    promises.push(
                        new Promise(async (resolve, reject) => {
                            try {
                                const validate_func = rules[field_name][rule_name]
                                const isValid = await validate_func(field_value)
                                if (isValid === false) {
                                    throw 'not valid function'
                                } else {
                                    resolve()
                                }
                            } catch {
                                valid = false
                                const message_func = messages[field_name][rule_name]
                                errors[field_name].push(message_func(field_value))
                                reject()
                            }
                        })
                    )
                })
            })

            Promise.allSettled(promises).then(() => {
                setErrors(errors)
                setIsValid(valid)
                valid ? resolve() : reject(errors)
            })
        })
    }

    return {
        validate,
        isValid,
        errors,
        setErrors
    }
}