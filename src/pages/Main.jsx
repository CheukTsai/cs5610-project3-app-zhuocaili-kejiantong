import React, { useState, useEffect } from 'react'
import NavBar from 'components/NavBar'
import JobPost from 'components/JobPost'
import axios from 'commons/axios'
import "styling/main.css"

function Main(props) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const result = window.location.search.replace("?search=", "")
        axios.get(`/api/jobs/search/${result}`).then(
            response => {
                setPosts(response.data)
                render()
            }
        ).catch(err => {
            setPosts([])
        })
    }, [props.search])

    function render(){
        return(<div className="page-wrapper main d-flex w-100 justify-content-center">
                    <div className="posts-wrapper">
                        {props.search !== "" ? <div className="card-title search-title job-title ">Search result for {props.search}</div> : null}
                        {posts.map(post => (<JobPost job={post} />)
                        )}
                    </div>
                </div>
        )
    }


    return (
        <React.Fragment>
            <NavBar user={props.user} setUser={props.setUser} setSearch={props.setSearch} />
            {render()}
        </React.Fragment>
    )
}

export default Main
