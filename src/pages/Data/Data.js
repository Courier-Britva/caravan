import './data.css'

function Data() {
    return (
        <div className="overlay">
            <div className='data_container'>
                <div className='data_head'>
                    <div className="data_element_container">
                        <span className="data_name">
                            author
                        </span>
                        <span className="data_value">
                            Artem Tarasov
                        </span>
                    </div>
                    <div className="data_element_container">
                        <span className="data_name">
                            last update
                        </span>
                        <span className="data_value">
                            15.11.2024
                        </span>
                    </div>
                </div>
                <div className="data_body">

                    <span className="notes_head">
                        Notes
                    </span>
                    <div className="note_element">
                        <span className="note_element_name">
                            How to play
                        </span>
                        <p className="note_element_text">
                        two players building three opposing piles (or "caravans") of numbered cards. The goal is to outbid your opponent's caravan with the highest value of numbered cards without being too light (under 21) or overburdened (over 26).
                        <br/>
                        <br/>
                        First card in the caravan determine the suit of the caravan, the second is direction. Once the Club 8 is placed on the empty caravan, you may use any card. Once the second card is placed (Lets say Diamond 7), the next card MUST be the 6 since the direction of the caravan is set to down or any card of the Club                       
                        </p>
                    </div>
                    <div className="note_element">
                        <span className="note_element_name">
                            Cards value
                        </span>
                        <p className="note_element_text">
                            Cards from 6 to 10 adds to the caravan value of the card itself. Jack remove the last card of the caravan. Queen reverse the hand direction. King double last Card value. ( 2 + King = 4, 2 + King + King = 8)
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Data