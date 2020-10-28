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
    shuffle(allQuestions)
    
    const [index, setIndex] = useState(0)
    const [question, setQuestion] = useState(allQuestions[index].question)
    const [allAnswer, setAllAnswer] = useState(allQuestions[index].incorrect.concat(allQuestions[index].correct))
    const [correctQuestion, setCorrectQuestion] = useState(allQuestions[index].correct)
    const [playerAnswer, setPlayerAnswer] = useState('')
    const [isAnswer, setIsAnswer] = useState(false)
    const [score, setScore] = useState(0)

    function handleNextQuestion(){

        if (index < allQuestions.length){
            setIndex(index+1)
            setQuestion(allQuestions[index].question)
            setIsAnswer(false)
            setPlayerAnswer('')
            setCorrectQuestion(allQuestions[index].correct)
            setAllAnswer(allQuestions[index].incorrect.concat(allQuestions[index].correct))
            //shuffle(allAnswer)
        }else{
            console.log('no more questions')
        }
       
    }
    
    const result = <p>Bonne reponse. Keep going!!!</p>
    const resultCorrect = <p>Mauvaise reponse, la bonne reponse est: {correctQuestion}</p>
   
    return (
        <div className='box-question card'>
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
            
            <button className="btn btn-primary" onClick={handleNextQuestion}>Next Questions</button>
        </div>

    )
}

export default QuetionComponent