
import React from 'react';
import { ErrorMessage, FieldArray } from 'formik';

const SelectedInputButton = (props) => {
    return (
        <div className="form-group row mb-0 border">
            {props.title && <label htmlFor="example-text-input" className={`${props.lablecol} col-form-label`}>{props.title}</label>}
            <div className={`${props.inputcol}`}>
                <select disabled={props.disabled} style={{ width: "150px" }} className="form-control" value={props.value} id={props.id} name={props.name} onChange={props.handleChange} onBlur={props.handleBlur}>
                    <option value="0" disabled>Select</option>
                    {props.options.map((x, i) => (<option key={i} value={x.value}>{x.title}</option>))}
                </select>
                {props.validation && < ErrorMessage className="error" name={props.name} component='div' />}
            </div>
        </div>
    )
}

export default SelectedInputButton