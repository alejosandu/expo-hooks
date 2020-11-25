// función que obtiene el token según se tenga almacenado
// se prepara para buscar entre múltiples token
const findToken = (type) => {
    let token = ''
    switch (type) {
        case 'ubidots':
            token = localStorage.getItem(`access_token_ubidots`)
            break;
        case 'openweather':
            token = "7fa849f645995940cb2d0da996e1b77e"
            break;
        default:
            token = localStorage.getItem(`access_token`)
            break;
    }
    return token ? token : '';
}

const transformUrlParams = (urlObj, params = {}) => {
    Object.keys(params).forEach(key =>
        urlObj.searchParams.append(key, params[key])
    );
    return urlObj
}

const sendRequest = async ({
    url,
    body = {},
    signal,
    params = {},
}) => {
    try {
        let result = {}
        switch (params.method) {

            case "POST":
            case "PUT":
            case "DELETE":
                result = await fetch(url, { ...params, body, signal })
                break;
            default: // GET
                result = await fetch(transformUrlParams(url, body), { ...params, signal, method: "GET" })
                break;
        }

        if (result.ok) {
            return (result)
        } else {
            throw (result)
        }
    } catch (err) {
        throw err
    }
}

const jsonApi = async ({
    url,
    body = {},
    signal,
    params = {},
}) => {

    try {

        switch (params.method) {
            case "POST":
            case "PUT":
            case "DELETE":
                body = JSON.stringify(body)
                break;
            default:
                break
        }

        const result = await sendRequest({
            url,
            body,
            signal,
            params
        })

        let response = await result.json()

        if (result.ok) {
            return (response)
        } else {
            throw (result)
        }
    } catch (err) {
        throw err
    }
}

const formDataApi = async ({
    url,
    body = {},
    signal,
    params = {},
}) => {
    try {

        const result = await sendRequest({
            url,
            body,
            signal,
            params
        })

        let response = await result.json()

        if (result.ok) {
            return (response)
        } else {
            throw (result)
        }
    } catch (err) {
        throw err
    }
}

const request = (url, params = {}, options = {}) => {

    const {
        bodyType = 'json',
        typeToken = 'hades'
    } = options


    const controller = new AbortController();
    const { signal } = controller;

    const promise = new Promise(async (res, rej) => {
        try {

            const { body, headers = {}, ...rest } = params

            const token = findToken(typeToken)
            switch (typeToken) {
                case "ubidots":
                    headers['Accept'] = 'application/json'
                    headers['Content-Type'] = 'application/json'
                    headers["X-Auth-Token"] = token ? token : null
                    break;
                case "openweather":
                    break;
                default:
                    headers['Accept'] = 'application/json'
                    headers['Content-Type'] = 'application/json'
                    // params.headers['Cache-Control'] = 'no-cache'
                    headers["Authorization"] = token ? `Bearer ${token}` : null
                    break;
            }

            switch (bodyType) {
                case 'formData':
                    const resultFormData = await formDataApi({
                        url: new URL(url),
                        body,
                        signal,
                        params: { ...rest, headers: { ...headers } },
                    })
                    return res(resultFormData);
                default:
                    const resultJson = await jsonApi({
                        url: new URL(url),
                        body,
                        signal,
                        params: { ...rest, headers: { ...headers } },
                    })

                    return res(resultJson)
            }

        } catch (err) {
            rej(err)
        }
    })

    return promise
}

export default request