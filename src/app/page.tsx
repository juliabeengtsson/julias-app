import Navbar from '@/components/ui/navbar';
import { getPostsPage } from './actions/postActions';
import { getMetaDataObj } from '@/lib/utils';

export async function generateMetadata() {
  const data = await getPostsPage('home');
  const metaData = data.page.seo;

  return getMetaDataObj(metaData);
}

export default function Home() {
  return (
    <main>
      <nav>
        <Navbar />
      </nav>
      <header className='flex justify-center'>
        {/* <img src="/apple-touch-icon.png" alt="header image" /> */}
      </header>
      <h1 className='text-2xl text-center my-8 font-bold'>Home Page</h1>

      <section className='flex text-center flex-col px-4'>
        <h2 className='text-lg font-semibold'>Här är en hemsida om hundraser.</h2>
        <p>lorem ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it </p>
      </section>
    </main>
  );
}
