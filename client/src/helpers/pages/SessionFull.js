import { Header } from 'antd/lib/layout/layout'
import React, { useEffect } from 'react'

const SessionFull = () => {
    useEffect(() => {
        document.title="Sessions Full"
    }, [])
    return (
        <div>
            <Header />
            <div
                style={{marginTop: "200px"}}
            >
                <h1>Sessions Full</h1>
                <p>Sorry for your inconvenience, we are still building the app so we are limiting the number of users at a time.</p>
                <p>Until then, please follow our  <a href="https://twitter.com/Amurse_now" target="_blank" rel="noreferrer">Twitter</a> page. </p>
                <br />
                <h4>Click <a href="https://amurse.com"  rel="noreferrer">here</a>  to retry</h4>
            </div>
           
        </div>
    )
}

export default SessionFull