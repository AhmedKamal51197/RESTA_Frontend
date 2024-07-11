
export function CartCard(props){
    return(
        <>
        {/* <div className="card mb-3 col-12"  >
        <div className="row ">
            <div className="col-md-4">
            <img src={props.src}  className=" rounded-start" height={75} width={75} alt="..."/>
            </div>
            <div className="col-md-8">
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <p className="card-text">{props.price}</p>
                <span>
                    <button className="btn" onClick={(props.increase)}>
                    <i class="fa-solid fa-plus fa-xs"></i>
                    </button>
                    {props.quant}
                    <button className="btn" onClick={(props.decrease)}>
                    <i class="fa-solid fa-minus fa-xs"></i>    
                    </button>
                </span>

            </div>
            </div>
        </div>
        </div> */}

<div  className="cart-card d-flex" >
<img
                    key={props.src}
                    src={`http://127.0.0.1:8000/storage/${props.src}`
                }
                width={100}
                />
          {/* <img src={props.src} alt={props.pokemon}  width={100}/> */}
          <div className="cart-details">
            <h5>{props.title}</h5>
            <p className="text-black-50 para">{props.description}</p>
            <div className="d-flex justify-content-between align-items-center">
              <p className="price"> OMR {props.price}</p>
              <span>
                    <button className="btn inc" onClick={(props.increase)}>
                    <i class="fa-solid fa-plus fa-xs"></i>
                    </button>
                    {props.quant}
                    <button className="btn dec" onClick={(props.decrease)}>
                    <i class="fa-solid fa-minus fa-xs"></i>    
                    </button>
                </span>
            </div>
          </div>
        </div>
        </>
    )
}