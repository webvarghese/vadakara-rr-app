import Image from "react-bootstrap/Image"
import Container from "react-bootstrap/Container"

function HomePage() {
  return (
    <Container className="mt-5">
      <Image
        src="https://cdn.feedingtrends.com/article-images/12_31df2e8ce2.jpg"
        fluid
      />
    </Container>
  )
}

export default HomePage
