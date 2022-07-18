import React, { useEffect } from 'react';
import Header from './components/Header/Header'

const NotFound = () => {
    useEffect(() => {
        document.title="404 - Realtor Panel"
    }, [])
    return (
        <div>
            <Header />
            <div
                style={{marginTop: "200px"}}
            >
                <h1>404 NOT FOUND</h1>
            </div>
           
        </div>
    )
}

export default NotFound
