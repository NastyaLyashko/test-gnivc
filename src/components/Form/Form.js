import React, { useState } from 'react';
import './Form.css';

export default function Form ({ changeWord, text, newWord }) {

    const [word, setWord] = useState('');
    const [gramCase, setGramCase] = useState('0');
    const [error, setError] = useState('');

    function handleChangeWord (e) {
        const newWord = e.target.value
        if (newWord.match(/[-.?!)(,:\s\d]/)) {
            setError('Вводите только буквы, пожалуйста')
        } else if (newWord.match(/[^а-яА-яёЁ]/)) {
            setError('Пока меняем падежи только на русском, смените расскладку.')
        } else {
            setWord(newWord.toLowerCase());
            setError('')
        }
    }

    function handleChangeGramCase (e) {
        setGramCase(e.target.value);
    }

    function resetForm() {
        setWord('')
        setError('')
        setGramCase('0')
        setIsInputActive(false)
        setIsCheckboxActive(false)
    }

    function handleSubmit(e) {
        e.preventDefault();
        changeWord(word, gramCase);
        resetForm()
    }

    const [isInputActive, setIsInputActive] = useState(false);

    const handleBlure = () => (word !== '') ? setIsInputActive(true) : setIsInputActive(false)

    const [isCheckboxActive , setIsCheckboxActive ] = useState(false);

    return (
        <section className="form">
            <form onSubmit={handleSubmit} className="form__container">
                <h3 className="form__title">Поиграй с падежами!</h3>
                <div className={`${isInputActive ? "form__input-container_active" : ""} form__input-container`}>
                    <label className={`${isInputActive ? "form__field_active form__field_text-input_active" : ""} form__field form__field_text-input`} htmlFor='word' >
                        Введите существительное в именительном падеже
                    </label>
                    <input  value={word || ''}
                                onChange={handleChangeWord}
                                onBlur={handleBlure}
                                onFocus={(()=> setIsInputActive(true))}
                                type='text'
                                name='word'
                                className={`${isInputActive? "form__input_active" : ""} form__input`}
                                id='word'
                                required
                                minLength="2"
                                maxLength="20"/>
                    <span className='form__error'>{error}</span>
                </div>
                <div className='form__input-container'>
                    <label className={`${isCheckboxActive ? "form__field_active" : ""} form__field`}>
                        Выбирете падеж:
                    </label>
                    <select className={`${isCheckboxActive ? "form__input_active" : ""} form__input`}
                            value={gramCase} 
                            onChange={handleChangeGramCase}
                            onFocus={(() => setIsCheckboxActive(true))} >
                        <option value="0">Именительный</option>
                        <option value="1">Родительный</option>
                        <option value="2">Дательный</option>
                        <option value="3">Винительный</option>
                        <option value="4">Творительный</option>
                        <option value="5">Предложный</option>
                    </select>
                </div>
                <button type="submit" className={`${isInputActive && isCheckboxActive ? "form__button_active" : "form__button_inactive"} form__button` } >Изменить</button>
                <span className='form__text'>{text}</span>
                <span className='form__word'>{newWord}</span>
            </form>
        </section>
    )
}
