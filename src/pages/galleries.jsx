import Layout from "../components/Layout";
import Loading  from "../components/Loading";
import { Gallery } from "../components/gallery";
import useFetchGet from "../hooks/useFetchGet";
import Bug from "../components/Bug";
import Title from "../components/atoms/title/Title";
import GridMdFour from "../components/templates/Grid";

export default function Galleries() {        
    const {data, isLoading, isError } = useFetchGet('/gallery');
  return (
    <Layout>
      <section className="min-h-[768px] bg-yellow-50 bg-opacity-50 text-amber-800">
        <div className="flex justify-center items-center h-44 pt-12 text-flower">
          <Title title="Galleries" styledCustom="text-center text-3xl hover-3"/>
        </div>
        {isLoading ? (
            <Loading />
          ) : (
          <GridMdFour>
            {data.map((obj, i) => <Gallery {...obj} key={i} />)}
          </GridMdFour>
        )}
        {isError && <Bug/>}
      </section>
    </Layout>
  );
}