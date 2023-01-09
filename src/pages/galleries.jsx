import Layout from "../components/Layout";
import Loading  from "../components/Loading";
import { Gallery } from "../components/gallery";
import useFetchGet from "../hooks/useFetchGet";
import Bug from "../components/Bug";

export default function Galleries() {        
    const {data, isLoading, isError } = useFetchGet('/gallery')
  return (
    <Layout>
      <section className="min-h-[768px] bg-yellow-50 bg-opacity-50">
        <div className="flex justify-center items-center pt-20 text-4xl h-32 font-flower">
          Galleries
        </div>
        {isLoading ? (
            <Loading />
          ) : (
        <main className="grid md:grid-cols-4 grid-cols-2 sm:grid-cols-3 gap-2 my-9 sm:px-12 px-4">
            {data.map((obj, i) => <Gallery {...obj} key={i} />)}
        </main>
        )}
        {isError && <Bug/>}
      </section>
    </Layout>
  );
}