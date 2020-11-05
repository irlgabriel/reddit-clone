import './App.css';
import { 
  Navbar,
  Sidebar,
  Post
} from "./Components";
import { 
  Container,
  MainWrapper,
  PostsContainer,
} from "./App.components";
function App() {
  return (
    <Container>
      <Navbar />
      <MainWrapper>
        <PostsContainer>
          <Post />
        </PostsContainer>
        <Sidebar>

        </Sidebar>
      </MainWrapper>
    </Container>
  );
}

export default App;
