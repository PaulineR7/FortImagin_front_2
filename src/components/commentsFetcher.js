import React, { Children, useEffect, useState } from "react";

function CommentFetcher() {

    const [comment, setComment] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {

        try {
            const commentResponse = await fetch(`http://localhost:3000/api/comment`)
            const commentResponseData = await commentResponse.json();
            setComment(commentResponseData);
        } catch (error) {
            console.log(`erreur lors du fetch des commentaires`);
        }

    };
    fetchComments();
  }, []);

  console.log(comment);
//   console.log(Children)
//   return Children(comment)

}

export default CommentFetcher;