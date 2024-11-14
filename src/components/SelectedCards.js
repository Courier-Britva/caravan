
function selectedCards() {

    return(
        <div className='card_container'>
            <img src={cardName} className='card_name card_name_top' alt="card top"/>
            <span className='card_value'>
                {cardValue}
            </span>
            <img src={cardName} className='card_name card_name_bottom' alt="card bottom"/>
        </div>
    )
}

export default selectedCards