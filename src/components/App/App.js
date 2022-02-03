import React, { useState } from 'react';
import Form from '../Form/Form';
import './App.css';
import { rules } from '../../utils';


function App() {

  const [text, setText] = useState('');
  const [newWord, setNewWord] = useState('');

  function changeWord(word, gramCase) {
    const arr = [...word];
    const lastIndex = arr.length - 1
    const lastLetter = arr[lastIndex]
    const caseText = rules.text[+gramCase];
    const changeCase = () => {
      const newWord = arr.join('')
      setNewWord(newWord)
      setText(`Слово ${word} в ${caseText} падеже: `)
    }
    if (lastLetter.match(/[ёиуюыъэ]/)) {
      setText(`Кажется, вы ввели множественное число, 
              несклоняемое существительное или другую часть речи. 
              Попробуйте другое слово.`)
      setNewWord('')
    } else if (lastLetter.match(/[аяьеой]/)) {
      const wordEnd = rules[lastLetter][+gramCase]
      arr.splice(lastIndex, 1, wordEnd)
      changeCase()
    } else {
      const wordEnd = rules.consonant[+gramCase]
      arr.push(wordEnd)
      changeCase()
    }
}

  return (
    <div className="App">
      <Form changeWord={changeWord} text={text} newWord={newWord} />
    </div>
  );
}

export default App;
