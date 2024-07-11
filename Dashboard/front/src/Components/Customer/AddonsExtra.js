

export function AddonsExtra(props){
   
      return(
          <>
          <div  className="cart-card d-flex mx-2"  >
            {props.img && (
                <img src={`http://127.0.0.1:8000/storage/${props.img}`} alt="Addon" width={70}></img>

            )}
          
          <div className="form-check">
          <input className="form-check-input" type="checkbox" name={props.inputName} id={`radio-${props.name}`} onChange={props.change} />
          <label className="form-check-label" for={`radio-${props.name}`} >
            {props.name}
          </label>

          <p><strong>{props.price}</strong> </p>

          
        </div>
          
          
        </div>
          </>
      )
  }