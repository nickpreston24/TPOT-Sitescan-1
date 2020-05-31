import { wp } from '../wordpress/api';

// A. Use wpapi to pull a specific paper
// B. Take all html from that paper and feed it to particle finder

const sampleUrl = 'https://www.thepathoftruth.com/what-the-lord-has-done-with-me/part9/p1.htm'
const domainUrl = 'https://www.thepathoftruth.com/'
const theoAuto = 'what-the-lord-has-done-with-me/'
const getChapter = (n: number) => `part${n}/`;
const getPage = (n: number) => `p${n}`;
const sampleSlug = 'all-men-are-not-from-god-2'

export const theoAutoURL = (chapter: number, page: number) => domainUrl + theoAuto + getChapter(chapter) + getPage(page) + '.htm';


export const getPapersByUrl = async (url: string = '') => {
    url = url.trim();
    if (!url) {
        console.warn('cannot handle an empty url');
        return
    }
    console.log('searching for url :>> ', url);
    return wp.pages()
        .search(url)
        // .slug(sampleSlug)
}


export async function getTheoPaper (chapter: number, page: number = 1){
    let pages  =  await getPapersByUrl(theoAutoURL(chapter, page))
    console.log('x :>> ', pages);
    return pages;
}



// getPaperByUrl(sampleUrl)
// getPaperByUrl(theoAutoURL(9, 1))
// .then(result => {
//     let filtered = result.filter(page=>page.slug!=='sitemap')
//     const slugs = result.map(page => page.slug);
//     // console.log('result :>> ', result);
//     console.log('filtered :>> ', filtered)            
//     // console.log('slugs :>> ', slugs)
// })

// // We can ignore Unexpected token ﻿ in JSON at position 0, per this explanation:
// .catch(error => console.error(error.message))

// const result = await getPaperByUrl(sampleUrl)
// console.log('result :>> ', result)

// 1. Find tags around a Particle
//  a. Verify title is 'Particle'
//  b. Take the contents within that particle and run countWords() on it.
// 2. Create a countWords() function that creates a weighted hashmap of individual words and their counts.

