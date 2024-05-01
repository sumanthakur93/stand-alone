import { useEffect } from 'react'
import useAuth from '../states/useAuth'
// import axios from 'axios'
import Cookies from 'js-cookie'
import useRefreshState from '../states/useRefreshState'
import handleError from '../utils/handleError'
import { refreshApi } from '../api'
import { useNavigate } from 'react-router-dom'

// axios.defaults.withCredentials = true

const useRefresh = () => {
    const setIsAuth = useAuth((state) => state.setIsAuth)
    const refreshState = useRefreshState((state) => state.refreshState)
    const navigate = useNavigate()

    useEffect(() => {
        const redirect_to = new URLSearchParams(window.location.search).get(
            "redirect_to"
        );
        if (redirect_to) navigate(`/${redirect_to}`);

        const isAccessToken = Cookies.get('isAccessToken')
        const isRefreshToken = Cookies.get('isRefreshToken')

        if(isAccessToken && isRefreshToken) {
            setIsAuth(true)
        }else if(!isAccessToken && !isRefreshToken) {
            setIsAuth(false)
        }else if(!isAccessToken && isRefreshToken) {
            refreshApi().then(() => {
                setIsAuth(true)
            }).catch((err) => {
                handleError(err)
                setIsAuth(false)
            })
        }else {
            setIsAuth(false)
        }
    },[refreshState])
    return null
}

export default useRefresh
