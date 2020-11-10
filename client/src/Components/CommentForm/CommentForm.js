import react, { useState } from "react";
import { 
  FormWrapper,
  Form,
  TextArea,
  TextWrapper,
  Button,
  FormFooter,
  P
} from "./CommentForm.components";
const CommentForm = () => {
  const [formFocus, setFormFocus] = useState(false)
  return (
    <FormWrapper>

      <Form>
        <TextWrapper borderColor={formFocus ? "black" : "lightgray"}>
          <TextArea onFocus={() => setFormFocus(true)} onBlur={() => setFormFocus(false)} placeholder="What are your thoughts?" />
          <FormFooter>
            <Button color="white" bgColor="#7549f1">COMMENT</Button>
          </FormFooter>
        </TextWrapper>
        
      </Form>
    </FormWrapper>
  )
}

export default CommentForm;