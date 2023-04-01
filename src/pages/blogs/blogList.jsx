import Container from "../../components/Container";
import BlogItems from "../../components/blogs";
import Layout from "../../components/Layout";
import useFetchGet from "../../hooks/useFetchGet";
import Loading  from "../../components/Loading";
import Bug from "../../components/Bug"
import Title from "../../components/atoms/title/Title";

const BlogList = () => {

    const {data, isLoading, isError} = useFetchGet('/blog')
  return (
    <Layout>
      <div className="w-full md:h-52 h-48 flex items-center justify-center bg-gradient-to-b from-yellow-100 to-white bg-opacity-50 text-center">
        <Title styledCustom="font-flower tracking-wide text-3xl" title="tulisan kami"/>
      </div>
      <Container>
        {isLoading ? <Loading/> : (
        <div className="flex flex-col relative md:px-20 gap-1 mb-20 px-3 border-l-2 border-yellow-400">
          {data &&
            data.map((blog, i) => (
              <BlogItems
                key={blog._id}
                id={blog._id}
                title={blog.title}
                article={blog.article}
                date={blog.createdAt}
                image={blog.image.url}
              />
            ))}
        </div>
        )}
        {isError && <Bug/>}
      </Container>
      </Layout>
  );
}

export default BlogList;