const getBaseURL = () => {
    let loc = window.location;
    return [loc.protocol, '//', loc.host].join('');
}

export const getURL = path => {
    return [getBaseURL(), path].join(path[0] === '/' ? '' : '/');
}
