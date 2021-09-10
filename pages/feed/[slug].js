export const Feed = ({ pageNumber, articles }) => {
  return (
    <div className="page-container">
      {articles.map((article, index) => (
        <div key={index} className={styles.post}>
          <h1>{article.title}</h1>
        </div>
      ))}
    </div>
  )
}

export const getServerSideProps = async (pageContext) => {
  const pageNumber = pageContext.query.slug

  if (!pageNumber || pageNumber < 1 || pageNumber > 5) {
    return {
      props: {
        articles: [],
        pageNumber: 1,
      },
    }
  }
  const apiResponse = await fetch(
    'https://newsapi.org/v2/top-headlines?country=us&pageSize=5&page=${pageNumber}',
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NEWS_KEY}`,
      },
    },
  )
  const apiJson = await apiResponse.json()

  const { articles } = apiJson

  return {
    props: {
      pageNumber: Number.parseInt(pageNumber),
      articles,
    },
  }
}
export default Feed