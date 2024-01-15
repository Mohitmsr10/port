import React, { useState } from 'react'

const useAlert = () => {
    const [alert, setAlert] = useState({show: false, text: '', type: 'danger'});    // Danger means that it's gonna be red one

    const showAlert = ({text, type='danger'}) => setAlert({
        show: true,
        text,
        type
    })

    const hideAlert = ({text, type='danger'}) => setAlert({
        show: false,
        text: '',
        type: 'danger'
    })


    // Hooks don't return any jsx, they return most often an object or an array to which you can pass all these values 
    return {alert, showAlert, hideAlert}
}

export default useAlert