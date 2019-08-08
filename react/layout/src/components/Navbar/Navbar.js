import React from 'react'


const wrapperStyle = {
    position: 'fixed',
    top: 0,
    width: '100%',
    color: 'lightgrey',
    backgroundColor: 'darkgrey'
}

const listStyle = {
    display: 'flex',
    listStyleType: 'none',
    margin: 0,
    padding: 0,
    alignItems: 'center',
    textAlign: 'center'
}

const listElementStyle = {
    width: '90%',
    height: '100%',
    backgroundColor: 'grey',
    border: '1px solid black'
}

export const Navbar = () => (
    <div style={wrapperStyle}>
        <ul style={listStyle}>
            <li style={listElementStyle}>Li No. 1</li>
            <li style={listElementStyle}>Li No. 2</li>
            <li style={listElementStyle}>Li No. 3</li>
            <li style={listElementStyle}>Li No. 4</li>
        </ul>
    </div>
)
