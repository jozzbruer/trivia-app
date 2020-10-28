

function Button(props) {
    return (
        <div >
           <button type='submit' className="btn btn-primary"><p>{props.value}</p></button>
        </div>
    )
}

export default Button
