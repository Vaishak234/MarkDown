import React from 'react'
import Comment from './Comment';
import './commentSection.css'

function CommentSection({comments}) {
 
  return (
      <div className='commentSection'>
         
    
              <div className="commentSection__comments">
                  
        {comments.length !== 0 ?
          comments.map((comment,i) => {
            return (
               <Comment key={i}  comment={comment} />
             )
          })
          : <p style={{textAlign:"center"}}>No comments</p>
             
        }
                
              </div>
         
      </div>
  )
}

export default CommentSection