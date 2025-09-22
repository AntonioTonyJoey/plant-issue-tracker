import { useEffect, useMemo, useState } from 'react';

export const useForm = ( initialForm = {}, validaciones = {} ) => {
  
    const [ formState, setFormState ] = useState( initialForm );
    const [validacion, setValidationes] = useState({});
    
    useEffect(() => {
      createValidators();
    }, [formState])
    
    const isFormValid = useMemo(() => {
        for (const formValue of Object.keys(validacion)) {
            
            if(validacion[formValue] !== '') return false;
        }
        return true;
    },[validacion]);

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    const OnInputChangeFile = ({target}) => {
        const {files,name} = target
        setFormState({
            ...formState,
            [ name ]: (files.length > 0) ? files[0] : ''
        });
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }

    const createValidators = () => {
        const formCheckVal = {};
        for(const formField of Object.keys(validaciones)){
            const [fn, errorMessage] = validaciones[formField];
            formCheckVal[`${formField}Valid`] = fn(formState[formField]) ? '' : errorMessage;
        }
        
        setValidationes(formCheckVal);
    }

    return {
        ...formState,
        formState,
        onInputChange,
        OnInputChangeFile,
        onResetForm,
        ...validacion,
        isFormValid,
        validacion
    }
}