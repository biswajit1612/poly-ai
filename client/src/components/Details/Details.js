import React, {useState, useEffect} from 'react';
import {TextField, Button,Paper, Typography, Link} from '@material-ui/core';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSnippet, Snippet } from '../../actions/snippets';
const Details = () => {
    const { id } = useParams();
    const [key, setKey] = useState('');
    const { message } = useSelector((state) =>  state.snippets);
    const [detail, setDetail] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmit = async () => {
        const m = await dispatch(getSnippet(id,key));
        setDetail(m);
        //setKey('');
    }
    const handleClick = () => {
        dispatch(Snippet(id));
        navigate('/pastehere/history');
    }
    useEffect(() => {
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
          '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
          '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
          '(\\#[-a-z\\d_]*)?$','i'); // fragment locator

          if(pattern.test(detail)){
              console.log(pattern.test(detail))
            window.open(
                detail,
                '_blank' // <- This is what makes it open in a new window.
              );
          }
    },[detail])

  return (
    <div>
        {detail ? (
            <div>
                <Link>
                            <Typography onClick={handleClick}>View History</Typography>
                </Link>
                <div>
                {detail}
                </div>
            </div>
        ) : (
            <div>
                 <TextField name="key" column={8} variant="outlined" label="Secret Key" value={key} onChange={(e) => setKey(e.target.value)} style={{width: '60%'}}/>
            <Button variant="contained" color="primary" style={{marginLeft: '80px', marginTop :'15px'}} onClick={handleSubmit} disabled={key ? false : true}>FETCH</Button>
            </div>
        )}
         
            
    </div>
  )
}

export default Details;