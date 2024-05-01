import { useState, useEffect } from 'react'
import { AdminApiResponseType, MeApiResponseType } from '../api'
import handleError from '../utils/handleError'

export default function useMe() {
    const [me, setMe] = useState<MeApiResponseType | AdminApiResponseType | null>(null)
    useEffect(() => {
        (async () => {
          try {
            // const responses = await Promise.allSettled([meApi(),adminApi()])
            // if(responses[1].status === "fulfilled"){
            //   setMe(responses[1].value.data)
            // }else if(responses[0].status === "fulfilled"){
            //   setMe(responses[0].value.data)
            // }
          } catch (err) {
            handleError(err)
          }
        })()
    },[])
  return me
}
