import React from 'react'
import './App.css'


const Input = props => (
    <input type='file' name='file-input' multiple {...props} />
)

const App = () => {
    const onSubmit = e => {
        e.preventDefault()
    }

    const onChange = e => {
        console.log(e.target.files)
    }

    return (
        <div className='container'>
            <form className='form' onSubmit={onSubmit}>
                <div>
                    <Input onChange={onChange} />
                    <button type='submit'>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default App
