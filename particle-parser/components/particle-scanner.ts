import { wp } from '../wordpress/api';

// A. Use wpapi to pull a specific paper
// B. Take all html from that paper and feed it to particle finder

const sampleUrl = 'https://www.thepathoftruth.com/what-the-lord-has-done-with-me/part9/p1.htm'
export const getPaperByUrl = async (url = '') => {
    return wp.pages()
        // .then(result => console.log('result :>> ', result))
}

const result = await getPaperByUrl(sampleUrl)
console.log('result :>> ', result)

// 1. Find tags around a Particle
//  a. Verify title is 'Particle'
//  b. Take the contents within that particle and run countWords() on it.
// 2. Create a countWords() function that creates a weighted hashmap of individual words and their counts.

