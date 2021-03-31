const addStyle = () => {
    GM_addStyle(`
        button, input {
            border: none;
            background: #555;
            margin: 4px;
            padding: 12px;
            border-radius: 0.5em;
            color: #fff;
            font-size: large;
        }

        button {
            cursor: pointer;
        }

        button:focus, input:focus {
            outline: none;
        }

        button:hover {
            background: #444;
        }
    `)
}

export {
    addStyle
}