import WPAPI from 'wpapi'

export const wp = new WPAPI({
    endpoint: 'https://www.thepathoftruth.com/wp-json',
    username: 'michael.n.preston@gmail.com',
    password: 'Mercury2020!!' //TODO: init w/ process.env or firebase
})