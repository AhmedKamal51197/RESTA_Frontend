
export function FilterCard(props){
    return(
        <>
        
        <button className="btn filter-button" onClick={props.filterr}>
            <img src={props.img} height={50} width={75} ></img>
            <strong> <p>{props.title}</p></strong>
        </button>
        </>
    )
}