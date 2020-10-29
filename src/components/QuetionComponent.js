import data from '../data/Questions'
import {useState} from 'react'
function QuetionComponent() {

    let allQuestions = data

    function shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }
    //shuffle(allQuestions)
    
    const [index, setIndex] = useState(0)
    const [question, setQuestion] = useState([])
    const [allAnswer, setAllAnswer] = useState([])
    const [correctQuestion, setCorrectQuestion] = useState([])
    const [playerAnswer, setPlayerAnswer] = useState('')
    const [isAnswer, setIsAnswer] = useState(false)
    const [score, setScore] = useState(0)
    const [isOver, setIsOver] = useState(true)
   

    function handleNextQuestion(){
        if (index < allQuestions.length){
            setIndex(prevIndex => prevIndex + 1)
            //setQuestion(allQuestions[index].question)
            setIsAnswer(false)
            setPlayerAnswer('')
            setCorrectQuestion(allQuestions[index].correct)
            setAllAnswer(allQuestions[index].incorrect.concat(allQuestions[index].correct))
            setQuestion(allQuestions[index].question)
            setAllAnswer(allQuestions[index].incorrect.concat(allQuestions[index].correct))
            setCorrectQuestion(allQuestions[index].correct)
        }else{
            setIsOver(false)
        }
    }

    // It was possible to reload the browser to clear all state, but I preffer do it without reload the page. That's a strength of React Js
    function handleNewGame(){
        setIndex(0)
        setQuestion([])
        setAllAnswer([])
        setCorrectQuestion([])
        setPlayerAnswer('')
        setIsAnswer(false)
        setScore(0)
        setIsOver(true)
    }
    
    const result = <p>Nice &#128175;. Keep going!!!</p>
    const resultCorrect = <p>Wrong answer, The correct answer is : {correctQuestion}</p>
   
    return (
        <>
            <div className={`box-question card ${ !isOver ? 'display' : ''}`}>
            <div className="card-body">
                <h5 className="card-title">{question}</h5>    
                <div className="answers">
                {
                    shuffle(allAnswer.map(item => <button key={Math.random().toString()} className="btn btn-danger" onClick={() => {
                        setAllAnswer([item])
                        setPlayerAnswer(item)
                        setIsAnswer(true)
                        if (item === correctQuestion)
                            setScore(score + 10)
                        
                    }} >{item}</button>))
                    
                }
                </div>
                
                <p>{ (isAnswer) ? 
                    (playerAnswer === correctQuestion) ? result  : resultCorrect
                    : null

                }</p>
                
                
            </div>
            
            <button className="btn btn-primary" onClick={handleNextQuestion}>{`${index === 0 ? 'Start a new game' : 'Next Question'}`}</button>
            </div>

            <div className={`box-question card ${!isOver ? '' : 'display'}`}>
                <div className="card-body center score">
                    {score} 
                </div>
                <button className="btn btn-primary" onClick={handleNewGame}>Restart the game</button>
            </div>
        </>

    )
}

export default QuetionComponent