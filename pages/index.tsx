// import SampleComponent from '../components/SampleComponent'
// import '../components/particle-scanner'
<<<<<<< HEAD
// import Link from 'next/link'
import { getTheoPaperAsync } from '../components/particle-scanner'
import { useState } from 'react';
// import ZeitCard from '../components/ZeitCard';
=======
import Link from 'next/link'
import { getTheoPaper } from '../components/particle-scanner'
import { useState } from 'react';
import ZeitCard from '../components/ZeitCard';
>>>>>>> 1f5a9e5f841510ab39c6eac1025546f953289ae6
import { useInput } from '../hooks/useInput';

export default function Home() {

  const tpotHome = 'http://www.thepathoftruth.com'

  // const [chapter, setChapter] = useState(1);
<<<<<<< HEAD
  // const [page, setPage] = useState(1);
  const { value: chapter, bind: bindChapter, reset: resetChapter } = useInput(1);
  const { value: page, bind: bindPage, reset: resetPage } = useInput(1);

  const handleSubmit = async (event) => {
    // event.preventDefault();
    console.log('submited:', chapter, page);
    let papers = (await getTheoPaperAsync(chapter, page)).filter(page=>page.slug!=='sitemap')
    // console.log(papers)
    console.log(papers.map(p=>p.slug))
=======
  const [page, setPage] = useState(1);
  const { value: chapter, bind: bindChapter, reset: resetChapter } = useInput(1);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('submited:', chapter, page);
    // getTheoPaper(chapter, page)
>>>>>>> 1f5a9e5f841510ab39c6eac1025546f953289ae6

    resetChapter();
  }

  const handleChange = (event) => {
    event.preventDefault();

    // console.log('event :>> ', event.target.value);
    console.log('event :>> ', event.target);

  }

<<<<<<< HEAD
  return <>
=======
  return <div>
>>>>>>> 1f5a9e5f841510ab39c6eac1025546f953289ae6
    {/* <h3>Input a TPOT url:</h3> */}
    {/* <input placeholder="thepathoftruth.com"></input> */}
    <h3>Input a Theo Auto Chapter and Page</h3>
    <label >
      Chapter:
    <input
        placeholder="1"
        type='number'
        {...bindChapter}
<<<<<<< HEAD
=======
      // value={chapter}
      // onChange={handleChange}
>>>>>>> 1f5a9e5f841510ab39c6eac1025546f953289ae6
      >
      </input>

    </label>

    <label >
      Page:
    <input
        placeholder="1"
        type='number'
<<<<<<< HEAD
        {...bindPage}
=======
        // value={page}
        onChange={handleChange}
>>>>>>> 1f5a9e5f841510ab39c6eac1025546f953289ae6
      >
      </input>

    </label>
    <br />

<<<<<<< HEAD
    <button onClick={handleSubmit}>Search</button>
=======
    <button onSubmit={handleSubmit}>Search</button>
>>>>>>> 1f5a9e5f841510ab39c6eac1025546f953289ae6
    <br />

    {/* <a href={tpotHome} className="card">
      <h3>TPOT</h3>
      <p>Go to TPOT</p>
    </a> */}
<<<<<<< HEAD
  </>
=======
  </div>
>>>>>>> 1f5a9e5f841510ab39c6eac1025546f953289ae6
  // return <SampleComponent title="Index Page" linkTo="/other" />
}


