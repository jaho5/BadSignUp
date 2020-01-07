import React, {useState, useEffect} from 'react'
import './Form.css';

export default function Form({title, inputs, setFunc, show, setShow, req}) {

    const [fields, setFields] = useState({})

    const inputChange = e => {

        const tmpFields = fields

        const target = e.target;
        const value =  target.value;
        const name = target.name;
        tmpFields[name]=value;
    
        setFields(tmpFields);
    }

    const sendFields = e => {
        e.preventDefault();
        for(let field in fields) {
            setFunc[field](fields[field])
        }
        setFields({})
        setShow(false)
    }

    if (!show) return null;

    return (
        <div className='overlay' onClick={()=>setShow(false)}>
            <form className='center-modal pure-form' onClick={e=>e.stopPropagation()} onSubmit={sendFields}>
                <p>{title}</p>
                <fieldset>
                    {inputs.map((name,i) => {
                        return (
                        <div  key={i}>
                            <input className='form-fields' name={name} onChange={inputChange} placeholder={name} required={req!=undefined&&req.has(name)}></input>
                        </div>
                        )
                    })}
                    <input className='pure-button button-style'type='submit'></input>
                </fieldset>
            </form>
        </div>
    )
}

