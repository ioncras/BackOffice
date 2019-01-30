import {
    GET_LIST,
    GET_ONE,
    GET_MANY,
    GET_MANY_REFERENCE,
    CREATE,
    UPDATE,
    DELETE,
    fetchUtils,
} from 'react-admin';
import { stringify } from 'query-string';

import createMessage from './util/message'
import filterMapper from './util/filterMapper'

const API_URL = 'http://localhost:8080';
const resourceMap = {
    'usuarios': 'res.users'
}

// /**
//  * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
//  * @param {String} resource Name of the resource to fetch, e.g. 'posts'
//  * @param {Object} params The Data Provider request params, depending on the type
//  * @returns {Object} { url, options } The HTTP request parameters
//  */

const convertDataProviderRequestToHTTP = (type, resource, params) => {
    switch (type) {
    case GET_LIST: {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        console.log()
        const query = {
            limit: perPage,
            offset: (page - 1) * perPage,
            order: field + " " + order 
            //sort: JSON.stringify([field, order]),
            //range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
     
        };
        const filters = filterMapper({...params.filter})

        return {
            url: `${API_URL}`,
            options: { method: 'POST', body: JSON.stringify(createMessage(resource,'search_read',filters,query)) },
        };
    }
    case GET_ONE:
        return {
            url: `${API_URL}`,
            options: { method: 'POST', body: JSON.stringify(createMessage(resource, 'search_read', [[['id','=',params.id]]])) },
        };
    case GET_MANY: {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        console.log(params.ids)
        const ids = params.ids
        console.log(ids)
        return {
            url: `${API_URL}`,
            options: { method: 'POST', body: JSON.stringify(createMessage(resource, 'read', [ids]  )) },
        };
    }
    case GET_MANY_REFERENCE: {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, (page * perPage) - 1]),
            filter: JSON.stringify({ ...params.filter, [params.target]: params.id }),
        };
        return { url: `${API_URL}/${resource}?${stringify(query)}` };
    }
    case UPDATE:
        console.log(params)
        return {
            url: `${API_URL}`,
            //options: { method: 'POST', body: JSON.stringify(createMessage(resource, 'update', [[parseInt(params.id),[]])) },
        };
    case CREATE:
        return {
            url: `${API_URL}`,
            options: { method: 'POST', body: JSON.stringify(createMessage(resource, 'create', { ...params.data })) },
        };
        break;
    case DELETE:
        return {
            url: `${API_URL}/${resource}/${params.id}`,
            options: { method: 'DELETE' },
        };
    default:
        throw new Error(`Unsupported fetch action type ${type}`);
    }
};

// /**
//  * @param {Object} response HTTP response from fetch()
//  * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
//  * @param {String} resource Name of the resource to fetch, e.g. 'posts'
//  * @param {Object} params The Data Provider request params, depending on the type
//  * @returns {Object} Data Provider response
//  */
const convertHTTPResponseToDataProvider = (response, type, resource, params) => {
    const { headers, json } = response;
    console.log(response)
    switch (type) {
    case GET_LIST:
        return {
            data: json.data.map(x => x),
            total: json.totalCount,
        };
    case GET_ONE:
        return {
            data: json.data[0]
        }
    case GET_MANY: 
        return {
            data: json.data.map(x => x),
            total: json.totalCount
        }
    case CREATE:
        return { data: { ...params.data, id: json} };
    default:
        return { data: json };
    }
};

// /**
//  * @param {string} type Request type, e.g GET_LIST
//  * @param {string} resource Resource name, e.g. "posts"
//  * @param {Object} payload Request parameters. Depends on the request type
//  * @returns {Promise} the Promise for response
//  */

export default (type, resource, params) => {
    const { fetchJson } = fetchUtils;
    const { url, options } = convertDataProviderRequestToHTTP(type, resource, params);
    return fetchJson(url, options)
        .then(response => convertHTTPResponseToDataProvider(response, type, resource, params));
};