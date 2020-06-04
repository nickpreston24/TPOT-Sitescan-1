// import SampleComponent from '../components/SampleComponent'
// import '../components/particle-scanner'
// import Link from 'next/link'
import { getTheoPaperAsync } from '../components/particle-scanner'
import { useState } from 'react';
// import ZeitCard from '../components/ZeitCard';
import { useInput } from '../hooks/useInput';

export default function Home() {

  const tpotHome = 'http://www.thepathoftruth.com'

  // const [chapter, setChapter] = useState(1);
  // const [page, setPage] = useState(1);
  const { value: chapter, bind: bindChapter, reset: resetChapter } = useInput(1);
  const { value: page, bind: bindPage, reset: resetPage } = useInput(1);

  const handleSubmit = async (event) => {
    // event.preventDefault();
    console.log('submited:', chapter, page);
    let papers = (await getTheoPaperAsync(chapter, page)).filter(page=>page.slug!=='sitemap')
    // console.log(papers)
    console.log(papers.map(p=>p.slug))

    resetChapter();
  }

  const handleChange = (event) => {
    event.preventDefault();

    // console.log('event :>> ', event.target.value);
    console.log('event :>> ', event.target);

  }

  return <>
    {/* <h3>Input a TPOT url:</h3> */}
    {/* <input placeholder="thepathoftruth.com"></input> */}
    <h3>Input a Theo Auto Chapter and Page</h3>
    <label >
      Chapter:
    <input
        placeholder="1"
        type='number'
        {...bindChapter}
      >
      </input>

    </label>

    <label >
      Page:
    <input
        placeholder="1"
        type='number'
        {...bindPage}
      >
      </input>

    </label>
    <br />

    <button onClick={handleSubmit}>Search</button>
    <br />

    {/* <a href={tpotHome} className="card">
      <h3>TPOT</h3>
      <p>Go to TPOT</p>
    </a> */}
  </>
  // return <SampleComponent title="Index Page" linkTo="/other" />
}


