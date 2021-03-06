import React, { useState } from "react";
import axios from "axios";
import {
  FormWrapper,
  Form,
  TextArea,
  TextWrapper,
  Button,
  FormFooter,
} from "./CommentForm.components";
const CommentForm = ({ setFlash, setShowFlash, postComments, setPostComments, post_id, user_id }) => {
  const [formFocus, setFormFocus] = useState(false);
  const [commentContent, setCommentContent] = useState("");

  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  const createComment = () => {
    const body = JSON.stringify({
      user_id: user_id,
      content: commentContent,
    });
    axios.post(`/posts/${post_id}/comments/`, body, config)
    .then((res) => {
      setCommentContent("");
      setPostComments([...postComments, res.data.comment]);
      setFlash(res.data.message);
      setShowFlash(true);
    })
    .catch(err => {
      setFlash(err.response.data.message);
      setShowFlash(true);
    })
  };
  return (
    <FormWrapper>
      <Form>
        <TextWrapper borderColor={formFocus ? "black" : "lightgray"}>
          <TextArea
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            onFocus={() => setFormFocus(true)}
            onBlur={() => setFormFocus(false)}
            placeholder="What are your thoughts?"
          />
          <FormFooter>
            <Button
              onClick={() => createComment()}
              color="white"
              bgColor="#7549f1"
            >
              COMMENT
            </Button>
          </FormFooter>
        </TextWrapper>
      </Form>
    </FormWrapper>
  );
};

export default CommentForm;
