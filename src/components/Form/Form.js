import React, { useState, useEffect } from 'react';
import './Form.css';

export default function Form () {

    const [isActive, setIsActive] = useState(false);

    const [word, setWord] = useState('');
    const [gramCase, setGramCase] = useState('именительном');
    const [newWord, setNewWord] = useState(word);

    function handleChangeWord (e) {
        setWord(e.target.value);
        setNewWord(e.target.value)
    }

    function handleChangeGramCase (e) {
        setGramCase(e.target.value);
    }

    useEffect(() => {
        if (word !== '') {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [word])

    function handleSubmit(e) {
        e.preventDefault();
        changeWord(word);
    }

    const newdeclension = lastLetter => 
        (lastLetter === 'а') ? '1' :
        (lastLetter === 'я') ? '2' :
        (lastLetter === 'о') ? '3' :
        (lastLetter === 'е') ? '4' :
        (lastLetter === 'ь') ? '5' :
        (lastLetter === 'у') ? '6' :
        (lastLetter === 'и') ? '7' : '8';

    const rules = [
        {'именительном': 'а',
        'родительном': 'ы',
        'дательном': 'е',
        'винительном': 'у',
        'творительном': 'ой',
        'предложном': 'е',},
        
        {'именительном': 'я',
        'родительном': 'и',
        'дательном': 'е',
        'винительном': 'ю',
        'творительном': 'ей',
        'предложном': 'е',}
    ]

    const end = (declension, rules) =>  {
        let end =
        (declension === '1') ? rules[0] :
        (declension === '2') ? rules[1] :
        (declension === '3') ? rules[2] :
        (declension === '4') ? rules[3] :
        (declension === '5') ? rules[4] :
        (declension === '6') ? rules[5] :
        (declension === '7') ? rules[6] :
        (declension === '8') ? rules[7] :
        console.log('error');
        return end[gramCase];
    }


    function changeWord(word) {
        const arr = Array.from(word);
        const lastIndex = arr.length - 1
        const lastLetter = arr[lastIndex]
        const decl = newdeclension(lastLetter)
        const wordEnd = end(decl, rules)
        arr.splice(lastIndex, 1, wordEnd)
        let newWord = arr.join('')
        setNewWord(newWord)
        console.log(newWord)
    }


    return (
        <section className="form">
            <form onSubmit={handleSubmit} className="form__container">
                <h3 className="form__title">Хотите изменить падеж слова?</h3>
                <div className={`${isActive ? "form__input-container_active" : ""} form__input-container`}>
                    <label className={`${isActive ? "form__field_active" : ""} form__field`} htmlFor='word' >
                        Введите существительное в именительном падеже
                    </label>
                    <input  value={word || ''}
                                onChange={handleChangeWord}
                                type='text'
                                name='word'
                                className={`${isActive ? "form__input_active" : ""} form__input`}
                                id='word'
                                required
                                
                                minLength="3"
                                maxLength="20"/>
                </div>
                <label className="form__select-container ">
                    Выбирете падеж:
                    <select className="form__input" value={gramCase} onChange={handleChangeGramCase}>
                        <option value="именительном">Именительный</option>
                        <option value="родительном">Родительный</option>
                        <option value="дательном">Дательный</option>
                        <option value="винительном">Винительный</option>
                        <option value="творительном">Творительный</option>
                        <option value="предложном">Предложный</option>
                    </select>
                </label>
                <button type="submit" className='form__button form__button_active' >Изменить</button>
                <p>Слово <b>{word}</b> в {gramCase} падеже: {newWord}</p>
            </form>
        </section>
    )
}
