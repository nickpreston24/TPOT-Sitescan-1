// import SampleComponent from '../components/SampleComponent'
// import '../components/particle-scanner'
import Link from 'next/link'
import { getTheoPaper } from '../components/particle-scanner'
import { useState } from 'react';
import ZeitCard from '../components/ZeitCard';
import { useInput } from '../hooks/useInput';

export default function Home() {

  const tpotHome = 'http://www.thepathoftruth.com'

  // const [chapter, setChapter] = useState(1);
  const [page, setPage] = useState(1);
  const { value: chapter, bind: bindChapter } = useInput(1);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('submited:', chapter, page);
    // getTheoPaper(chapter, page)
  }

  const handleChange = (event) => {
    event.preventDefault();

    // console.log('event :>> ', event.target.value);
    console.log('event :>> ', event.target);
  }

  return <div>
    {/* <h3>Input a TPOT url:</h3> */}
    {/* <input placeholder="thepathoftruth.com"></input> */}
    <h3>Input a Theo Auto Chapter and Page</h3>
    <label >
      Chapter:
    <input
        placeholder="1"
        type='number'
        {...bindChapter}
      // value={chapter}
      // onChange={handleChange}
      >
      </input>

    </label>

    <label >
      Page:
    <input
        placeholder="1"
        type='number'
        // value={page}
        onChange={handleChange}
      >
      </input>

    </label>
    <br />

    <button onSubmit={handleSubmit}>Search</button>
    <br />

    <a href={tpotHome} className="card">
      <h3>TPOT</h3>
      <p>Go to TPOT</p>
    </a>
  </div>
  // return <SampleComponent title="Index Page" linkTo="/other" />
}


