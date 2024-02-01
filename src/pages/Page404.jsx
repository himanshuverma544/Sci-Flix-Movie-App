import { Link } from "react-router-dom";
import { Container } from "reactstrap";

const Page404 = () => {
  
  return (
    <section>
      <Container className="page-404">
        <h1 className="404-heading">
          404
        </h1>
        <p>Go to
          <Link className="go-to-home ms-1" to="/">
            Homepage
          </Link>
        </p>
      </Container>
    </section>
  );
}

export default Page404;